const bycript = require('bcryptjs');

// make hash for user password
export const hashPassword = (password: string) => {
    const salt = bycript.genSaltSync();
    return bycript.hashSync(password, salt);
}

// compare user password with hashing password 
export const comparePassword = async (raw: string, hash: string) => {
    return await bycript.compare(raw, hash);
}
