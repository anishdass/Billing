package In.anishdass.billingsoftware.service;

import In.anishdass.billingsoftware.io.OrderRequest;
import In.anishdass.billingsoftware.io.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();
}
