package In.anishdass.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerificationRequest {
    private String stripeOrderId;
    private String stripePaymentId;
    private String stripeSignature;
    private String orderId;
}
