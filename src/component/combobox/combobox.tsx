import * as React from "react";
import {
  Combobox,
  Option,
  Field,
  useId,
  type ComboboxProps,
} from "@fluentui/react-components";

/* ---------- Types ---------- */
export interface ComboBoxOption {
  key: string;
  text: string;
}

interface CustomComboBoxProps {
  label?: string;
  options: ComboBoxOption[];
  selectedKey?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  validationMessage?: string;
  onChange: (value?: string) => void;
  onSearch?: (value?: string) => void;
}

/* ---------- Component ---------- */
export const CustomComboBox: React.FC<CustomComboBoxProps> = ({
  label,
  options,
  selectedKey,
  placeholder,
  disabled = false,
  required = false,
  validationMessage,
  onChange,
  onSearch,
}) => {
  const comboId = useId();
  const [searchText, setSearchText] = React.useState("");

  const selectedText = React.useMemo(() => {
    const selectedOption = options.find((opt) => opt.key === selectedKey);
    return selectedOption ? selectedOption.text : "";
  }, [selectedKey, options]);

  /* Filter options */
  const filteredOptions = React.useMemo(() => {
    if (!searchText) return options;

    return options.filter((opt) =>
      opt.text.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, options]);

  /* Handle select */
  const handleOptionSelect: ComboboxProps["onOptionSelect"] = (_, data) => {
    onChange(data.optionValue);
    setSearchText("");
  };

  return (
    <Field
      // label={label}
      required={required}
      validationMessage={validationMessage}
    >
      <label
        htmlFor={comboId}
        className={`w-full text-[12px] font-medium 
              
            }`}
      >
        {/* ${props.validate ? "text-[#2e2e2e]]" : "text-[#F03947]" */}
        {label} {required ? <span className="text-red-700">*</span> : null}
      </label>

      <Combobox
        id={comboId}
        placeholder={placeholder}
        selectedOptions={selectedKey ? [selectedKey] : []}
        disabled={disabled}
        required={required}
        value={searchText || selectedText}
        onInput={(e) => {
          setSearchText((e.target as HTMLInputElement).value);
          onSearch?.((e.target as HTMLInputElement).value);
        }}
        onOptionSelect={handleOptionSelect}
        className="text-[12px]! border! border-[#aaa]! h-[40px]! rounded! px-[15px]! mt-[8px]!"
      >
        {filteredOptions.map((opt) => (
          <Option key={opt.key} value={opt.key} className="bg-white! h-10!">
            {opt.text}
          </Option>
        ))}
      </Combobox>
    </Field>
  );
};
