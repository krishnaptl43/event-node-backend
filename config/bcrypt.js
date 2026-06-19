import bcrypt from "bcryptjs";

export async function generatHash(password) {
    let saltRound = 10;
    try {
        let hash = await bcrypt.hash(password, saltRound);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

export async function verifyHash(password, hash) {
    try {
        let match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        console.log(error);
        return false;
    }
}