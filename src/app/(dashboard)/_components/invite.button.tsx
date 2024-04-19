import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const InviteButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex justify-center items-center border border-gray-400 p-2 border-opacity-40 rounded-md hover:bg-[#f0f2f4] transition">
            <Plus className="h-4 w-4 mr-2"></Plus>
            <p className="text-sm">Invite members</p>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
          <OrganizationProfile></OrganizationProfile>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteButton;
