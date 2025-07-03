import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/Checkout.module.css";
import { useState } from "react";
import UserDetailsForm from "./UserDetailsForm";
import AddressDetailsForm from "./AddressDetailsForm";
import { clearCart } from "../../store/Cart/cartSlice";
import axios from "axios";
import PaymentModal from "./PaymentModal";
import { toast } from "sonner";

const CheckoutSection = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const handlePaymentSuccess = async ({ paymentId, method }) => {
    try {
      const amount = cartItems.reduce(
        (total, item) => total + item.discountedPrice * (item.quantity || 1),
        0
      );

      const res = await axios.post("/api/orders", {
        user,
        address,
        items: cartItems,
        paymentId,
        orderId: `ORDER-${Date.now()}`,
        amountToPay: amount,
      });

      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Order failed. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <div className={styles.orderPlaced}>
        <h2>🎉 Your order has been placed!</h2>
        <p>Thank you for booking your Seva with us.</p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      {/* Left Column */}
      <div className={styles.left}>
        <h2>Your Items</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <h4>{item.title}</h4>
              <p>₹{item.discountedPrice || 500}</p>
            </div>
          ))
        )}
      </div>

      {/* Right Column */}
      <div className={styles.right}>
        <div className={styles.innerContainer}>
          <h3>User Details</h3>
          <UserDetailsForm onVerified={setUser} />
        </div>

        <div className={styles.innerContainer}>
          <h3>Address Details</h3>
          <AddressDetailsForm onVerified={setAddress} />
        </div>

        <button
          disabled={!(user && address && cartItems.length)}
          onClick={() => setPaymentModal(true)}
        >
          Pay Now
        </button>
      </div>

      {/* Payment Modal */}
      {paymentModal && (
        <PaymentModal
          onClose={() => setPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default CheckoutSection;
