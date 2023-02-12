import {Router} from "express";
import {CreateUserController} from "./controllers/user/CreateUserController";

const router = Router();

/**
 **** Rotas de Users
 */
router.post("/users", new CreateUserController().handle)

export {router};