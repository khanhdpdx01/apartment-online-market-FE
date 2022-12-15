import http from "./index";
import axios from "axios";

class OrderService {
  fetchVnpayUrl(orderReference, returnUrl) {
    return http
      .post(`/order/${orderReference}?return_url=${returnUrl}`)
      .then((response) => {
        return response.data;
      });
  }

  fetchOrderReturn(path) {
    const params = path.split(/[?]/)[1];
    return axios
      .create({
        baseURL: "http://34.143.194.243:9090/api/",
        timeout: 1500,
        withCredentials: true,
      })
      .get(`/order/return?${params}`)
      .then((response) => {
        return response.data;
      });
  }

  createOrder(orders) {
    return http.post("/order", orders).then((response) => {
      return response.data;
    });
  }

  getOrderHistories(userId) {
    return http.get(`/order/histories/${userId}`).then((response) => {
      return response.data;
    });
  }

  getOrderDetail(orderId) {
    return http.get(`/order/details/${orderId}`).then((response) => {
      return response.data;
    });
  }

  getOrderHistoriesInStore(storeId) {
    return http.get(`/order/store/histories/${storeId}`).then((response) => {
      return response.data;
    });
  }

  getOrderDetailInStore(storeId, orderId) {
    return http
      .get(`/order/store/${storeId}/detail/${orderId}`)
      .then((response) => {
        return response.data;
      });
  }

  updateOrderInfo(orderId, data) {
    return http.put(`/order/info/${orderId}`, data).then((response) => {
      return response.data;
    });
  }
}

export default new OrderService();
