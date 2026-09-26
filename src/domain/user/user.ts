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
  photo: Photo | null;
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

  approve(): void {
    this.assertRole(Role.SELLER);
    this.assertStatus(AccountStatus.PENDING, "aprovar");
    this.props.status = AccountStatus.ACTIVE;
    this.touch();
  }

  reject(): void {
    this.assertRole(Role.SELLER);
    this.assertStatus(AccountStatus.PENDING, "rejeitar");
    this.props.status = AccountStatus.REJECTED;
    this.touch();
  }
  
  block(): void {
    this.assertRole(Role.SELLER, Role.MANAGER, Role.STUDENT);
    this.assertStatus(AccountStatus.ACTIVE, "bloquear");
    this.props.status = AccountStatus.BLOCKED;
    this.touch();
  }
  
  reactivate(): void {
    this.assertRole(Role.SELLER, Role.MANAGER, Role.STUDENT);
    this.assertStatus(AccountStatus.BLOCKED, "reativar");
    this.props.status = AccountStatus.ACTIVE;
    this.touch();
  }
  
  canSell(): boolean {
    return (
      this.props.role === Role.SELLER &&
      this.props.status === AccountStatus.ACTIVE
    );
  }

  // Getters

  get id(): string {
    return this.props.id;
  }

  get fullName(): FullName {
    return this.props.fullName;
  }

  get username(): Username {
    return this.props.username;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }
  
  get phone(): Phone {
    return this.props.phone;
  }
  
  get birthDate(): BirthDate {
    return this.props.birthDate;
  }
  
  get role(): Role {
    return this.props.role;
  }
  
  get status(): AccountStatus {
    return this.props.status;
  }
  
  get cpf(): Cpf | null {
    return this.props.cpf;
  }
  
  get companyName(): CompanyName | null {
    return this.props.companyName;
  }
  
  get photo(): Photo | null {
    return this.props.photo;
  }
  
  get createdAt(): Date {
    return this.props.createdAt;
  }
  
  get updatedAt(): Date {
    return this.props.updatedAt;
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

  private assertRole(...roles: Role[]): void {
    if (!roles.includes(this.props.role)) {
      throw new InvalidUserOperationError(
        "Este perfil não permite essa mudança de status.",
      );
    }
  }

  private assertStatus(expected: AccountStatus, action: string): void {
    if (this.props.status !== expected) {
      throw new InvalidUserOperationError(
        `Não é possível ${action} um usuário com status ${this.props.status}.`,
      );
    }
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}

