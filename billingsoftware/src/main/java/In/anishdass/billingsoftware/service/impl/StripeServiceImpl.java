package In.anishdass.billingsoftware.service.impl;

import In.anishdass.billingsoftware.io.StripeOrderResponse;
import In.anishdass.billingsoftware.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.secret.key}")
    private String secretKey;

    @Override
    public StripeOrderResponse createOrder(Double amount, String currency) throws StripeException {
        Stripe.apiKey = secretKey;

        long amountInCents = Math.round(amount * 100);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .addPaymentMethodType("card")
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        return convertToStripeResponse(intent);
    }

    private StripeOrderResponse convertToStripeResponse(PaymentIntent intent) {
        return StripeOrderResponse.builder()
                .id(intent.getId())
                .clientSecret(intent.getClientSecret())
                .entity("payment_intent")
                .amount(intent.getAmount().intValue())
                .currency(intent.getCurrency())
                .status(intent.getStatus())
                .createdAt(new Date(intent.getCreated() * 1000L))
                .receipt(intent.getReceiptEmail() != null ? intent.getReceiptEmail() : "N/A")
                .build();
    }


}
