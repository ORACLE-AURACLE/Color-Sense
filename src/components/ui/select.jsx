import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({
  value,
  onValueChange,
  children,
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const selectRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const selectedChild = React.Children.toArray(children).find(
    (child) => child.props.value === value
  );

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md border bg-background text-xs sm:text-sm",
          "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        {...props}
      >
        <span>{selectedChild?.props.children || "Select..."}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-48 sm:max-h-60 overflow-auto">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => {
                onValueChange?.(child.props.value);
                setOpen(false);
              },
            })
          )}
        </div>
      )}
    </div>
  );
}

function SelectItem({ value, children, onClick, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-accent focus:bg-accent focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Select, SelectItem };

