"use client";

import { useApiMutation } from "@/hooks/use.api.mutation";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import ConfirmModal from "@/components/confirm.modal";
import { useRenameModal } from "@/store/use.rename.modal";

interface IActionsPops {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: IActionsPops) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = async () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete"));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.preventDefault()}
          side={side}
          sideOffset={sideOffset}
          className="w-60 z-50 bg-gray-200 rounded-md"
        >
          <DropdownMenuItem
            onClick={onCopyLink}
            className="p-1 cursor-pointer border-none outline-none"
          >
            <div className="hover:bg-gray-300 transition-all flex p-2 rounded-md justify-start items-center ">
              <Link2 className="w-4 h-4 mr-2 text-black"></Link2>{" "}
              <p className="text-sm">Copy board link</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onOpen(id, title)}
            className="p-1 cursor-pointer border-none outline-none"
          >
            <div className="hover:bg-gray-300 transition-all flex p-2 rounded-md justify-start items-center ">
              <Pencil className="w-4 h-4 mr-2 text-black"></Pencil>{" "}
              <p className="text-sm">Rename</p>
            </div>
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete beard?"
            description="This will delete the board and all its contents."
            disabled={pending}
            onConfirm={onDelete}
          >
            <button className="p-1 w-full cursor-pointer border-none outline-none">
              <div className="hover:bg-gray-300 w-full transition-all flex p-2 rounded-md justify-start items-center ">
                <Trash2 className="w-4 h-4 mr-2 text-black"></Trash2>{" "}
                <p className="text-sm">Delete board</p>
              </div>
            </button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
