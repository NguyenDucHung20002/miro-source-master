"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useApiMutation } from "@/hooks/use.api.mutation";
import { toast } from "sonner";

interface INewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: INewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then(() => {
        toast.success("Board created");
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <>
      <button
        disabled={pending || disabled}
        onClick={onClick}
        className={cn(
          "col-span-1 aspect-[100/127]  border-2 rounded-lg transition-all  flex flex-col items-center justify-center py-6 bg-blue-400 hover:bg-blue-500",
          (pending || disabled) && "opacity-75 cursor-not-allowed"
        )}
      >
        <div></div>
        <Plus className="h-12 w-12 text-white  transition-all"></Plus>
        <p className="text-sm text-white  font-light transition-all">
          New board
        </p>
      </button>
    </>
  );
};

export default NewBoardButton;
