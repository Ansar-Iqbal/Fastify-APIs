import db from "../../utils/prisma";
import { CategoryType } from "@prisma/client";

// Create product function
export async function createProduct(
    data: {
        title: string; 
        content?: string; 
        price: number; 
        owner_id: number; 
        categoryType: CategoryType }) {
    return db.product.create({
      data,
    });
  }

// Find product by ID function
export async function findProductById(id: number) {
  return db.product.findUnique({
    where: { id },
  });
}

// Find product by user function
export async function findProductByUserId(owner_id: number) {
  return db.product.findMany({
    where: { owner_id  },
    select:{
      owner_id: true,
      title: true,
      content: true,
      price: true,
      categoryType: true,
      created_at: true,
      updated_at: true
    }
  });
}

// Get all products function
export async function findProducts() {
  return db.product.findMany();
}

// Update product function
export async function updateProduct(id: number, data: Partial<{ title?: string; content?: string; price?: number; categoryType?: CategoryType }>) {
  return db.product.update({
    where: { id },
    data,
  });
}

// Find products by category function
export async function findProductsByCategory(categoryType: string) {
    return db.$queryRaw`
    SELECT * FROM "Product"
    WHERE "categoryType"::text ILIKE ${'%' + categoryType + '%'}
  `;
    // return db.product.findMany({
    //   where: {
    //     categoryType: {
    //       equals: categoryType,
    //     },
    //   },
    // });
  }

// Delete product function
export async function deleteProduct(id: number) {
  return db.product.delete({
    where: { id },
  });
}