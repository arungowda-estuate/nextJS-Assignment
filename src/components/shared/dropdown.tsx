import React from 'react';
import { Dropdown } from '@carbon/react';

interface DropdownComponentProps {
  onChange: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onChange }) => {
  const items = [
    { id: 'option-1', text: 'Table 1' },
    { id: 'option-2', text: 'Table 2' },
    { id: 'option-3', text: 'Table 3' },
  ];

  return (
    <Dropdown
      id="dropdown"
      titleText="Dropdown"
      label="Select an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      onChange={({ selectedItem }) => {
        if (selectedItem) {
          onChange(selectedItem.text);
        }
      }}
    />
  );
};

export default DropdownComponent;
