import {configureStore } from "@reduxjs/toolkit";

import expenseReducer  from "./Expenses";
import authReducer  from "./Auth";
import themeReducer from './Theme'

const store = configureStore({
  reducer: { expense: expenseReducer, auth: authReducer, theme: themeReducer },
});

export default store;
