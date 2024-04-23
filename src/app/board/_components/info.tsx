"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRenameModal } from "@/store/use.rename.modal";
import Hint from "@/components/hint";
import Actions from "@/components/actions";
import { Menu } from "lucide-react";

interface IInfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: IInfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  const { onOpen } = useRenameModal();

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Button variant="ghost" asChild className="px-2">
        <Link href="/">
          <Image src="/nextjs-icon.svg" alt="logo" height={30} width={30} />
          <span
            className={cn(
              "font-semibold text-xl ml-2 text-black",
              font.className
            )}
          >
            Board
          </span>
        </Link>
      </Button>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="ghost"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data?._id, data?.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data?._id} title={data.title} side="bottom" sideOffset={10}>
        <div className="flex justify-center items-center">
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost">
              <Menu></Menu>
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"></div>
  );
}
