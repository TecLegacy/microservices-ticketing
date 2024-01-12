//Crypt User Password
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hashedPass = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${hashedPass.toString('hex')}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split('.');

    const hashedPass = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;

    return hashedPassword === hashedPass.toString('hex');
  }
}
