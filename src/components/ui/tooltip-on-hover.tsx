import { PropsWithChildren, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface Props {
  content: ReactNode;
  className?: string;
  shouldOpen?: boolean;
}
export function ToolTipOnHover({
  children,
  content,
  className = "cursor-pointer",
  shouldOpen = true,
}: PropsWithChildren<Props>) {
  if (!shouldOpen) return <>{children}</>;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className}>{children}</TooltipTrigger>
        <TooltipContent side="right">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
