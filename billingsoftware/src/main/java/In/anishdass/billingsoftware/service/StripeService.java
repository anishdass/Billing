package In.anishdass.billingsoftware.service;

import In.anishdass.billingsoftware.io.StripeOrderResponse;
import com.stripe.exception.StripeException;

public interface StripeService {
    StripeOrderResponse createOrder(Double amount, String currency) throws StripeException;
}