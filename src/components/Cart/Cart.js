import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSendOrder, setIsSendOrder] = useState(false);
  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartSubmitOrder = async (user) => {
    try {
      const response = await fetch(
        "https://sushi-5aab6-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user,
            orderItems: cartCtx.items,
            totalAmount,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong with an order sending.");
      }
      setIsSendOrder(true);
      cartCtx.resetItems();
    } catch  {
      setIsError(true);
      
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkoutShow = isCheckout ? (
    <Checkout onConfirm={cartSubmitOrder} onCancel={props.onClose} />
  ) : (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const CloseBtn = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </div>
  );
  let showModal = isSendOrder ? (
    <>
      <p>Your order has been send</p>
      {CloseBtn}
    </>
  ) : (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutShow}
    </>
  );
  if (isError) {
    showModal = (
      <>
      <p className={classes["err-msg"]}>
        Something went wrong with an order sending.
        <br /> Try per few minutes to send again
      </p>
      {CloseBtn}
      </>
    );
  }

  return <Modal onClose={props.onClose}>{showModal}</Modal>;
};

export default Cart;
