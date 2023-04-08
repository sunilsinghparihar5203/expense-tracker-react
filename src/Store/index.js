import {configureStore } from "@reduxjs/toolkit";

import expenseReducer  from "./Expenses";
import authReducer  from "./Auth";

const store = configureStore({
  reducer: { expense: expenseReducer, auth: authReducer },
});

export default store;
