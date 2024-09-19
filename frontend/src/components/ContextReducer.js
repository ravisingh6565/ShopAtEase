import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const ShopIdStateContext = createContext();
const ShopIdDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty }];
            case "REMOVE":
            return "";
        default:
            console.log("Error in Reducer");
    }
}
const shopIdReducer = (state, action) => {
    switch (action.type) {
        case "SELECT":
            return action.id;
        default:
            console.log("Error in Reducer");
    }
}

export const CardProvider = ({ children }) => {
    let initailState='';
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart",'');
        initailState= localStorage.getItem("cart");
    }else
    {
        console.log(localStorage.getItem("cart"))
        localStorage.setItem("cart", localStorage.getItem("cart"));
        initailState= JSON.parse(localStorage.getItem("cart"));
    }
    const [state, dispatch] = useReducer(reducer, initailState);
    const [ShopIdState, shopIdDispatch] = useReducer(shopIdReducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                <ShopIdDispatchContext.Provider value={shopIdDispatch}>
                    <ShopIdStateContext.Provider value={ShopIdState}>
                        {children}
                    </ShopIdStateContext.Provider>
                </ShopIdDispatchContext.Provider>
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
export const useShopId = () => useContext(ShopIdStateContext);
export const useShopIdDispatch = () => useContext(ShopIdDispatchContext);