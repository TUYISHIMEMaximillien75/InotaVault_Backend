import type { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.services.ts";

export class UserController {

    async registerUser(req: Request, res: Response) {

        // console.log("It's your boy controller")
        try {

            const user = await createUser(req.body);

            res.status(201).json({ success: true, data: user });

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }

    }

    async loginUser(req: Request, res: Response) {

        try {

            const user = await loginUser(req.body)

            res.status(200).json({ success: true, data: user });


        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }

    }

}