import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        className="ml-3"
        src="/empty-org.svg"
        alt="Empty Organization"
        height={200}
        width={200}
      ></Image>
      <h2 className="text-2xl font-semibold ">Welcome to Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started.
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button asChild>Create organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent max-x-[480px] border-none">
            <CreateOrganization></CreateOrganization>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
