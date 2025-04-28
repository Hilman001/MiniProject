import SidebarMatch from "@/components/sidebarm";
import Sidebar from "@/components/sidebaror";

export default function DismatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex-row md:flex w-screen">
        <Sidebar/>
        {children}  
      </div>
    </>
  );
}