import React, { useState } from "react";
import styles from "./styles/PaymentModal.module.css";
import {
  cardFields,
  paymentMethods,
} from "../constant/Payment/static-data-payment";

const PaymentModal = ({ onClose, onSuccess }) => {
  const [method, setMethod] = useState("Card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");

  const isCardValid =
    /^\d{16}$/.test(card.number) &&
    /^\d{2}\/\d{2}$/.test(card.expiry) &&
    /^\d{3}$/.test(card.cvv);

  const isUpiValid = /^[\w.-]+@[\w]+$/.test(upi);

  const isFormValid = method === "card" ? isCardValid : isUpiValid;

  const handlePay = () => {
    if (isFormValid) {
      onSuccess({
        paymentId: `PAY-${Date.now()}`,
        method,
      });
      onClose();
    } else {
      alert("Please enter valid payment details");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Payment</h2>

        <div className={styles.tabs}>
          {paymentMethods.map((item) => (
            <button
              key={item.title}
              onClick={() => setMethod(item.title)}
              className={`${styles.button} ${
                method === item.title ? styles.active : ""
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {method === "Card" ? (
          <div>
            {cardFields.slice(0, 1).map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={card[field.name]}
                onChange={(e) =>
                  setCard({ ...card, [field.name]: e.target.value })
                }
                className={styles.input}
              />
            ))}

            <div className={styles.inlineInputs}>
              {cardFields.slice(1).map((field) => (
                <input
                  key={field.name}
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={card[field.name]}
                  onChange={(e) =>
                    setCard({ ...card, [field.name]: e.target.value })
                  }
                  className={field.className}
                />
              ))}
            </div>
          </div>
        ) : (
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            className={styles.input}
          />
        )}

        <button
          onClick={handlePay}
          className={styles.payButton}
          disabled={!isFormValid}
        >
          Pay
        </button>

        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
