import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import connect from "@/lib/data";
import Session from "@/lib/models/Session";
import User from "@/lib/models/User";

const scrypt = promisify(scryptCallback);
const SESSION_COOKIE = "dnh_session";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 30;

export type SafeUser = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "user" | "admin";
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const storedBuffer = Buffer.from(key, "hex");
  return storedBuffer.length === derived.length && timingSafeEqual(storedBuffer, derived);
}

export async function createSession(userId: string) {
  await connect();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_AGE_SECONDS * 1000);
  await Session.create({ tokenHash: hashToken(token), userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_AGE_SECONDS,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      await connect();
      await Session.deleteOne({ tokenHash: hashToken(token) });
    } catch {
      // Cookie removal still signs the client out when the database is unavailable.
    }
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    await connect();
    const session = await Session.findOne({
      tokenHash: hashToken(token),
      expiresAt: { $gt: new Date() },
    }).lean();
    if (!session) return null;
    const user = await User.findById(session.userId).lean();
    if (!user) return null;
    return {
      id: String(user._id), firstName: user.firstName, lastName: user.lastName,
      phone: user.phone, role: user.role,
    };
  } catch {
    return null;
  }
}
