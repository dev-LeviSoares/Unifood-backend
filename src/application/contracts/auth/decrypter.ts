export interface Decrypter {
  decrypt(token: string): Promise<{
    sub: string;
    role?: string;
    name?: string;
  }>;
}