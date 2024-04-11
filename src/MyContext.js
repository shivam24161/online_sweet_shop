import React, { useState, createContext } from "react";
export const UserContext = createContext();
const MyContext = (props) => {
  const [cartItems, setCartitems] = useState([]);
  const [coupon, setCoupon] = useState("ENJOY50");
  const [total, settotal] = useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <UserContext.Provider
      value={{
        cartItems,
        setCartitems,
        coupon,
        setCoupon,
        total,
        settotal,
        open,
        setOpen,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default MyContext;
