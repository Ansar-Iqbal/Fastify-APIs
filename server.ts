import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import { createAdminSchema, createAdminResponseSchema, loginSchema, loginResponseSchema, updateAdminSchema } from "./src/components/admin/admin.schema";
import adminRoutes from "./src/components/admin/admin.route";
import { createUserSchema, createUserResponseSchema, userLoginSchema, userLoginResponseSchema, updateUserSchema } from "./src/components/user/user.schema";
import userRoutes from "./src/components/user/user.route";
import productRoutes from "./src/components/product/product.route";
import { createProductResponseSchema, createProductSchema, updateProductSchema } from "./src/components/product/product.schema";
//import { createProductSchema, createProductResponseSchema, updateProductSchema } from "./src/components/products/product.schema";
//import userRoutes from "./src/components/users/user.route";
//import productRoutes from "./src/components/products/product.route";
//import { createUserSchema, createUserResponseSchema, loginSchema as userLoginSchema, loginResponseSchema as userLoginResponseSchema, updateUserSchema } from "./src/components/users/user.schema";
//import { createProductSchema, createProductResponseSchema, updateProductSchema } from "./src/components/products/product.schema";

export const server = Fastify({ logger: true });


//-----------------------------------JWT-----------------------------------
// authenticate globally, so declaring here
declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

// Extend FastifyJWT interface to include user property
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
    };
  }
}

server.register(fastifyJwt, {
  secret: "abc123abc!456abc789@",
});

server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    console.log("JWT verification failed:", err);
    return reply.send(err);
  }
});

//-----------------------------------Health Check-----------------------------------
// Health check route
server.get("/health", async () => {
  return { status: "OK" };
});

// Start server
  //const main = async () => {

  // Register all schemas (userSchemas, productSchemas, adminSchemas)
  const schemas = [
    createAdminSchema,
    createAdminResponseSchema,
    loginSchema,
    loginResponseSchema,
    updateAdminSchema,
    createUserSchema,
    createUserResponseSchema,
    userLoginSchema,
    userLoginResponseSchema,
    updateUserSchema,
     createProductSchema,
    createProductResponseSchema,
     updateProductSchema,
  ];

  for (const schema of schemas) {
    server.addSchema(schema);
  };

  
  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fastify API",
        description: "API documentation with Fastify",
        version: "1.0.0",
      },
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "JWT Authorization header using the Bearer scheme",
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  // Swagger UI
  server.register(fastifySwaggerUi, {
    routePrefix: '/documentations', 
  }); 
  
  // Routes
  server.register(adminRoutes, { prefix: "/api/admins" });
  server.register(userRoutes, { prefix: "/api/users" });
  server.register(productRoutes, { prefix: "/api/products" });

 const main = async () => {

  try {
    await server.listen({ port: 3000 });
    console.log("Server is running at http://localhost:3000/health");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main()