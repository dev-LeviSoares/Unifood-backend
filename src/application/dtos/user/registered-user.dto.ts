export interface RegisteredUserDTO{
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: "STUDENT" | "SELLER" | "MANAGER";
  status: "PENDING" | "ACTIVE" | "REJECTED" | "BLOCKED";
}