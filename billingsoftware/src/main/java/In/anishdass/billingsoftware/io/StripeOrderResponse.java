package In.anishdass.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StripeOrderResponse {
    private String id;
    private String clientSecret;
    private String entity;
    private Integer amount;
    private String currency;
    private String status;
    private Date createdAt;
    private String receipt;

    public StripeOrderResponse(String secretKey, String publishableKey) {

    }
}
