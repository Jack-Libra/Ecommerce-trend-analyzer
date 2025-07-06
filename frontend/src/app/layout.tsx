import './globals.css';
import { SidebarProvider } from "@/contexts/SidebarContext"; 
import { ThemeProvider } from "@/contexts/ThemeContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-background text-foreground flex">
        <ThemeProvider>
          {/* 使用 SidebarProvider 包裹 Sidebar 和 Header */}
          {/* 這樣可以讓 Sidebar 和 Header 都能使用 SidebarContext */}
          <SidebarProvider>
            {/* Sidebar 採固定定位 */}
            <Sidebar />
            {/* Header 採固定定位 */}
            <Header />
            {/* 主內容區域 */}
            <div className="main-content">
              <main className="p-8 space-y-6 text-xs">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>      
      </body>
    </html>
  );
}