"use client";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const isFavorite = searchParams.get("favorite");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <Image src="/vercel.svg" alt="logo" height={60} width={100}></Image>
          <span className={cn("font-semibold text-2xl", font.className)}></span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
            },
          },
        }}
      ></OrganizationSwitcher>
      <div className="space-y-1 w-full flex flex-col gap-2 ">
        <Button
          variant={isFavorite ? "ghost" : "secondary"}
          className="font-normal justify-center px-2 w-full border border-solid"
          size="lg"
          asChild
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2"></LayoutDashboard>
            Team board
          </Link>
        </Button>
        <Button
          variant={!isFavorite ? "ghost" : "secondary"}
          className="font-normal justify-center px-2 w-full border border-solid"
          size="lg"
          asChild
        >
          <Link href={{ pathname: "/", query: { favorite: true } }}>
            <Star className="h-4 w-4 mr-2"></Star>
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
