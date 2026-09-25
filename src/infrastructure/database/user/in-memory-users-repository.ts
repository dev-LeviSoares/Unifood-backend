import type { UsersRepository } from "@/domain/user/repository/users-repository.js";
import type { User } from "@/domain/user/user.js";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

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

  async create(user: User): Promise<void> {
    this.items.push(user);
  }
}