import crypto from "crypto";

// Hashing a password with a salt
export function hashPassword(password: string) {
    // Generate a new salt
    const salt = crypto.randomBytes(16).toString("hex"); 
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return { salt, hash };
}

// Function to verify password
export function verifyPassword({
    candidatePassword,
    salt,
    hash,
}: {
    candidatePassword: string;
    salt: string;
    hash: string;
}): boolean {
    console.log("Verifying password...");
    console.log("Input password:", candidatePassword);
    console.log("Stored salt:", salt);
    console.log("Stored hash:", hash);

    const candidateHash = crypto.pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512").toString("hex");
    console.log("Hash from login input:", candidateHash);

    return candidateHash === hash;
}