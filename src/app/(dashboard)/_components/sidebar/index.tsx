import List from "./list";
import NewButton from "./new.button";

const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 gap-y-4 text-white flex-col">
      <List></List>
      <NewButton></NewButton>
    </aside>
  );
};

export default Sidebar;
