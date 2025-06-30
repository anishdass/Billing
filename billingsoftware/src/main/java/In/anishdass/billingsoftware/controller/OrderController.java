package In.anishdass.billingsoftware.controller;

import In.anishdass.billingsoftware.io.OrderRequest;
import In.anishdass.billingsoftware.io.OrderResponse;
import In.anishdass.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/admin/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }

    @DeleteMapping("/admin/orders/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder((orderId));
    }

    @GetMapping("/orders")
    public List<OrderResponse> getLatestOrders() {
        return orderService.getLatestOrders();
    }
}
