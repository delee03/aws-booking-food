import prisma from "../../common/prisma/prisma.init.js";

export const storeService = {
    create: async function (req) {
        const { name, address, phone, socialMedia } = req.body;
        console.log(req.body);
        if (!name || !address || !phone || !socialMedia) {
            throw new BadRequestError(
                "Name, address, phone, socialMedia is invalid"
            );
        }
        const storeExist = await prisma.store.findFirst({
            where: {
                phone: phone,
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
            },
        });
        return newStore;
    },

    findAll: async function (req) {
        return `This action returns all store`;
    },

    findOne: async function (req) {
        return `This action returns a store with id: ${req.params.id}`;
    },

    update: async function (req) {
        return `This action updates a store with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a store with id: ${req.params.id}`;
    },
};
