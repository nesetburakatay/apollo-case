import express, { Router } from 'express';
import ProductController from '../src/controller/ProductController';
import TokenAuthenticatorMiddleware from '../helpers/jwtMiddleware/TokenAuthenticatorMiddleware';

const router: Router = express.Router();
const productController: ProductController = new ProductController();

router.get('/',new TokenAuthenticatorMiddleware().validateToken(["custom","admin","user"]), productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/create', productController.createProduct);

export default router;
