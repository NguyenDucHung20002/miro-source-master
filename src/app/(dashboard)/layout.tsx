import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org.sidebar";
import Sidebar from "./_components/sidebar";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  return (
    <main className="w-full">
      <Sidebar></Sidebar>
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar></OrgSidebar>
          <div className="h-full flex-1">
            <Navbar></Navbar>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardLayout;
