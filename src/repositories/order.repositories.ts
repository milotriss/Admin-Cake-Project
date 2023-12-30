import ApiService from "../api/api.service"



class OrderRepository {
    private apiService: ApiService
    constructor(){
        this.apiService = new ApiService()
    }
    async getAllOrder(): Promise<any> {
        const result = await this.apiService.GetAll("orders")
        return result
    }
}
export default OrderRepository