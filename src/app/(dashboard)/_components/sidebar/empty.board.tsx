"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use.api.mutation";
import { toast } from "sonner";

const EmptyBoard = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then(() => {
        toast.success("Board created");
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <Image
          className="ml-3"
          src="/empty-org.svg"
          alt="Empty Organization"
          height={200}
          width={200}
        ></Image>
        <h2 className="text-2xl font-semibold ">Welcome to Team boards</h2>
        <p className="text-muted-foreground text-lg mt-2">
          No thing at all, try to create a new one!
        </p>
        <Button disabled={pending} onClick={onClick} className="mt-5 px-5">
          Create board
        </Button>
      </div>
    </>
  );
};

export default EmptyBoard;
