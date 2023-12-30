import ApiService from "../api/api.service";

class ProductRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllProducts(): Promise<any> {
    const result:any = await this.apiService.GetAll("products");
    return result.data
  }
}


export default ProductRepository;
