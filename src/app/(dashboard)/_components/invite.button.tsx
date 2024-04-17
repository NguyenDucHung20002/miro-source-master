import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const InviteButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2"></Plus>
            Invite members
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
          <OrganizationProfile></OrganizationProfile>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteButton;
