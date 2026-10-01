import type { UsersRepository } from "@/domain/user/repository/users-repository.js";
import type { User } from "@/domain/user/user.js";
import { PixKey } from "@/domain/user/value-objects/pix-key.js";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    return user ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.items.find(
      (item) => item.username.getValue === username,
    );

    return user ?? null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.items.find((item) => item.cpf?.value === cpf);

    return user ?? null;
  }

  async findByPixKey(pixKey: string): Promise<User | null> {
    const user = this.items.find((item) => item.pixKey?.sanitize() === pixKey);

    return user ?? null;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async save(id: string, user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);
  
    if (index >= 0) {
      this.items[index] = user;
    }
  }

  async savePixKey(id: string, pix: string | null): Promise<void> {
    const user = this.items.find((item) => item.id === id);
    if (!user) return;
    if (pix === null) {
      user.deletePixKey();
      return;
    }
    user.setPixKey(new PixKey(pix));
  }
}