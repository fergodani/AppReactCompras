// sharedStateContext.js
import React, { createContext, useReducer, useContext } from "react";

const CarritoContext = createContext();

const initialState = {
  // Tu estado inicial aquí...
  products: [],
  total: 0,
  numElements: 0,
};

const carritoReducer = (state, action) => {
  // Tu lógica de reducer aquí...
  switch (action.type) {
    case "ADD_PRODUCT":
      console.log(action.payload);
      const itemProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      state.total += action.payload.price * action.payload.quantity;
      state.numElements += action.payload.quantity;
      if (itemProduct) {
        itemProduct.quantity += action.payload.quantity;
        return {
          ...state,
          products: [...state.products],
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      }
    case "REMOVE_PRODUCT":
      state.products = state.products.filter(
        (item) => action.payload.id !== item.id
      );
      state.total -= action.payload.price * action.payload.quantity;
      state.numElements -= action.payload.quantity;
      return {
        ...state,
      };

    case "INCREASE":
      let product = state.products.find(
        (item) => action.payload.id === item.id
      );
      product.quantity += 1;
      state.total += product.price;
      state.numElements += 1;
      return {
        ...state,
      };

    case "DECREASE":
      let productD = state.products.find(
        (item) => action.payload.id === item.id
      );
      if (productD.quantity <= 1) {
        state.products = state.products.filter(
          (item) => action.payload.id !== item.id
        );
        state.total -= action.payload.price * action.payload.quantity;
        state.numElements -= action.payload.quantity;
        return {
          ...state,
        };
      }
      productD.quantity -= 1;
      state.total -= productD.price;
      state.numElements -= 1;
      return {
        ...state,
      };
      
    default:
      return state;
  }
};

const CarritoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product});
  };

  const removeProduct = (product) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: product });
  };
  const increase = (product) => {
    dispatch({ type: "INCREASE", payload: product });
  };

  const decrease = (product) => {
    dispatch({ type: "DECREASE", payload: product });
  };
  return (
    <CarritoContext.Provider
      value={{
        state,
        addProduct,
        removeProduct,
        increase,
        decrease,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

const useCarrito = () => {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error(
      "useSharedState debe ser utilizado dentro de SharedStateProvider"
    );
  }
  return context;
};

export { CarritoProvider, useCarrito };
