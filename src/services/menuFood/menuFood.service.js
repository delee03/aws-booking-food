import { ObjectId } from "bson";
import prisma from "../../common/prisma/prisma.init.js";
import { BadRequestError } from "../../common/helpers/handle.error.js";

export const menuFoodService = {
  create: async function (req) {
   let { name, price, description, storeId } = req.body;
   if(!name || !price || !description || !storeId){
       throw new BadRequestError("Name, price, description, storeId are required");
   }
    const foodExist = await prisma.menuFood.findFirst({
         where: {
             name: name,
         },
    });
    if (foodExist) {
        throw new BadRequestError("Food is exist");
    }
    const newFood = await prisma.menuFood.create({
        data: {
            name: name,
            price: parseFloat(price), 
            description: description,
            store: {
                connect: {
                  store_id: storeId, // Đảm bảo chuỗi ObjectId là hợp lệ
                },
              },
        },
    });
    return newFood;

  },

  findAll: async function (req) {
    let { pageIndex, pageSize } = req.query;
    pageSize = pageSize ? +pageSize : 3;
    pageIndex = pageIndex ? +pageIndex : 1;
    const offset = (pageIndex - 1) * pageSize;
    let totalItems = await prisma.menuFood.count();
    let totalPages = Math.ceil(totalItems / pageSize);
    const results = await prisma.menuFood.findMany({
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
  findByStore : async (req) => { 
    let { pageIndex, pageSize, storeId } = req.query;
    pageSize = pageSize ? +pageSize : 6;
    pageIndex = pageIndex ? +pageIndex : 1;
    const offset = (pageIndex - 1) * pageSize;
    let totalItems = await prisma.menuFood.count();
    let totalPages = Math.ceil(totalItems / pageSize);
    const results = await prisma.menuFood.findMany({
        where: {
            storeId: storeId,
        },
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
    const food_id = req.params.id;
    if(!food_id){
        throw new BadRequestError("Cần cung cấp food_id");
    }
   // let objectId =  ObjectId.createFromHexString(food_id);
    const foodExist = await prisma.menuFood.findUnique({
        where: {
            food_id: food_id,
        },
    });
    if (!foodExist) {
        throw new BadRequestError("Không tìm thấy food");
    }
    return foodExist;
  },

  update: async function (req) {
    const food_id = req.params.id;
    const { name, price, description, storeId, status} = req.body;
    if(!food_id){
        throw new BadRequestError("Cần cung cấp food_id");
    }
  
    //let objectId =  ObjectId.createFromHexString(food_id);
    
    const foodExist = await prisma.menuFood.findUnique({
        where: {
            food_id: food_id,
        },
    });
    if (!foodExist) {
        throw new BadRequestError("Không tìm thấy food");
    }
    const updatedFood = await prisma.menuFood.update({
        where: {
            food_id: food_id,
        },
        data: {
            name: name,
            price: price,
            description: description,
            storeId: storeId,
            status: status,
        },
    });
    return updatedFood;
  },

  remove: async function (req) {
    const food_id = req.params.id;
    if(!food_id){
        throw new BadRequestError("Cần cung cấp food_id");
    }
    let objectId =  ObjectId.createFromHexString(food_id);
    const foodExist = await prisma.menuFood.findUnique({
        where: {
            food_id: objectId,
        },
    });
    if (!foodExist) {
        throw new BadRequestError("Không tìm thấy food");
    }
   await prisma.menuFood.delete({
        where: {
            food_id: objectId,
        },
    });
    return "Đã xóa food thành công";
  },
};