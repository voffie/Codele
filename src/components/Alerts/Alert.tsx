import { Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { Fragment } from "react";

type AlertProps = {
  isOpen: boolean;
  message: string;
  variant?: "success" | "error";
  topMost?: boolean;
};

export const Alert = ({ isOpen, message, variant, topMost }: AlertProps) => {
  const classes = twMerge(
    "fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",
    variant === "error" ? "bg-rose-500 text-white" : "",
    variant === "success" ? "bg-green-500 text-white" : "",
  );

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-2">
          <p className="text-center text-sm font-medium">{message}</p>
        </div>
      </div>
    </Transition>
  );
};
