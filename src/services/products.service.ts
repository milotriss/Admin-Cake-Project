import ProductRepository from "../repositories/product.repositories";
import { IProduct } from "../types/interface";

class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async getAllProducts():Promise<IProduct[]> {
    const result = await this.productRepository.getAllProducts();
    return result;
  }
  public async getProductsCategory(value: string) {
    const result = await this.productRepository.getAllProducts();
    const productsCategory = result.filter(
      (item: IProduct) => item.category === value && item.isDelete === true
    );
    return productsCategory;
  }
}
export default ProductService;
