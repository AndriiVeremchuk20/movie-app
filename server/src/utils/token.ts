import { Role } from "@prisma/client";
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

export const generateAccessTocken = (id: string, roles: Role ) => {
    const payload = {
        id: id,
        role: roles,
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export const decodeAccessToken = (token: String) => {
    const decodeData = jwt.verify(token, secret);
    return decodeData;
}
