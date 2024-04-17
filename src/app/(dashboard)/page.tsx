"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./empty.org";

const DashboardPage = () => {
  const { organization } = useOrganization();
  return (
    <div className="h-[calc(100vh-80px)] flex-1">
      {!organization ? <EmptyOrg></EmptyOrg> : <p>Board list</p>}
    </div>
  );
};

export default DashboardPage;
