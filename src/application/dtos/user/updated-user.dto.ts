export interface UpdatedUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  birthDate: string;
  cpf: string | null;
  companyName: string | null;
  photoKey: string | null;
  pixKey: string | null;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "BLOCKED";
}