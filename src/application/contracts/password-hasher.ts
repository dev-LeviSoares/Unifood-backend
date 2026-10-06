export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  compare(password: string, passwordHash: string): Promise<boolean>;
}