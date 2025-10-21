"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type UserWithDetails = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dept: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
};

export async function getAllUsersWithDetails() {
  try {
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dept: user.dept,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isAdmin: user.isAdmin,
      })
      .from(user)
      .orderBy(desc(user.createdAt));

    return { success: true, data: users as UserWithDetails[] };
  } catch (error) {
    console.error("Failed to get users with details:", error);
    return { success: false, error: "Failed to get users with details" };
  }
}

export async function getUserById(id: string) {
  try {
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (userData.length === 0) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: userData[0] as UserWithDetails };
  } catch (error) {
    console.error("Failed to get user:", error);
    return { success: false, error: "Failed to get user" };
  }
}

export async function makeUserAdmin(id: string) {
  try {
    const updatedUser = await db
      .update(user)
      .set({
        isAdmin: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users");
    return { success: true, data: updatedUser[0] };
  } catch (error) {
    console.error("Failed to make user admin:", error);
    return { success: false, error: "Failed to make user admin" };
  }
}

export async function removeAdminRole(id: string) {
  try {
    const updatedUser = await db
      .update(user)
      .set({
        isAdmin: false,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users");
    return { success: true, data: updatedUser[0] };
  } catch (error) {
    console.error("Failed to remove admin role:", error);
    return { success: false, error: "Failed to remove admin role" };
  }
}

export async function deleteUser(id: string) {
  try {
    const deletedUser = await db
      .delete(user)
      .where(eq(user.id, id))
      .returning();

    if (deletedUser.length === 0) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users");
    return { success: true, data: deletedUser[0] };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function getAllUsers() {
  try {
    const users = await db.select().from(user).orderBy(desc(user.createdAt));
    return { success: true, data: users };
  } catch (error) {
    console.error("Failed to get users:", error);
    return { success: false, error: "Failed to get users" };
  }
}
