import React from "react";
import { TextInput, Button } from "@carbon/react";

interface InputWithBrowseProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  placeholder?: string;
  isButtonVisible?: boolean;
  helperText?: string;
  labelText?: string;
  styleforInput?: string;
}

const InputWithBrowse = ({
  onInputChange,
  onButtonClick,
  styleforInput,
  placeholder,
  helperText,
  isButtonVisible,
  labelText,
}: InputWithBrowseProps) => {
  return (
    <div className={styleforInput}>
      <div>
        <TextInput
          helperText={helperText}
          id="text-input-1"
          invalidText="Error message goes here"
          labelText={labelText}
          onChange={onInputChange}
          onClick={() => {}}
          placeholder={placeholder}
          size="md"
          type="text"
          warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
        />
      </div>
      {isButtonVisible && <Button onClick={onButtonClick}>Browse</Button>}
    </div>
  );
};

export default InputWithBrowse;
