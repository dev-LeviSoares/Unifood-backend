import type { User } from "@/domain/user/user.js";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  findByPixKey(pixKey: string): Promise<User | null>;
  // findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  save(id: string, user: User): Promise<void>;
  savePixKey(id: string, pix: string | null): Promise<void>;
}