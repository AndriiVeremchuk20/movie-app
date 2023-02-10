import { UserModel } from "../../src/types/user.model";

declare global {
    namespace Express{
        interface Request{
            currentUser: UserModel,
        }
    }
}