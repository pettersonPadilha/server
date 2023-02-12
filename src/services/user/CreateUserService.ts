
import prismaClient from "../../prisma/index";
import {hash} from "bcrypt";

interface UserRequest {
    name : string;
    email : string;
    password : string;
}

class CreateUserService {
    async execute({name,email,password}:UserRequest) {
        // Verificar se ele enviou um E-mail
        if(!email) {
            throw new Error("Email incorrect");
        }

        //Verificar se esse E-mail já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name:name,
                email:email,
                password: passwordHash
            },
            select: {
                id: true,
                name:true,
                email: true
             
            }
            
        })

        return user
    }
}

export {CreateUserService}