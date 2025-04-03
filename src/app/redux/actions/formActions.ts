import { createAction } from "@reduxjs/toolkit";

export const setFormData = createAction<{
  input1: string;
  input2: string;
  dropdown1: string;
  dropdown2: string;
  submitted: boolean;
}>("form/setFormData");
