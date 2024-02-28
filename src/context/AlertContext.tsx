import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type AlertStatus = "success" | "error" | undefined;

type ShowOptions = {
  persist?: boolean;
  delayMs?: number;
  durationMs?: number;
  onClose?: () => void;
};

type AlertContextValue = {
  status: AlertStatus;
  message: string | null;
  isVisible: boolean;
  showSuccess: (message: string, options?: ShowOptions) => void;
  showError: (message: string, options?: ShowOptions) => void;
};

export const AlertContext = createContext<AlertContextValue | null>({
  status: "success",
  message: null,
  isVisible: false,
  showSuccess: () => null,
  showError: () => null,
});
AlertContext.displayName = "AlertContext";

export const useAlert = () => useContext(AlertContext) as AlertContextValue;

type AlertProps = {
  children?: ReactNode;
};

export const AlertProvider = ({ children }: AlertProps) => {
  const [status, setStatus] = useState<AlertStatus>("success");
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(
    (showStatus: AlertStatus, newMessage: string, options?: ShowOptions) => {
      const {
        delayMs = 0,
        persist,
        onClose,
        durationMs = 2000,
      } = options || {};

      setTimeout(() => {
        setStatus(showStatus);
        setMessage(newMessage);
        setIsVisible(true);

        if (!persist) {
          setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
              onClose();
            }
          }, durationMs);
        }
      }, delayMs);
    },
    [setStatus, setMessage, setIsVisible],
  );

  const showError = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      show("error", newMessage, options);
    },
    [show],
  );

  const showSuccess = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      show("success", newMessage, options);
    },
    [show],
  );

  return (
    <AlertContext.Provider
      value={{ status, message, isVisible, showError, showSuccess }}
    >
      {children}
    </AlertContext.Provider>
  );
};
