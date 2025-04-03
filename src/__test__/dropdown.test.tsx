import DropdownComponent from "@/components/shared/dropdown";
import { render, screen } from "@testing-library/react";

test("dropdown is disabled when disabled prop is true", () => {
  const items = [{ text: "Option 1" }, { text: "Option 2" }];
  const selectedItem = "Option 1";
  const mockChangeHandler = jest.fn();

  render(
    <DropdownComponent
      labelText="Select an Option"
      titleText="Dropdown Title"
      items={items}
      selectedItem={selectedItem}
      onChange={mockChangeHandler}
      disabled={true}
    />
  );

  const dropdown = screen.getByRole("combobox");
  expect(dropdown).toBeDisabled();
});

test("displays selected item correctly based on selectedItem prop", () => {
  const items = [{ text: "Option 1" }, { text: "Option 2" }];
  const selectedItem = "Option 2";
  const mockChangeHandler = jest.fn();

  render(
    <DropdownComponent
      labelText="Select an Option"
      titleText="Dropdown Title"
      items={items}
      selectedItem={selectedItem}
      onChange={mockChangeHandler}
      disabled={false}
    />
  );

  const selectedOption = screen.getByText("Option 2");
  expect(selectedOption).toBeInTheDocument();
});
