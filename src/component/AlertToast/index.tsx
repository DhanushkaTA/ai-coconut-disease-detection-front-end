import { DismissSquareFilled } from "@fluentui/react-icons";
import { useEffect } from "react";
// import { RiCloseCircleFill } from "react-icons/ri";

interface Props {
  open: boolean;
  onClose: () => void;
  type: "success" | "error" | "error_2" | "warring" | "info";
  message?: string;
}

function Alert({ open, onClose, type, message }: Props) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  const getImage = () => {
    switch (type) {
      case "success":
        return "/src/assets/images/alert/success-4.png";
      case "error":
        return "/src/assets/images/alert/error-1.png";
      case "error_2":
        return "/src/assets/images/alert/error-2.png";
      case "warring":
        return "/src/assets/images/alert/warring-1.png";
      case "info":
        return "/src/assets/images/alert/info-2.png";
      default:
        return "";
    }
  };

  return (
    <section
      className={`top-1 right-0 z-[100] bg-transparent transition-all fixed ${
        open ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <img src={getImage()} width={300} height={120} />

      <div
        className="text-white font-Poppins font-[500] absolute bottom-8 right-6 cursor-pointer"
        onClick={onClose}
      >
        <DismissSquareFilled className="hover:text-red-600!" fontSize={20} />
      </div>

      <label
        className={`w-[60%] h-[10px] absolute bottom-8 ${
          type !== "warring" ? "right-8" : "right-9"
        } font-Poppins text-[10px] font-[300] text-white`}
      >
        {message}
      </label>
    </section>
  );
}

export default Alert;
