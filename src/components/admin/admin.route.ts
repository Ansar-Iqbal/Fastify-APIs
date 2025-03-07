import { FastifyInstance } from "fastify";
import { loginHandler, registerAdminHandler, getAdminsHandler, deleteAdminHandler, updateAdminHandler } from "./admin.controller";
import { createAdminSchema, createAdminResponseSchema, loginSchema, loginResponseSchema, updateAdminSchema } from "./admin.schema";

async function adminRoutes(server: FastifyInstance) {
    // Register admin route
    server.post(
        "/",
        {
            schema: {
                body: createAdminSchema,
                response: {
                    201: createAdminResponseSchema,
                },
                tags: ['Admin'] 
            },
        },
        registerAdminHandler
    );

    // Login route
    server.post(
        "/login",
        {
            schema: {
                body: loginSchema,
                response: {
                    200: loginResponseSchema,
                },
                tags: ['Admin'] 
            },
        },
        loginHandler
    );

    // Get admins route
    server.get(
        "/",
        {
            schema: {
                tags: ['Admin'] 
            },
            preHandler: [server.authenticate],
        },
        getAdminsHandler
    );

    // Update admin route
    server.put(
        "/:id",
        {
            schema: {
                body: updateAdminSchema,
                response: {
                    200: createAdminResponseSchema,
                },
                tags: ['Admin'] 
            },
            preHandler: [server.authenticate],
        },
        updateAdminHandler
    );

    // Delete admin route
    server.delete(
        "/:id",
        {
            schema: {
                tags: ['Admin'] 
            },
            preHandler: [server.authenticate],
        },
        deleteAdminHandler
    );
}

export default adminRoutes;