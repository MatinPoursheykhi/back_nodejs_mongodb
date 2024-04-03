import * as bcrypt from 'bcrypt'

export async function compare(userPassword: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, encrypted);
}