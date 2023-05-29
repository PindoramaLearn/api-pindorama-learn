import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: User): Promise<void>;
  findAll(): Promise<User[]>;
}
