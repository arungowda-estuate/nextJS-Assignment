import { render, screen, fireEvent, act } from "@testing-library/react";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/redux/store";
import { setFormData } from "@/app/redux/actions/formActions";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

test("setFormData should be dispatched with correct data on form submit", async () => {
  const dispatch = jest.fn();
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

  render(
    <Provider store={store}>
      <Form />
    </Provider>
  );

  const input1 = screen.getByPlaceholderText(
    "Enter something..."
  ) as HTMLInputElement;
  const input2 = screen.getAllByPlaceholderText(
    "Enter something..."
  )[1] as HTMLInputElement;
  const dropdown1 = screen.getByLabelText(
    "Select Options"
  ) as HTMLSelectElement;
  const dropdown2 = screen.getAllByLabelText(
    "Select Options"
  )[1] as HTMLSelectElement;
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(input1, { target: { value: "Test Input 1" } });
  fireEvent.change(input2, { target: { value: "Test Input 2" } });
  fireEvent.change(dropdown1, { target: { value: "Table 3" } });
  fireEvent.change(dropdown2, { target: { value: "Table 4" } });

  act(() => {
    fireEvent.click(submitButton);
  });

  expect(dispatch).toHaveBeenCalledWith(
    setFormData({
      input1: "Test Input 1",
      input2: "Test Input 2",
      dropdown1: "Table 3",
      dropdown2: "Table 4",
      submitted: true,
    })
  );
});

test("form should redirect to /dashboard on submit", () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });

  render(
    <Provider store={store}>
      <Form />
    </Provider>
  );

  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.click(submitButton);

  expect(push).toHaveBeenCalledWith("/dashboard");
});
