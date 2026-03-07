import { createContext, useContext, useState, type ReactNode, } from "react";
import Alert from "../component/AlertToast";

// Types for alert
type AlertType = "success" | "error" | "error_2" | "warring" | "info";

// Alert state type
interface AlertState {
  open: boolean;
  type: AlertType;
  message: string;
}

// Context type
interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
  closeAlert: () => void;
}

// Create context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// 🔹 Alert Provider Component
export const AlertProvider = ({ children }: { children: ReactNode }) => {

  // Alert state
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    type: "info",
    message: "",
  });

  // Function to show alert
  const showAlert = (message: string, type: AlertType) => {
    setAlertState({
      open: true,
      type,
      message,
    });
  };

  // Function to close alert
  const closeAlert = () => {
    setAlertState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // ✅ PLACE THE CODE HERE
  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      
      {/* Global Alert Component */}
      <Alert
        open={alertState.open}
        type={alertState.type}
        message={alertState.message}
        onClose={closeAlert}
      />

      {/* Render the rest of the app */}
      {children}

    </AlertContext.Provider>
  );
};

// Custom hook to use alert anywhere
export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used inside AlertProvider");
  }

  return context;
};