import { Prisma, Role } from "@prisma/client";

export interface UserModel {
  id: Prisma.IntFilter;
  roles: Role;
}
