"use client";

import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import CopyIcon from "./icons/copy-icon";

interface CopyButtonProps {
  title?: string;
  value: string;
  text?: string;
  className?: string;
}

export default function CopyButton({
  title,
  value,
  text,
  className,
}: CopyButtonProps) {
  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success(text, {
      hideProgressBar: false,
      closeButton: false,
    });
  };

  return (
    <button title={title} onClick={() => copy(value)}>
      <CopyIcon
        className={cn(
          "size-4 transition-colors hover:text-gray-400",
          className
        )}
      />
    </button>
  );
}
