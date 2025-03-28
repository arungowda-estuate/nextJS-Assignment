import React from 'react';
import { TextInput, Button } from '@carbon/react';

interface InputWithBrowseProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

const InputWithBrowse: React.FC<InputWithBrowseProps> = ({
  onInputChange,
  onButtonClick,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextInput
        id="input-field"
        labelText="Input Field"
        placeholder="Enter text"
        style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onChange={onInputChange}
      />
      <Button
        kind="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '100%',
        }}
        onClick={onButtonClick}
      >
        Browse
      </Button>
    </div>
  );
};

export default InputWithBrowse;
