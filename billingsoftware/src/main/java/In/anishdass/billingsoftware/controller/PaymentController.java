package In.anishdass.billingsoftware.controller;

import In.anishdass.billingsoftware.io.OrderResponse;
import In.anishdass.billingsoftware.io.PaymentRequest;
import In.anishdass.billingsoftware.io.PaymentVerificationRequest;
import In.anishdass.billingsoftware.io.StripeOrderResponse;
import In.anishdass.billingsoftware.service.OrderService;
import In.anishdass.billingsoftware.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {
    private final StripeService stripeService;
    private final OrderService orderService;

    @PostMapping("/payments/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public StripeOrderResponse createStripeOrder(@RequestBody PaymentRequest request) throws StripeException {
        return stripeService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);

    }
}
