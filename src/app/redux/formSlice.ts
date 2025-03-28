
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FormState {
//   firstname: string;
//   lastname: string;
//   city: string;
//   gender: string;
//   other: string;
// }

// const initialState: FormState = {
//   firstname: '',
//   lastname: '',
//   city: '',
//   gender: '',
//   other: '',
// };

// const formSlice = createSlice({
//   name: 'form',
//   initialState,
//   reducers: {
//     setFormData: (state, action: PayloadAction<FormState>) => {
//       state.firstname = action.payload.firstname;
//       state.lastname = action.payload.lastname;
//       state.city = action.payload.city;
//       state.gender = action.payload.gender;
//       state.other = action.payload.other;
//     },
//     resetFormData: () => initialState,
//   },
// });

// export const { setFormData, resetFormData } = formSlice.actions;
// export const formReducer = formSlice.reducer;
