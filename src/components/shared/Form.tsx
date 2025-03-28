// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import { Button, Dropdown, TextInput, Grid, Row, Column } from '@carbon/react';
// import { useRouter } from 'next/router';
// import { setFormData } from '@/app/redux/formSlice';
// import { RootState } from '@/app/redux/store';

// const validationSchema = Yup.object({
//   firstname: Yup.string().required('First Name is required'),
//   lastname: Yup.string().required('Last Name is required'),
//   city: Yup.string().required('City is required'),
//   gender: Yup.string().required('Gender is required'),
//   other: Yup.string().required('Other field is required'),
// });

// const MyForm = ({ isReadOnly }: { isReadOnly: boolean }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const formData = useSelector((state: RootState) => state.form);
//   const [selectedOption, setSelectedOption] = useState<string>(formData.city);

//   useEffect(() => {
//     if (isReadOnly) {
//       setSelectedOption(formData.city); // Prepopulate form if in read-only mode
//     }
//   }, [formData.city, isReadOnly]);

//   const handleDropdownChange = (
//     event: { selectedItem: { text: string } | null },
//     setFieldValue: (field: string, value: string) => void
//   ) => {
//     const selectedValue = event.selectedItem?.text || '';
//     setSelectedOption(selectedValue);
//     setFieldValue('city', selectedValue);
//   };

//   interface FormValues {
//     firstname: string;
//     lastname: string;
//     city: string;
//     gender: string;
//     other: string;
//   }
  
//   const handleSubmit = (values: FormValues) => {
//     dispatch(setFormData(values)); // Save data to Redux
//     router.push('/dashboard'); // Redirect to the dashboard
//   };

//   return (
//     <Grid fullWidth>
//       <Row>
//         <Column lg={8} md={10} sm={12}>
//           <Formik
//             initialValues={formData}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize // Allow reinitializing with formData
//           >
//             {({ setFieldValue }) => (
//               <Form>
//                 <div style={{ width: 300 }}>
//                   <Field
//                     name="firstname"
//                     placeholder="Enter First Name"
//                     component={TextInput}
//                     labelText="First Name"
//                     disabled={isReadOnly}
//                   />
//                 </div>

//                 <div style={{ width: 300 }}>
//                   <Field
//                     name="lastname"
//                     placeholder="Enter Last Name"
//                     component={TextInput}
//                     labelText="Last Name"
//                     disabled={isReadOnly}
//                   />
//                 </div>

//                 <div style={{ width: 300 }}>
//                   <Dropdown
//                     id="city"
//                     label="Select City"
//                     titleText="City"
//                     disabled={isReadOnly}
//                     items={[{ text: 'Option 1' }, { text: 'Option 2' }]}
//                     selectedItem={{ text: selectedOption }}
//                     itemToString={(item) => item?.text || ''}
//                     onChange={(event) => handleDropdownChange(event, setFieldValue)}
//                   />
//                 </div>

//                 <div style={{ width: 300 }}>
//                   <Dropdown
//                     id="gender"
//                     label="Select Gender"
//                     titleText="Gender"
//                     disabled={isReadOnly}
//                     items={[{ text: 'Male' }, { text: 'Female' }]}
//                     itemToString={(item) => item?.text || ''}
//                     onChange={(event) => handleDropdownChange(event, setFieldValue)}
//                   />
//                 </div>

//                 <div style={{ width: 300 }}>
//                   <Field
//                     name="other"
//                     placeholder="Other"
//                     component={TextInput}
//                     labelText="Other"
//                     disabled={isReadOnly}
//                   />
//                 </div>

//                 {!isReadOnly && (
//                   <Button type="submit" kind="primary" size="md">
//                     Submit
//                   </Button>
//                 )}
//               </Form>
//             )}
//           </Formik>
//         </Column>
//       </Row>
//     </Grid>
//   );
// };

// export default MyForm;
