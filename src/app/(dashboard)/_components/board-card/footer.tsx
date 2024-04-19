import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface IFooterProps {
  title: string;
  authorLabel: string;
  createAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Footer = ({
  title,
  authorLabel,
  createAtLabel,
  isFavorite,
  onClick,
  disabled,
}: IFooterProps) => {
  return (
    <div className="relative bg-white p-3 ">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "opacity-0  group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-70"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4 ",
            isFavorite && "fill-blue-600 text-blue-600"
          )}
        ></Star>
      </button>
    </div>
  );
};

export default Footer;
