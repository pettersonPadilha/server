import prismaClient from "../../prisma/index";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken"

interface AuthRequest {
    email : string;
    password: string 
}

class AuthUserService {
    async execute({email, password}: AuthRequest) {
        //Verificar se o E-mail existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new Error("User/password incorrect!!")
        }

        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("User/password incorrect!!")
        }

        //Gerar o token para autenticar o usuario
        const token = sign({
            name:user.name,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            subject:user.id, 
            expiresIn: "30d"
        }
        )
        
        return {
            id:user.id,
            name:user.name,
            token:token

        }
    }
}

export {AuthUserService}