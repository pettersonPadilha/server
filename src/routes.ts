import {Router} from "express";
import multer from "multer";
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailUserController} from "./controllers/user/DetailUserController";
import {isAuthenticated} from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import uploadConfig  from "./config/multer"

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))


/**
 **** Rotas de Users
 */
router.post("/users",   new CreateUserController().handle)
router.post("/session", new  AuthUserController().handle )
router.get("/me",      isAuthenticated, new DetailUserController().handle)

/* 
**** Rota de Category
**/

router.post("/category",isAuthenticated, new CreateCategoryController().handle)
router.get("/categoryall", isAuthenticated, new ListCategoryController().handle)

/* 
**** Rota Product
*/
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.get("/category/product", isAuthenticated,new ListByCategoryController().handle)

/* 
**** Rota Order
*/

router.post("/order", isAuthenticated,new CreateOderController().handle );
router.delete("/order",isAuthenticated, new RemoveOrderController().handle);
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete("/order/remove",isAuthenticated, new RemoveItemController().handle);


export {router};