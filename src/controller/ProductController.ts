import { Request, Response } from 'express';

export default class ProductController {
  public getAllProducts(req: Request, res: Response): void {
    res.send('Get all products');
  }

  public getProductById(req: Request, res: Response): void {
    const productId = req.params.id;
    res.send(`Get product with ID ${productId}`);
  }

  public createProduct(req: Request, res: Response): void {
    const { body } = req;
    res.json({ message: 'Product created successfully', data: body });
  }
}
