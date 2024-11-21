
import { BadRequestError } from "../../common/helpers/handle.error.js";
import prisma from "../../common/prisma/prisma.init.js";
import {ObjectId} from "bson"

export const storeService = {
    create: async function (req) {
        const { name, address, phone, socialMedia, bankName, bankAccount } = req.body;
        console.log(req.body);
        if (!name || !address || !phone || !socialMedia || !bankName || !bankAccount) {
            throw new BadRequestError(
                "Name, address, phone, socialMedia, bankingName, and bankingAccount are required"
            );
        }
        const storeExist = await prisma.store.findFirst({
            where: {
              phone : phone,
               name: name,
            },
        });
        if (storeExist) {
            throw new BadRequestError("Store is exist");
        }
        const newStore = await prisma.store.create({
            data: {
                name: name,
                address: address,
                phone: phone,
                socialMedia: socialMedia,
                bankName,
                bankAccount,
            },
        });
        return newStore;
    },

    findAll: async function (req) {
        let { pageIndex, pageSize } = req.query;
        pageSize = pageSize ? +pageSize : 3;
        pageIndex = pageIndex ? +pageIndex : 1;
        const offset = (pageIndex - 1) * pageSize;
        let totalItems = await prisma.store.count();
        let totalPages = Math.ceil(totalItems / pageSize);
        const results = await prisma.store.findMany({
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
        const store_id = req.params.id;
        console.log({storeId: store_id});
        if(!store_id){
            throw new BadRequestError("Store id is required");
        }   
        let objectId =  ObjectId.createFromHexString(store_id);
        if (!ObjectId.isValid(store_id)) {
            throw new BadRequestError("Invalid Store ID");
          }
        const storeExist = await prisma.store.findUnique({
            where: {
                store_id: objectId,
            }
        })
        if(!storeExist){
            throw new BadRequestError("Store is not exist");
        }
        return storeExist;
    },

    update: async function (req) {
        const storeId = req.params.id;
        const { name, address, phone, socialMedia, bankName, bankAccount } = req.body;
        if (!name || !address || !phone || !socialMedia || !bankName || !bankAccount) {
            throw new BadRequestError(
                "Name, address, phone, socialMedia, bankingName, and bankingAccount are required"
            );
        }
        let objectId =  ObjectId.createFromHexString(storeId);
        const storeExist = await prisma.store.findUnique({
            where: {
                store_id: objectId,
            }
        })
        if(!storeExist){
            throw new BadRequestError("Store is not exist");
        }
        const updatedStore = await prisma.store.update({
            where: {
                store_id: objectId,
            },
            data: {
                name: name,
                address: address,
                phone: phone,
                socialMedia: socialMedia,
                bankName,
                bankAccount,
            },
        });
        return updatedStore;
    },

    remove: async function (req) {
       const storeId = req.params.id;
     
         if(!storeId){
              throw new BadRequestError("Store id is required");
         }
         let objectId =  ObjectId.createFromHexString(storeId);
            const storeExist = await prisma.store.findUnique({
                where: {
                    store_id: objectId,
                }
            })
            if(!storeExist){
                throw new BadRequestError("Store is not exist");
            }
            await prisma.store.delete({
                where: {
                    store_id: objectId,
                },
            });
            return "Đã xóa cửa hàng thành công";
    },
};
