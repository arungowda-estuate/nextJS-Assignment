import React from "react";
import { TextInput } from "@carbon/react";

interface InputWithBrowseProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helperText?: string;
  value?: string;
  labelText?: string;
  styleforInput?: string;
  disabled?: boolean;
}

const Input = ({
  onInputChange,
  styleforInput,
  placeholder,
  helperText,
  disabled,
  value,
  labelText,
}: InputWithBrowseProps) => {
  return (
    <div className={styleforInput}>
      <TextInput
        helperText={helperText}
        id="text-input-1"
        invalidText="Error message goes here"
        labelText={labelText}
        onChange={onInputChange}
        placeholder={placeholder}
        size="md"
        type="text"
        value={value}
        disabled={disabled}
        warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
      />
    </div>
  );
};

export default Input;

