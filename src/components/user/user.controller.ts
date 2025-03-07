import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUserById, findUsers, updateUser, deleteUser } from "./user.services";
import { server } from "../../../server";
import { verifyPassword } from "../../utils/hash";

//-----------------------------------REGISTER USER HANDLER-----------------------------------
export async function registerUserHandler(
  request: FastifyRequest<{ Body: { email: string; password: string; first_name: string; last_name: string; date_of_birth: Date } }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

//-----------------------------------LOGIN HANDLER-----------------------------------
export async function loginUserHandler(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const body = request.body;

  // Find user by email
  const user = await findUserByEmail(body.email);
  console.log("User found in DB:", user);

  if (!user) {
    return reply.code(401).send({ message: "Invalid email or password" });
  }

  // Verify password (assuming you have a verifyPassword function)
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  console.log("Password Match:", correctPassword);

  if (correctPassword) {
    const { password, salt, ...rest } = user;
    // Generate access token
    const accessToken = server.jwt.sign(rest);
    return reply.send({ accessToken });
  }

  return reply.code(401).send({ message: "Invalid email or password" });
}

//-----------------------------------GET USERS HANDLER-----------------------------------
export async function getUsersHandler() {
  const users = await findUsers();
  const requiredUsers = users.map((user: { password: string; salt: string; [key: string]: any }) => {
    const { password, salt, ...rest } = user;
    return rest;
  });
  return requiredUsers;
}

//-----------------------------------UPDATE USER HANDLER-----------------------------------
export async function updateUserHandler(
  request: FastifyRequest<{ Params: { id: number }; Body: { email?: string; password?: string; firstName?: string; lastName?: string; age?: number } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  const data = request.body;

  try {
    // Check if user exists
    const user = await findUserById(id);
    if (!user) {
      return reply.code(404).send({ message: `User with id ${id} not found` });
    }

    // Update the user
    const updatedUser = await updateUser(id, data);
    console.log("User updated successfully");
    return reply.code(200).send(updatedUser);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

//-----------------------------------DELETE USER HANDLER-----------------------------------
export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  try {
    // Check if user exists
    const user = await findUserById(id);
    if (!user) {
      return reply.code(404).send({ message: `User with id ${id} not found` });
    }

    // Delete the user
    await deleteUser(id);
    console.log("User deleted successfully");
    return reply.code(200).send({ message: `User deleted successfully with id: ${id}` });
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}