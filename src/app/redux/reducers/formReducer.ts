import { createReducer } from "@reduxjs/toolkit";
import { setFormData } from "../actions/formActions";

interface FormState {
  input1: string;
  input2: string;
  dropdown1: string;
  dropdown2: string;
  submitted: boolean;
}

const initialState: FormState = {
  input1: "",
  input2: "",
  dropdown1: "",
  dropdown2: "",
  submitted: false,
};

const formReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFormData, (state, action) => {
    state.input1 = action.payload.input1;
    state.input2 = action.payload.input2;
    state.dropdown1 = action.payload.dropdown1;
    state.dropdown2 = action.payload.dropdown2;
    state.submitted = action.payload.submitted;
  });
});

export default formReducer;
