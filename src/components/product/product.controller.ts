import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, findProductById, findProducts, updateProduct, deleteProduct, findProductsByCategory, findProductByUserId } from "./product.service";
import { CategoryType } from "@prisma/client";

//-----------------------------------CREATE PRODUCT HANDLER-----------------------------------
export async function createProductHandler(
  request: FastifyRequest<{ Body: { title: string; content?: string; price: number; categoryType: string } }>,
  reply: FastifyReply
) {
  const body = request.body;
  // Extract owner_id from the JWT token or admin id if available
  const owner_id = request.user?.id;
  // adding log for debugging
  console.log("Request user:", request.user); 
  console.log("Owner ID:", owner_id); // Add logging
  try {
    const categoryType = body.categoryType as CategoryType; // Convert categoryType to enum
    const product = await createProduct({ ...body, owner_id, categoryType });
    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

//-----------------------------------GET PRODUCTS HANDLER-----------------------------------
export async function getProductsHandler() {
  const products = await findProducts();
  return products;
}

//-----------------------------------GET PRODUCT BY ID HANDLER-----------------------------------
export async function getProductByIdHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  const product = await findProductById(id);
  if (!product) {
    return reply.code(404).send({ message: `Product with id ${id} not found` });
  }
  return product;
}

//-----------------------------------GET PRODUCT BY ID HANDLER-----------------------------------
export async function getProductByOwnerIdHandler(
  request: FastifyRequest<{ Params: { user_id: number } }>,
  reply: FastifyReply
) {
  const user_id = Number(request.params.user_id);
  const product = await findProductByUserId(user_id);
  if (!product) {
    return reply.code(404).send({ message: `Product having user id ${user_id} not found` });
  }
  return product;
}

//-----------------------------------UPDATE PRODUCT HANDLER-----------------------------------
export async function updateProductHandler(
  request: FastifyRequest<{ Params: { id: number }; Body: { title?: string; content?: string; price?: number; categoryType?: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  const data = request.body;

  try {
    // Check if product exists
    const product = await findProductById(id);
    if (!product) {
      return reply.code(404).send({ message: `Product with id ${id} not found` });
    }

    // Convert categoryType to enum if it exists
    if (data.categoryType) {
      data.categoryType = data.categoryType as CategoryType;
    }

    // Update the product
    const updatedProduct = await updateProduct(id, {
      ...data,
      categoryType: data.categoryType as CategoryType
    });
    console.log("Product updated successfully");
    return reply.code(200).send(updatedProduct);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

//-----------------------------------DELETE PRODUCT HANDLER-----------------------------------
export async function deleteProductHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  try {
    // Check if product exists
    const product = await findProductById(id);
    if (!product) {
      return reply.code(404).send({ message: `Product with id ${id} not found` });
    }

    // Delete the product
    await deleteProduct(id);
    console.log("Product deleted successfully");
    return reply.code(200).send({ message: `Product deleted successfully with id: ${id}` });
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

//-----------------------------------GET PRODUCTS BY CATEGORY HANDLER-----------------------------------
export async function getProductsByCategoryHandler(
  request: FastifyRequest<{ Params: { categoryType: string } }>,
  reply: FastifyReply
) {
  const categoryType = request.params.categoryType;
  try {
    const products = await findProductsByCategory(categoryType as CategoryType);
    return reply.code(200).send(products);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}