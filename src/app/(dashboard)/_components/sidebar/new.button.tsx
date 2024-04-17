"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Hint from "@/components/hint";

const NewButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-square">
            <Hint
              label="Create organization"
              side="right"
              align="center"
              sideOffset={18}
            >
              <button className="bg-white/25 h-full w-full items-center justify-center flex opacity-60 hover:opacity-100 transition-all rounded-md">
                <Plus className="text-white"></Plus>
              </button>
            </Hint>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent max-x-[480px] border-none">
          <CreateOrganization></CreateOrganization>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewButton;
