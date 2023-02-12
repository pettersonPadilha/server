import prismaClient from "../../prisma/index";
import {compare} from "bcrypt";

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

        


 

        return {ok:true}
    }
}

export {AuthUserService}