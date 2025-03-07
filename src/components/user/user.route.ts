import { FastifyInstance } from "fastify";
import { registerUserHandler, loginUserHandler, getUsersHandler, updateUserHandler, deleteUserHandler } from "./user.controller";
import { createUserResponseSchema, createUserSchema, updateUserSchema, userLoginResponseSchema, userLoginSchema } from "./user.schema";
import { updateUser } from "./user.services";

async function userRoutes(server: FastifyInstance) {
        // Register admin route
        server.post(
            "/",
            {
                schema: {
                    body: createUserSchema,
                    response: {
                        201: createUserResponseSchema,
                    },
                    tags: ['User'] 
                },
            },
            registerUserHandler
        );

    // Login route
    server.post(
        "/login",
        {
            schema: {
                body: userLoginSchema,
                response: {
                    200: userLoginResponseSchema,
                },
                tags: ['User'] 
            },
        },
        loginUserHandler
    );

    // Get admins route
    server.get(
        "/",
        {
            schema: {
                tags: ['User'] 
            },
            preHandler: [server.authenticate],
        },
        getUsersHandler
    );

    // Update admin route
    server.put(
        "/:id",
        {
            schema: {
                body: updateUserSchema,
                response: {
                    200: createUserResponseSchema,
                },
                tags: ['User'] 
            },
            preHandler: [server.authenticate],
        },
        updateUserHandler
    );

    // Delete admin route
    server.delete(
        "/:id",
        {
            schema: {
                tags: ['User'] 
            },
            preHandler: [server.authenticate],
        },
        deleteUserHandler
    );
}

export default userRoutes;