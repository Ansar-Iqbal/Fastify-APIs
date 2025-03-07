import { hashPassword } from "../../utils/hash";
import db from "../../utils/prisma";

// Create user function
export async function createUser(input: { email: string; password: string; first_name: string; last_name: string; date_of_birth: Date }) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const user = await db.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

// Find user by email function
export async function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      date_of_birth: true,
      salt: true,
      password: true,
      created_at: true,
      updated_at: true,
    },
  });
}

// Get all users function
export async function findUsers() {
  return db.user.findMany();
}

// Find user by ID function
export async function findUserById(id: number) {
  return db.user.findUnique({
    where: { id },
  });
}

// Update user function
export async function updateUser(id: number, data: Partial<{ email?: string; password?: string; firstName?: string; lastName?: string; age?: number; salt?: string }>) {
  if (data.password) {
    const { hash, salt } = hashPassword(data.password);
    data.password = hash;
    data.salt = salt;
  }
  return db.user.update({
    where: { id },
    data,
  });
}

// Delete user function
export async function deleteUser(id: number) {
  return db.user.delete({
    where: { id },
  });
}