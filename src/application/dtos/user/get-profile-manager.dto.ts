export interface GetProfileManagerDTO {
  fullName: string;
  username: string;
  phone: string;
  birthDate: string;
  cpf: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "BLOCKED";
}