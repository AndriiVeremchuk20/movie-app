import { Role } from "@prisma/client";
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

export const generateAccessTocken = (id: string, role: Role, isPremium: boolean ) => {
    const payload = {
        id: id,
        role: role,
        isPremium: isPremium
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export const decodeAccessToken = (token: String) => {
    const decodeData = jwt.verify(token, secret);
    return decodeData;
}
