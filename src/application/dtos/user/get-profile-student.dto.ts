export interface GetProfileStudentDTO {
  fullName: string;
  username: string;
  phone: string;
  birthDate: string;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "BLOCKED";
}