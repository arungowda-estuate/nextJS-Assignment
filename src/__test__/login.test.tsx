import Home from "@/app/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";



jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Component", () => {
  it("should render the form elements correctly", () => {
    render(<Home />);

    // Check that the username and password fields are present
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Check that the submit button is present
    expect(screen.getByText("Login")).toBeInTheDocument();
  });


  it("should show error messages when fields are empty and the form is submitted", async () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Login")); // Submit the form

    // Wait for validation error messages to appear
    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });


  it("should show password error when password is too short", async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Password must contain at least 6 characters")).toBeInTheDocument();
    });
  });

});
