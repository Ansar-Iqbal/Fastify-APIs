import { FastifyReply, FastifyRequest } from "fastify";
import { verifyPassword } from "../../utils/hash";
import { createAdmin, findAdminByEmail, findAdminById, findAdmins, updateAdmin, deleteAdmin} 
        from "./admin.services";

import { server } from "../../../server";

//-----------------------------------REGISTER ADMIN HANDLER-----------------------------------
export async function registerAdminHandler(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const admin = await createAdmin(body);
        return reply.code(201).send(admin);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

//-----------------------------------LOGIN HANDLER-----------------------------------
export async function loginHandler(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
) {
    const body = request.body;

    // Find admin by email
    const admin = await findAdminByEmail(body.email);
    console.log("User found in DB:", admin);

    if (!admin) {
        return reply.code(401).send({ message: "Invalid email or password" });
    }

    // Testing: Log stored password AND salt
    console.log("Stored Hash:", admin.password);
    console.log("Stored Salt:", admin.salt);
    console.log("Incoming Password:", body.password);

    // Verify password
    const correctPassword = verifyPassword({
        candidatePassword: body.password,
        salt: admin.salt,
        hash: admin.password,
    });

    console.log("Password Match:", correctPassword);

    if (correctPassword) {
        const { password, salt, ...rest } = admin;
        // Generate access token
        const accessToken = server.jwt.sign(rest);
        return reply.send({ accessToken });
    }

    return reply.code(401).send({ message: "Invalid email or password" });
}

//-----------------------------------GET ADMINS HANDLER-----------------------------------
export async function getAdminsHandler() {
    const admins = await findAdmins();
    const requiredAdmins = admins.map((
        admin: { password: string; salt: string; [key: string]: any }) => 
        {
        const { password, salt, ...rest } = admin;
        return rest;
    });
    return requiredAdmins;
}

//-----------------------------------UPDATE ADMIN HANDLER-----------------------------------
export async function updateAdminHandler(
    request: FastifyRequest<{ Params: { id: number }; Body: { email?: string; password?: string } }>,
    reply: FastifyReply
) {
    const id = Number(request.params.id);
    const data = request.body;

    try {
        // Check if admin exists
        const admin = await findAdminById(id);
        if (!admin) {
            return reply.code(404).send({ message: `Admin with id ${id} not found` });
        }

        // Update the admin
        const updatedAdmin = await updateAdmin(id, data);
        console.log("Admin updated successfully");
        return reply.code(200).send(updatedAdmin);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

//-----------------------------------DELETE ADMIN HANDLER-----------------------------------
export async function deleteAdminHandler(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    const id = Number(request.params.id);

    try {
        // Check if admin exists
        const admin = await findAdminById(id);
        if (admin) {
            const { email } = admin;
        }
        if (!admin) {
            return reply.code(404).send({ message: `Admin with id ${id} not found` });
        }

        // Delete the admin
        await deleteAdmin(id);
        console.log("Admin deleted successfully");
        return reply.code(200).send({ message: `Admin deleted successfully with id: ${id} & `, email:admin.email });
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}