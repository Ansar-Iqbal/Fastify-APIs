/* creating own schema for user
using zod: a validation library, clear and consize library to define schemas 
and validation rules, they are built in libraries. */ 


//-----------------------------------USER SCHEMA-----------------------------------
const createAdminSchema = {
    $id: "createAdminSchema",
    type: "object",
    required: ["email", "password"],
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
    },
};

const createAdminResponseSchema = {
    $id: "createAdminResponseSchema",
    type: "object",
    properties: {
        id: { type: "number" },
        email: { type: "string", format: "email" },
    },
};

//-----------------------------------LOGIN SCHEMA-----------------------------------
const loginSchema = {
    $id: "loginSchema",
    type: "object",
    required: ["email", "password"],
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
    },
};

const loginResponseSchema = {
    $id: "loginResponseSchema",
    type: "object",
    properties: {
        accessToken: { type: "string" },
    },
};

//---------------------------------UPDATE SCHEMA-----------------------------------
const updateAdminSchema = {
    $id: "updateAdminSchema",
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
    },
};

export {
    createAdminSchema,
    createAdminResponseSchema,
    loginSchema,
    loginResponseSchema,
    updateAdminSchema,
};