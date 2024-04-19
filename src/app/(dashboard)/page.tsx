"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./empty.org";
import BoardList from "./_components/sidebar/board.list";

interface IDashboardPageProps {
  searchParams: {
    search?: string;
    favorite?: string;
  };
}

const DashboardPage = ({ searchParams }: IDashboardPageProps) => {
  const { organization } = useOrganization();
  return (
    <div className="h-[calc(100vh-80px)] flex-1">
      {!organization ? (
        <EmptyOrg></EmptyOrg>
      ) : (
        <BoardList orgId={organization.id} query={searchParams}></BoardList>
      )}
    </div>
  );
};

export default DashboardPage;
