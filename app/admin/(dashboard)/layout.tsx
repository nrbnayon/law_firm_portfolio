// app\admin\layout.tsx

import AdminDashboardSidebar from "@/components/Admin/AdminDashboardSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminDashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-64">
        <div className="mx-auto p-4 md:p-6 lg:px-10 lg:py-5">{children}</div>
      </main>
    </div>
  );
}
