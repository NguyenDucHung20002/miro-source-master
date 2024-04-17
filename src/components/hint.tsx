import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface IHintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

const Hint = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: IHintProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            className="text-white bg-gray-500 order-black px-2 py-1 rounded-sm"
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
          >
            <p className="font-semibold capitalize">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default Hint;
