import React from "react";
import styles from "./styles/SevaCard.module.css";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/Cart/cartSlice";

const SevaCard = ({ seva }) => {
  const { media, title, description, tags, marketPrice, discountedPrice } =
    seva;
  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addToCart(item));
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={`tag-${index}`}>{tag}</span>
            ))}
          </div>
          <div className={styles.prices}>
            <div className={styles.old}>{"Rs " + marketPrice}</div>
            <div className={styles.new}>{"Rs " + (discountedPrice || 500)}</div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => addItem(seva)}>Add to cart</button>
          <button onClick={() => removeItem(seva)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default SevaCard;
