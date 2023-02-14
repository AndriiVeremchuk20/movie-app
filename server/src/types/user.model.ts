import { Role } from "@prisma/client";

export interface UserModel {
  id: string;
  roles: Role;
}
