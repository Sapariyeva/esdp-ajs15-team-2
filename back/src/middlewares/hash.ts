import bcrypt from "bcrypt";

async function hash(data: string) {
    const salt = await bcrypt.genSalt(10);
    data = await bcrypt.hash(data, salt);
    return data;
}