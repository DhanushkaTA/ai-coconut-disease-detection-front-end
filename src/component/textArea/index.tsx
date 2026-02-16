import * as React from "react";
import { Field, Textarea } from "@fluentui/react-components";

interface Props {
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validate?: boolean;
  message?: string;
  borderRequired?: boolean;
  callBack: Function;
}

const CustomTextarea: React.FC<Props> = ({
  id,
  value,
  label,
  placeholder,
  required = false,
  validate = true,
  message,
  borderRequired = true,
  callBack,
}) => {
  return (
    <div className="flex flex-col w-full font-[Poppins] mb-3">
      {label && (
        <label
          htmlFor={id}
          className={`text-[12px] font-medium ${
            validate ? "text-[#2e2e2e]" : "text-[#F03947]"
          }`}
        >
          {label} {required && <span className="text-red-700">*</span>}
        </label>
      )}

      <Textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => callBack(e, id)}
        className={`
          mt-2 text-[14px] rounded-md
          ${borderRequired ? "border" : ""}
          ${
            !validate
              ? "border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }
        `}
        resize="vertical"
      />

      {!validate && message && (
        <span className="text-[10px] mt-1 text-red-500">
          {message}
        </span>
      )}
    </div>
  );
};

export default CustomTextarea;
