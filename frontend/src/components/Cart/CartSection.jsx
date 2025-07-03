import React from "react";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>₹{item?.discountedPrice || 500}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartSection;
