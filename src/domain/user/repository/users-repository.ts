import type { User } from "@/domain/user/user.js";

export interface UsersRepository {
  findByUsername(username: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  create(user: User): Promise<void>;
}