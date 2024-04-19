"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Hint from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return null;

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="center" sideOffset={53}>
        <Image
          fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-50 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        ></Image>
      </Hint>
    </div>
  );
};

export default Item;