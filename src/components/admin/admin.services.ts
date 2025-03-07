import { hashPassword } from "../../utils/hash";
import db from "../../utils/prisma";

// Create admin function
export async function createAdmin(input: { email: string; password: string }) {
    const { password, ...rest } = input;
  
    const { hash, salt } = hashPassword(password);
  
    const admin = await db.admin.create({
      data: { ...rest, salt, password: hash },
    });
  
    return admin;
}

// Find admin by email function
export async function findAdminByEmail(email: string) {
    return db.admin.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true,
            salt: true,
            created_at: true,
            updated_at: true,
        },
    });
}

// Get all admins function
export async function findAdmins() {
    return db.admin.findMany();
}

// Find admin by ID function
export async function findAdminById(id: number) {
    return db.admin.findUnique({
        where: { id },  // Fetch admin by unique ID
    });
}

// Update admin function
export async function updateAdmin(id: number, data: Partial<{ email?: string; password?: string; salt?: string }>) {
    if (data.password) {
        const { hash, salt } = hashPassword(data.password);
        data.password = hash;
        data.salt = salt;
    }
    return db.admin.update({
        where: { id },
        data,
    });
}

// Delete admin function
export async function deleteAdmin(id: number) {
    return db.admin.delete({
        where: { id },
    });
}