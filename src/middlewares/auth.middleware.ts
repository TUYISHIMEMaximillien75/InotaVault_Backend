import type {Request, Response, NextFunction} from "express";
import { verifyToken } from "../utils/jwt.ts";

export interface AuthRequest extends Request{
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction)=>{
    const AuthHeaders = req.headers.authorization;

    if(!AuthHeaders || !AuthHeaders.startsWith("Bearer ")){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = AuthHeaders.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next()
    } catch  {
        return res.status(401).json({ message: "Invalid token" });
    }

}