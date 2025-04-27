import Sidebar from "@/components/sidebar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex-row md:flex w-screen">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
