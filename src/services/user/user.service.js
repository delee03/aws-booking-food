import { ObjectId } from "bson";
import prisma from "../../common/prisma/prisma.init.js";

export const userService = {
  create: async function (req) {
    const { email, password, fullName, phone } = req.body;
    if(!email || !password || !fullName || !phone){
        throw new BadRequestError("Email, password, fullName, phone are required");
    }
    const userExist = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (userExist) {
        throw new BadRequestError("Email is exist");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashPassword,
            name: fullName,
            phone: phone,
        },
    });

    return newUser;

  },

  findAll: async function (req) {
    let { pageIndex, pageSize } = req.query;
    pageSize = pageSize ? +pageSize : 3;
    pageIndex = pageIndex ? +pageIndex : 1;
    const offset = (pageIndex - 1) * pageSize;
    let totalItems = await prisma.user.count();
    let totalPages = Math.ceil(totalItems / pageSize);
    const results = await prisma.user.findMany({
        skip: offset,
        take: pageSize,
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
    const user_id = req.params.id;
    if(!user_id){
        throw new BadRequestError("Cần cung cấp user_id");
    }
    let objectId =  ObjectId.createFromHexString(user_id);
    const userExist = await prisma.user.findUnique({
        where: {
            user_id: objectId,
        },
    });
    if(!userExist){
        throw new BadRequestError("Người dùng không tồn tại");
    }
    return userExist;

  },

  update: async function (req) {
    const user_id = req.params.id;
    const { email, password, fullName, phone } = req.body;
    if(!user_id){
        throw new BadRequestError("Cần cung cấp user_id");
    }
    let objectId =  ObjectId.createFromHexString(user_id);
    const userExist = await prisma.user.findUnique({
        where: {
            user_id: objectId,
        },
    });
    if(!userExist){
        throw new BadRequestError("Người dùng không tồn tại");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const updateUser = await prisma.user.update({
        where: {
            user_id: objectId,
        },
        data: {
            email: email,
            password: hashPassword,
            name: fullName,
            phone: phone,
        },
    });
    return updateUser;
  },

  remove: async function (req) {
    const user_id = req.params.id;
    if(!user_id){
        throw new BadRequestError("Cần cung cấp user_id");
    }
    let objectId =  ObjectId.createFromHexString(user_id);
    const userExist = await prisma.user.findUnique({
        where: {
            user_id: objectId,
        },
    });
    if(!userExist){
        throw new BadRequestError("Người dùng không tồn tại");
    }
     await prisma.user.delete({
        where: {
            user_id: objectId,
        },
    });
    return "Đã xóa người dùng thành công";
  },
};