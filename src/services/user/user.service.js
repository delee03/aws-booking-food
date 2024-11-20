import prisma from "../../common/prisma/prisma.init.js";

export const userService = {
  create: async function (req) {
    return `This action creates a entity`;
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
        results: results || [],
    };

  },

  findOne: async function (req) {
    return `This action returns a entity with id: ${req.params.id}`;
  },

  update: async function (req) {
    return `This action updates a entity with id: ${req.params.id}`;
  },

  remove: async function (req) {
    return `This action removes a entity with id: ${req.params.id}`;
  },
};