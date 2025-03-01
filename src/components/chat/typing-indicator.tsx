export function TypingIndicator() {
  return (
    <div className="flex items-center">
      <div className="from-secondary-light to-secondary mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br font-medium text-white shadow-sm">
        T
      </div>
      <div className="bg-card border-border/20 rounded-2xl rounded-tl-none border px-4 py-3 shadow-sm">
        <div className="flex space-x-1">
          <div
            className="bg-secondary-light h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="bg-secondary h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="bg-secondary-dark h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
