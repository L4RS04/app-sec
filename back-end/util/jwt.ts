import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '../model/role';


// Load environment variables from .env file
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_HOURS;

if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

const generateJwtToken = (name: string, role: Role): string => {
    const options = { expiresIn: `${expiresIn}h`, issuer: "BingeVault" };

    try {
        const token = jwt.sign({ name }, secretKey, options);
        return token;
    } catch (error) {
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export default generateJwtToken;