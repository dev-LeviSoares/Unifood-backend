// Objetivo do mapper - Converter o modelo de dados do banco para o modelo de domínio e vice-versa

import { AccountStatus } from "@/domain/user/enum/account-status.js";
import { Role } from "@/domain/user/enum/role.js";
import { User } from "@/domain/user/user.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { CompanyName } from "@/domain/user/value-objects/company-name.js";
import { Cpf } from "@/domain/user/value-objects/cpf.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { Photo } from "@/domain/user/value-objects/photo.js";
import { Username } from "@/domain/user/value-objects/username.js";

type UserRow = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  cpf: string | null;
  telephone: string;
  birthDate: Date;
  companyName: string | null;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "BLOCKED";
  avatarUrl: string | null;
  role: "STUDENT" | "SELLER" | "MANAGER";
  createdAt: Date;
  updatedAt: Date;
}

export const PrismaUserMapper = {
  toDomain(row: UserRow): User {
    return User.restore({
      id: row.id,
      fullName: FullName.create(row.firstName, row.lastName),
      username: new Username(row.username),
      passwordHash: row.passwordHash,
      phone: new Phone(row.telephone),
      birthDate: BirthDate.restore(row.birthDate),
      role: row.role as Role,
      status: row.status as AccountStatus,
      cpf: row.cpf ? new Cpf(row.cpf) : null,
      companyName: row.companyName ? new CompanyName(row.companyName) : null,
      photo: row.avatarUrl ? Photo.create(row.avatarUrl) : null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    });
  }
};