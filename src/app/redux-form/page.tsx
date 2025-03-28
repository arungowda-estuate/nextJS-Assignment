"use client";
// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { Button, Dropdown, Grid, Row, Column, TextInput } from "@carbon/react";

// // Validation schema using Yup
// const validationSchema = Yup.object({
//   firstname: Yup.string().required("First Name is required"),
//   lastname: Yup.string().required("Last Name is required"),
//   city: Yup.string().required("City is required"),
// });

// interface DropdownItemType {
//   text: string;
// }

// const MyForm = () => {
//   const [selectedOption, setSelectedOption] = useState<string>("");

//   // Handle the dropdown change event
//   const handleDropdownChange = (
//     event: { selectedItem: DropdownItemType | null },
//     setFieldValue: (
//       field: string,
//       value: string | number | boolean | null
//     ) => void
//   ) => {
//     const selectedValue = event.selectedItem?.text || ""; // Handle null case
//     setSelectedOption(selectedValue); // Update state for the label
//     setFieldValue("city", selectedValue); // Update the Formik field with the selected value
//   };

//   return (
//     <Grid fullWidth>
//       <Row>
//         <Column lg={8} md={10} sm={12}>
//           <div className="form-div">
//             <div className="headding">
//               <h1>Redux-Form</h1>
//             </div>
//             <Formik
//               initialValues={{
//                 firstname: "",
//                 lastname: "",
//                 city: "",
//               }}
//               validationSchema={validationSchema}
//               onSubmit={(values) => {
//                 alert("Form submitted: " + JSON.stringify(values, null, 2));
//               }}
//             >
//               {({ setFieldValue }) => (
//                 <Form>
//                   {/* First Name */}
//                   <div
//                     style={{
//                       width: 300,
//                     }}
//                   >
//                     <TextInput
//                       className="input-test-class"
//                       id="text-input-1"
//                       invalidText="Error message goes here"
//                       labelText="Frst Name"
//                       onChange={() => {}}
//                       onClick={() => {}}
//                       placeholder="Enter the First Name"
//                       size="md"
//                       type="text"
//                       warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
//                     />
//                   </div>

//                   <div
//                     style={{
//                       width: 300,
//                     }}
//                   >
//                     <TextInput
//                       className="input-test-class"
//                       id="text-input-1"
//                       invalidText="Error message goes here"
//                       labelText="Last Name"
//                       onChange={() => {}}
//                       onClick={() => {}}
//                       placeholder="Enter the Last Name"
//                       size="md"
//                       type="text"
//                       warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
//                     />
//                   </div>

//                   {/* City Dropdown */}
//                   <div
//                     style={{
//                       width: 300,
//                     }}
//                   >
//                     <Dropdown
//                       id="city"
//                       invalidText="Invalid selection"
//                       itemToString={(item) => (item ? item.text : "")}
//                       items={[{ text: "Option 1" }, { text: "Option 2" }]}
//                       label={selectedOption || "Select City"}
//                       titleText="Select City"
//                       type="default"
//                       warnText="Please notice the warning"
//                       onChange={(event) =>
//                         handleDropdownChange(event, setFieldValue)
//                       }
//                     />
//                   </div>

//                   {/* Gender Dropdown */}
//                   <div
//                     style={{
//                       width: 300,
//                     }}
//                   >
//                     <Dropdown
//                       id="gender"
//                       invalidText="Invalid selection"
//                       itemToString={(item) => (item ? item.text : "")}
//                       items={[{ text: "Male" }, { text: "Female" }]}
//                       label="Select Gender"
//                       titleText="Select Gender"
//                       type="default"
//                       warnText="Please notice the warning"
//                       onChange={(event) =>
//                         handleDropdownChange(event, setFieldValue)
//                       }
//                     />
//                   </div>

//                   {/* Other Field Input */}

//                   <div
//                     style={{
//                       width: 300,
//                     }}
//                   >
//                     <TextInput
//                       className="input-test-class"
//                       id="text-input-1"
//                       invalidText="Error message goes here"
//                       labelText="Frst Name"
//                       onChange={() => {}}
//                       onClick={() => {}}
//                       placeholder="Other"
//                       size="md"
//                       type="text"
//                       warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
//                     />
//                   </div>

//                   {/* Button */}
//                   <div className="input-button">
//                     <Button type="submit" size="md" kind="primary">
//                       Submit
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </Column>
//       </Row>
//     </Grid>
//   );
// };

// export default MyForm;


//////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { Button, Dropdown, TextInput, Grid, Row, Column } from "@carbon/react";

// import { useRouter } from "next/router";
// import { setFormData } from "../redux/formSlice";
// import { RootState } from "../redux/store";

// const validationSchema = Yup.object({
//   firstname: Yup.string().required("First Name is required"),
//   lastname: Yup.string().required("Last Name is required"),
//   city: Yup.string().required("City is required"),
//   gender: Yup.string().required("Gender is required"),
//   other: Yup.string().required("Other field is required"),
// });

// const MyForm = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const formData = useSelector((state: RootState) => state.form);
//   const [selectedOption, setSelectedOption] = useState<string>(formData.city);
//   const [isReadOnly, setIsReadOnly] = useState(false);

//   useEffect(() => {
//     // If data exists in Redux, set form to read-only
//     if (
//       formData.firstname ||
//       formData.lastname ||
//       formData.city ||
//       formData.gender ||
//       formData.other
//     ) {
//       setIsReadOnly(true);
//     }
//   }, [formData]);

//   const handleDropdownChange = (
//     event: { selectedItem: { text: string } | null },
//     setFieldValue: (field: string, value: string) => void
//   ) => {
//     const selectedValue = event.selectedItem?.text || "";
//     setSelectedOption(selectedValue);
//     setFieldValue("city", selectedValue);
//   };

//   interface FormValues {
//     firstname: string;
//     lastname: string;
//     city: string;
//     gender: string;
//     other: string;
//   }

//   const handleSubmit = (values: FormValues) => {
//     dispatch(setFormData(values)); // Save form data to Redux
//     router.push("/dashboard"); // Redirect to Dashboard
//   };

//   return (
//     <Grid fullWidth>
//       <Row>
//         <Column lg={8} md={10} sm={12}>
//           <Formik
//             initialValues={formData}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
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
//                     items={[{ text: "Option 1" }, { text: "Option 2" }]}
//                     selectedItem={{ text: selectedOption }}
//                     itemToString={(item) => item?.text || ""}
//                     onChange={(event) =>
//                       handleDropdownChange(event, setFieldValue)
//                     }
//                   />
//                 </div>

//                 <div style={{ width: 300 }}>
//                   <Dropdown
//                     id="gender"
//                     label="Select Gender"
//                     titleText="Gender"
//                     disabled={isReadOnly}
//                     items={[{ text: "Male" }, { text: "Female" }]}
//                     itemToString={(item) => item?.text || ""}
//                     onChange={(event) =>
//                       handleDropdownChange(event, setFieldValue)
//                     }
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
