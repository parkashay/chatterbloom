import { PropsWithChildren } from "react";

export function MessagesList({ children }: PropsWithChildren) {
  return (
    <div className="h-[calc(100vh-230px)] overflow-y-auto p-3">{children}</div>
  );
}
