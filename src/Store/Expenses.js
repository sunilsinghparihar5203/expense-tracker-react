import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expences:{},
  isActivePremium :false,
  totalExpense : 0,
};

const expenseSlice = createSlice({
  name: "Expense",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      console.log({addItemPayLoad:action})
      state.expences = {...action.payload};
    },
    // deleteExpense(state, action) {
    //   const updatedExpenses = Object.fromEntries(
    //     Object.entries(state.expences).filter(([key, value]) => key !== action.payload)
    //   );
    //   state.expences = updatedExpenses;
    // },
    
    activePremium(state,action){
      state.isActivePremium = state.totalExpense > 10000 ? true :false
      console.log({isActivePremium : state.isActivePremium})
    },

    totalExpense(state,action){
      let totalPrice = 0;
      for (const id in action.payload) {
        totalPrice += parseInt(action.payload[id].Price);
      }
      state.totalExpense = totalPrice
      console.log({totalExpense : state.totalExpense})
    }
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
