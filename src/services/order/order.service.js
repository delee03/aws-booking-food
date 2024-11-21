export const orderService = {
  create: async function (req) {
    return `This action creates a order`;
  },

  findAll: async function (req) {
    return `This action returns all order`;
  },

  findOne: async function (req) {
    return `This action returns a order with id: ${req.params.id}`;
  },

  update: async function (req) {
    return `This action updates a order with id: ${req.params.id}`;
  },

  remove: async function (req) {
    return `This action removes a order with id: ${req.params.id}`;
  },
};