import prisma from "../../common/prisma/prisma.init.js";

export const orderService = {
    create: async function (req) {
        //Request mẫu:

        // {
        //   "user_id": "64c88e6b9a9e9a1b14d3e8f0",
        //   "menuItems": [
        //     { "food_id": "64c89a9e9a9e9a1b14d3e8f1", "quantity": 2 },
        //     { "food_id": "64c89a9e9a9e9a1b14d3e8f2", "quantity": 1 }
        //   ]
        // }
        const user = req.user;
        if (!user) {
            throw new BadRequestError(
                "Bạn cần đăng nhập để thực hiện đặt hàng"
            );
        }
        const { menuItems } = req.body;
        if (!menuItems || !user.user_id || !menuItems.length) {
            throw new BadRequestError(
                "Invalid: menuItems and user_id are required"
            );
        }
        // Tính tổng giá trị đơn hàng (totalPrice)
        // Tính tổng giá trị đơn hàng (totalPrice)
        let totalPrice = 0;

        // Transaction đảm bảo toàn bộ quy trình
        const createdOrder = await prisma.$transaction(async (tx) => {
            // Lưu thông tin món ăn hợp lệ
            const validatedMenuItems = [];

            for (const item of menuItems) {
                const food = await tx.menuFood.findUnique({
                    where: { food_id: item.food_id },
                });

                // Kiểm tra món ăn có tồn tại không
                if (!food) {
                    throw new Error(
                        `Food item with ID ${item.food_id} not found`
                    );
                }

                // Kiểm tra món ăn có sẵn không
                if (!food.status) {
                    throw new Error(
                        `Food item with ID ${item.food_id} is not available`
                    );
                }

                // Tính giá trị cho món ăn và thêm vào danh sách hợp lệ
                validatedMenuItems.push({
                    ...item,
                    name: food.name,
                    price: food.price,
                    total: food.price * item.quantity,
                });

                // Cộng giá trị vào tổng giá đơn hàng
                totalPrice += food.price * item.quantity;
            }

            // Tạo đơn hàng
            const newOrder = await tx.order.create({
                data: {
                    user_id: user.user_id,
                    totalPrice,
                    status: "PENDING", // Trạng thái mặc định
                },
            });

            // Tạo các chi tiết đơn hàng (OrderDetail)
            for (const item of validatedMenuItems) {
                await tx.orderDetail.create({
                    data: {
                        order_id: newOrder.order_id,
                        food_id: item.food_id,
                        quantity: item.quantity,
                    },
                });
            }

            // Trả về thông tin đơn hàng kèm các món đã được validate
            return {
                ...newOrder,
                menuItems: validatedMenuItems,
            };
        });

        return createdOrder;
    },

    findAll: async function (req) {
        let { pageIndex, pageSize } = req.query;
        pageIndex = pageIndex ? +pageIndex : 1;
        pageSize = pageSize ? +pageSize : 3;
        let totalItems = await prisma.order.count();
        let totalPages = Math.ceil(totalItems / pageSize);
        let skip = (pageIndex - 1) * pageSize;
        const results = await prisma.order.findMany({
            skip: skip,
            take: pageSize,
            include: {
                menuItems: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            pageIndex,
            pageSize,
            totalItems,
            totalPages,
            data: results || [],
        };
    },

    findOne: async function (req) {
        const order_id = req.params.id;
        if (!order_id) {
            throw new BadRequestError("Cần cung cấp order_id");
        }
        const orderExist = await prisma.order.findUnique({
            where: {
                order_id: order_id,
            },
            include: {
                menuItems: true,
            },
        });
        if (!orderExist) {
            throw new BadRequestError("Order không tồn tại");
        }
        return orderExist;
    },

    update: async function (req) {
        const { order_id, status, menuItems } = req.body;

        // Kiểm tra trạng thái (nếu cần cập nhật status)
        if (status) {
            const validStatuses = ["PENDING", "PAID", "FAILED", "CANCELLED"];
            if (!validStatuses.includes(status)) {
                throw new Error(`Invalid status: ${status}`);
            }
        }

        // Bắt đầu cập nhật dữ liệu
        await prisma.order.update({
            where: { order_id },
            data: {
                ...(status && { status }), // Cập nhật status nếu có
            },
            include: {
                menuItems: true, // Bao gồm các món ăn trong đơn hàng
            },
        });

        // Cập nhật chi tiết món ăn trong OrderDetail nếu cần
        if (menuItems && menuItems.length > 0) {
            for (const item of menuItems) {
                await prisma.orderDetail.updateMany({
                    where: {
                        order_id,
                        food_id: item.food_id,
                    },
                    data: {
                        quantity: item.quantity,
                    },
                });
            }
        }

        // Lấy lại thông tin order sau khi cập nhật
        const refreshedOrder = await prisma.order.findUnique({
            where: { order_id },
            include: {
                menuItems: true,
            },
        });

        return refreshedOrder;
    },

    remove: async function (req) {
        const order_id = req.params.id;
        if (!order_id) {
            throw new BadRequestError("Cần cung cấp order_id");
        }
        const orderExist = await prisma.order.findUnique({
            where: {
                order_id: order_id,
            },
        });
        if (!orderExist) {
            throw new BadRequestError("Order không tồn tại");
        }
        const deletedOrder = await prisma.order.delete({
            where: {
                order_id: order_id,
            },
        });
        return deletedOrder;
    },
};
