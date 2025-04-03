import { Dropdown } from "@carbon/react";

interface DropdownComponentProps {
  helperText?: string;
  invalidText?: string;
  warnText?: string;

  labelText: string;
  titleText: string;
  items: { text: string }[];
  selectedItem: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

const DropdownComponent = ({
  helperText,
  invalidText,
  warnText,

  labelText,
  titleText,
  items,
  selectedItem,
  onChange,
  disabled,
}: DropdownComponentProps) => {
  const selected = items.find((item) => item.text === selectedItem) || null;

  return (
    <Dropdown
      helperText={helperText}
      id="default"
      invalidText={invalidText}
      itemToString={(item) => (item ? item.text : "")}
      items={items}
      label={labelText}
      titleText={titleText}
      warnText={warnText}
      disabled={disabled}
      selectedItem={selected}
      onChange={({ selectedItem }) => {
        if (selectedItem) {
          onChange(selectedItem.text);
        }
      }}
    />
  );
};

export default DropdownComponent;
