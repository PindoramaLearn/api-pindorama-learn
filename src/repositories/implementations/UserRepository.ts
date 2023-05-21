import { User } from "@prisma/client";
import prismaClient from "../../database/prismaClient";
import { IUserRepository } from "../IUserRepository";
import { z } from "zod";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    let user = await prismaClient.user.findFirst({
      where: { email },
    });

    return user as User | null;
  }

  async create(data: User): Promise<void> {
    const queryUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const userSchema = z.object({
      name: z.string().min(3).max(255),
      email: z.string().email(),
      password: z.string().min(6).max(255),
    });

    const verifyQuery = userSchema.safeParse(queryUser);

    if (!verifyQuery.success) {
      throw new Error("Invalid data");
    }

    await prismaClient.user.create({
      data: queryUser,
    });
  }
}
