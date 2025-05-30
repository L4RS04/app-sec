import jwt, { Algorithm } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '../model/user/role';

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_HOURS ? parseInt(process.env.JWT_EXPIRES_HOURS) * 3600 : 3600; // Default to 1 hour if not defined

if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

const generateJwtToken = (id: number, name: string, role: Role): string => {
    const options = { 
        expiresIn,
        issuer: "BingeVault",
        algorithm: 'HS256' as Algorithm
    };

    try {
        const token = jwt.sign({ id, name, role }, secretKey, options);
        return token;
    } catch (error) {
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export default generateJwtToken;