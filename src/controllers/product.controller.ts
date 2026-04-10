import { Request, Response } from "express";
import productModel from "../models/product.model";

// Get product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.fetchAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by id
const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await productModel.fetchOne(Number(id));
    if (!product) {
      res.status(404).json({ message: "Cannot find product" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add product
const addProduct = async (req: Request, res: Response) => {
  const { productName, price } = req.body;

  try {
    const newProduct = await productModel.add({
      productName,
      price,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product by id
const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productName, price } = req.body;
  try {
    const updateProduct = await productModel.edit(Number(id), {
      productName,
      price,
    });
    if (!updateProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by id
const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteProduct = await productModel.remove(Number(id));
    if (!deleteProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(deleteProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllProduct,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
