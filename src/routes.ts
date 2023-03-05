import {Router} from "express";
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailUserController} from "./controllers/user/DetailUserController";
import {isAuthenticated} from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

/**
 **** Rotas de Users
 */
router.post("/users",   new CreateUserController().handle)
router.post("/session", new  AuthUserController().handle )
router.get("/me",      isAuthenticated, new DetailUserController().handle)

/* 
*** Rota de Category
**/

router.post("/category",isAuthenticated, new CreateCategoryController().handle)
router.get("/categoryall", isAuthenticated, new ListCategoryController().handle)

export {router};