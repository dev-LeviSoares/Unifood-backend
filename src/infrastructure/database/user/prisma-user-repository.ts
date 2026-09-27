import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { User } from "@/domain/user/user.js";
import { PrismaUserMapper } from "./prisma-user-mapper.js";
import { PrismaClient } from "@/generated/prisma/client.js";

export class PrismaUsersRepository implements UsersRepository{
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!row) {
      return null;
    }

    return PrismaUserMapper.toDomain(row);
  }

  async findByUsername(username: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { username },
    });

    if(!row) {
      return null
    }

    return PrismaUserMapper.toDomain(row);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if(!row) {
      return null
    }

    return PrismaUserMapper.toDomain(row);
  }

  async findByPixKey(pixKey: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { pixKey },
    });

    if (!row) {
      return null;
    }

    return PrismaUserMapper.toDomain(row);
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        username: user.username.getValue,
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
        passwordHash: user.passwordHash,
        cpf: user.cpf?.value ?? null,
        telephone: user.phone.getValue,
        birthDate: user.birthDate.value,
        companyName: user.companyName?.getValue ?? null,
        pixKey: user.pixKey?.sanitize() ?? null,
        status: user.status,
        avatarUrl: user.photo?.value ?? null,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  }
}