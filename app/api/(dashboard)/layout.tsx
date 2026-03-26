import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-light text-blue-700">
      
      <Sidebar/>
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        <Footer />
      </div>
      
    </div>
  );
}