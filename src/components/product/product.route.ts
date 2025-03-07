// filepath: d:\SO\fastify-api-task\src\components\product\product.route.ts
import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler, getProductByIdHandler, updateProductHandler, deleteProductHandler, getProductsByCategoryHandler, getProductByOwnerIdHandler } from "./product.controller";
import { createProductResponseSchema, createProductSchema, updateProductSchema } from "./product.schema";

async function productRoutes(server: FastifyInstance) {
  // Create Product
  server.post(
    "/",
    {
      schema: {
        body: createProductSchema,
        response: {
          201: createProductResponseSchema,
        },
        tags: ['Product'],
      },
      preHandler: [server.authenticate],
    },
    createProductHandler
  );

  // Get all Products
  server.get(
    "/",
    {
      schema: {
        tags: ['Product']
      },
      preHandler: [server.authenticate],
    },
    getProductsHandler
  );

    // Get all Products
    server.get(
      "/user/:user_id",
      {
        schema: {
          tags: ['Product']
        },
        preHandler: [server.authenticate],
      },
      getProductByOwnerIdHandler
    );

  // Get Product by ID
  server.get("/:id", { schema: { tags: ['Product'] } }, getProductByIdHandler);

    // Get Products by Category
    server.get(
        "/category/:categoryType",
        {
          schema: {
            tags: ['Product']
          },
          preHandler: [server.authenticate],
        },
        getProductsByCategoryHandler
      );

  // Update Product
  server.put(
    "/:id",
    {
      schema: {
        body: updateProductSchema,
        response: {
          200: createProductResponseSchema,
        },
        tags: ['Product']
      },
      preHandler: [server.authenticate],
    },
    updateProductHandler
  );

  // Delete Product
  server.delete(
    "/:id",
    {
      schema: {
        tags: ['Product']
      },
      preHandler: [server.authenticate],
    },
    deleteProductHandler
  );
}

export default productRoutes;
/*
import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler, getProductByIdHandler, updateProductHandler, deleteProductHandler } from "./product.controller";
import { createProductResponseSchema, createProductSchema, updateProductSchema } from "./product.schema";

async function productRoutes(server: FastifyInstance) {
// Create Product
    server.post(
    "/",
    {
        schema: {
            preHandler: [server.authenticate],
            body: createProductSchema,
            response: {
                201: createProductResponseSchema,
            },
            tags: ['Product'] ,
        },
    },
    createProductHandler
);

    // Get all Products
    server.get(
        "/",
        {
            schema: {
                tags: ['Product'] 
            },
            preHandler: [server.authenticate],
        },
        getProductsHandler
    );

    // Get Product by ID
  server.get("/:id", { schema: { tags: ['Product'] } }, getProductByIdHandler);

  // Update Product
  server.put(
    "/:id",
    {
        schema: {
            body: updateProductSchema,
            response: {
                200: createProductResponseSchema,
            },
            tags: ['Product'] 
        },
        preHandler: [server.authenticate],
    },
    updateProductHandler
);
  
// Delete Product
      server.delete(
          "/:id",
          {
              schema: {
                  tags: ['Product'] 
              },
              preHandler: [server.authenticate],
          },
          deleteProductHandler
      );
}


export default productRoutes;
*/