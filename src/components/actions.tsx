"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

interface IActionsPops {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: IActionsPops) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.preventDefault()}
          side={side}
          sideOffset={sideOffset}
          className="w-60 z-50 bg-gray-100 rounded-md"
        >
          <DropdownMenuItem
            onClick={onCopyLink}
            className="p-1 cursor-pointer "
          >
            <div className="hover:bg-gray-300 transition-all flex p-2 rounded-md justify-start items-center ">
              <Link2 className="w-4 h-4 mr-2 text-black"></Link2>{" "}
              <p className="text-sm">Copy board link</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
