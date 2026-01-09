import User from "../database/models/user.model.ts";
import { hashPassword, comparePassword, } from "../utils/password.ts";
import { generateToken } from "../utils/jwt.ts";
import { sendEmail } from "../utils/sendEmail.ts";



interface CreateUserInput {
    full_name: string;
    email: string;
    password: string;
}

interface LoginUserInput {
    email: string;
    password: string;
}

export const createUser = async (data: CreateUserInput) => {
    const hashedPassword = await hashPassword(data.password)
    const user = await User.create({
        full_name: data.full_name,
        email: data.email,
        password: hashedPassword,
    })

    const email =  await sendEmail(data.email, user.id);
    console.log("result from email is ", email);

    // const token = generateToken({
    //     id: user.id,
    //     email: user.email,
    //     role: user.role,
    // })

    return "user created successfully please verify your email"; //{ user, token };
}


export const loginUser = async (data: LoginUserInput) => {
    const user = await User.findOne({
        where: {
            email: data.email,
        }
    })

    if (!user) {
        throw new Error("Invalid email or password")
    }

    const isMatch = await comparePassword(data.password, user.password)

    if (!isMatch) {
        throw new Error("Invalid email or password")
    }

    const token = await generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    })

    return { user, token };
}

export const verifyUser = async (userId: string) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.verified = true;
    await user.save();
    console.log("user is verified with id ", userId);
    return user;
}