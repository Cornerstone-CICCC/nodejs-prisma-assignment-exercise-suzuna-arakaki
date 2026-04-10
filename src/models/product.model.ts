import { prisma } from "../lib/prisma";
import { Product } from "../generated/prisma/browser";

// Get all products
const fetchAll = async () => {
  return await prisma.product.findMany();
};

// Get product by id
const fetchOne = async (id: number) =>
  await prisma.product.findUnique({
    where: { id },
  });

// Add product
const add = async (data: Omit<Product, "id">) =>
  await prisma.product.create({ data });

// Edit product
const edit = async (id: number, data: Partial<Product>) =>
  await prisma.product.update({
    where: { id },
    data,
  });

// Delete product
const remove = async (id: number) =>
  await prisma.product.delete({
    where: { id },
  });

export default {
  fetchAll,
  fetchOne,
  add,
  edit,
  remove,
};
