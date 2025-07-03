import "./CartSummary.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { createOrder, deleteOrder } from "../../../service/OrderService";
import toast from "react-hot-toast";
import {
  createStripeOrder,
  verifyPayment,
} from "../../../service/PaymentService";
import { AppConstants } from "../../../util/constants";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems, clearCart } = useContext(AppContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.01;

  const grandTotal = totalAmount + tax;

  const placeOrder = () => {
    setShowPopUp(true);
    clearAll();
  };

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadStripeScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";

      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Stripe failed to load"));

      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong");
    }
  };

  const verifyPaymentHandler = async (response, orderDetails) => {
    const paymentData = {
      stripeOrderId: response.stripe_order_id,
      stripePaymentId: response.stripe_payment_id,
      stripesignature: response.stripe_signature,
      orderId: orderDetails.orderId,
    };
    try {
      const response = verifyPayment(paymentData);
      if (response.status == 200) {
        toast.success("Payment Successful");
        setOrderDetails({
          ...orderDetails,
          paymentData: {
            stripeOrderId: response.stripe_order_id,
            stripePaymentId: response.stripe_payment_id,
            stripesignature: response.stripe_signature,
            orderId: orderDetails.orderId,
          },
        });
      } else {
        toast.error("Payment Processing failed");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Unable to verify payment");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Incomplete Details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subTotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);

    try {
      const response = await createOrder(orderData);
      const orderDetails = response.data;
      if (response.status === 201 && paymentMode === "cash") {
        toast.error("Cash Received");
        setOrderDetails(orderDetails);
      } else if (response.status === 201 && paymentMode === "upi") {
        // Load Stripe.js script
        const stripeScriptLoaded = await loadStripeScript();
        if (!stripeScriptLoaded) {
          toast.error("Failed to load Stripe script");
          setIsProcessing(false);
          return;
        }

        // Create Stripe order on backend
        const stripeOrderResponse = await createStripeOrder({
          amount: grandTotal,
          currency: "INR",
        });

        console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

        // const stripe = window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

        // // Confirm card payment with Stripe (using client secret)
        // const { error, paymentIntent } = await stripe.confirmCardPayment(
        //   stripeOrderResponse.data.clientSecret,
        //   {
        //     payment_method: {},
        //   }
        // );

        // console.log(paymentIntent);

        //   if (error) {
        //     toast.error(error.message || "Payment failed");
        //     // Delete the order from backend to avoid stale orders
        //     await deleteOrderOnFailure(orderDetails.orderId);
        //   } else if (paymentIntent && paymentIntent.status === "succeeded") {
        //     toast.success("Payment Successful");

        //     // Verify payment in backend
        //     await verifyPaymentHandler(
        //       {
        //         stripe_order_id: paymentIntent.id,
        //         stripe_payment_id: paymentIntent.payment_method,
        //         stripe_signature: paymentIntent.client_secret, // or other relevant signature
        //       },
        //       orderDetails
        //     );

        //     setOrderDetails(orderDetails);
        //   }
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='mt-2'>
      <div className='cart-summary-details'>
        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Item Price: </span>
          <span className='text-light'>&pound;{totalAmount.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Tax (1%)</span>
          <span className='text-light'>&pound;{tax.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Total: </span>
          <span className='text-light'>&pound;{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className='d-flex gap-3 mb-2'>
        <button
          className='btn btn-success btn-sm flex-grow-1'
          onClick={() => completePayment("cash")}
          disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          className='btn btn-primary btn-sm flex-grow-1'
          onClick={() => completePayment("upi")}
          disabled={isProcessing}>
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>
      <div className='d-flex gap-3'>
        <button
          className='btn btn-warning btn-sm flex-grow-1'
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
