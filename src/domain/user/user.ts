import { randomUUID } from "node:crypto";

import { AccountStatus } from "./enum/account-status.js";
import { BirthDate } from "./value-objects/birth-date.js";
import { FullName } from "./value-objects/full-name.js";
import { Phone } from "./value-objects/phone.js";
import { Cpf } from "./value-objects/cpf.js";
import { CompanyName } from "./value-objects/company-name.js";
import { Photo } from "./value-objects/photo.js";
import { Username } from "./value-objects/username.js";
import { InvalidUserOperationError } from "./errors/invalid-user-operation-error.js";
import { Role } from "./enum/role.js";

interface UserProps {
  id: string;
  fullName: FullName;
  username: Username;
  passwordHash: string;
  phone: Phone;
  birthDate: BirthDate;
  role: Role;
  status: AccountStatus;
  cpf: Cpf | null
  companyName: CompanyName | null;
  photo: Photo | null;
  createdAt: Date;
  updatedAt: Date;
}

interface RegisterUserInput {
  fullName: FullName;
  username: Username;
  passwordHash: string;
  phone: Phone;
  birthDate: BirthDate;
}

interface RegisterStudentInput extends RegisterUserInput {}

interface RegisterSellerInput extends RegisterUserInput {
  cpf: Cpf;
  companyName: CompanyName;
  photo: Photo;
}

interface RegisterManagerInput extends RegisterUserInput {
  cpf: Cpf;
}

export class User {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  static registerStudent(input: RegisterStudentInput): User {
    const now = new Date();

    return new User({
      id: randomUUID(),
      fullName: input.fullName,
      username: input.username,
      passwordHash: User.ensurePasswordHash(input.passwordHash),
      phone: input.phone,
      birthDate: input.birthDate,
      role: Role.STUDENT,
      status: AccountStatus.ACTIVE,
      cpf: null,
      companyName: null,
      photo: null,
      createdAt: now,
      updatedAt: now
    })
  }

  static registerSeller(input: RegisterSellerInput): User {
    const now = new Date();

    return new User({
      id: randomUUID(),
      fullName: input.fullName,
      username: input.username,
      passwordHash: User.ensurePasswordHash(input.passwordHash),
      phone: input.phone,
      birthDate: input.birthDate,
      role: Role.SELLER,
      status: AccountStatus.PENDING,
      cpf: input.cpf,
      companyName: input.companyName,
      photo: input.photo,
      createdAt: now,
      updatedAt: now,
    })
  }

  static registerManager(input: RegisterManagerInput): User {
    const now = new Date();

    return new User({
      id: randomUUID(),
      fullName: input.fullName,
      username: input.username,
      cpf: input.cpf,
      passwordHash: User.ensurePasswordHash(input.passwordHash),
      role: Role.MANAGER,
      status: AccountStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
      birthDate: input.birthDate,
      companyName: null,
      phone: input.phone,
      photo: null
    })
  }

  static restore(props: UserProps): User {
    return new User(props);
  }


  private static ensurePasswordHash(passwordHash: string): string {
    if (passwordHash.trim().length === 0) {
      throw new InvalidUserOperationError("O hash da senha é obrigatório.");
    }
    return passwordHash;
  }

}

