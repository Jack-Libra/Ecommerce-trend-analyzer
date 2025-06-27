"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext"; 

// 主選單
const navItems = [
  {
    name: "首頁",
    path: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V9h6v12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "熱門關鍵字",
    path: "/keywords",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "類別分析",
    path: "/categories",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: "後台管理",
    path: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// 其他分組
const othersItems = [
  {
    name: "圖表分析",
    path: "/charts",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V9h6v12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// SidebarWidget 範例
const SidebarWidget = () => (
  <div className="bg-blue-50 rounded-xl p-4 m-4 text-center">
    <div className="font-bold text-blue-700 mb-2">升級專業版</div>
    <div className="text-xs text-blue-600 mb-3">解鎖更多功能！</div>
    <button className="bg-blue-600 text-white rounded px-3 py-1 text-xs">立即升級</button>
  </div>
);

// 用戶區塊
const UserBlock = () => (
  <div className="flex items-center gap-3 p-4 mt-auto">
    <div className="w-10 h-10 rounded-full bg-gray-300" />
    <div className="flex flex-col">
      <span className="font-semibold text-sm">用戶名稱</span>
      <span className="text-xs text-gray-400">user@email.com</span>
    </div>
  </div>
);

// Sidebar 組件
const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

/* //fixed top-0 left-0 h-screen 
  flex flex-col border-r shadow 
  border-r border-green-300 shadow-md
  transition-all duration-300
  z-40// */
  return (
    <aside className="fixed h-full">    
      {/* Logo */}
      <div className="py-6 flex justify-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={120} height={32} priority />
        </Link>
      </div>
      {/* MENU 分組 */}
      <div className="px-4 flex-1 flex flex-col">
        <div className="text-xs text-gray-400 mb-2 mt-2 tracking-widest">MENU</div>
        <nav className="flex flex-col gap-2 w-full">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition text-base w-full
                ${pathname === item.path
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        {/* 分隔線 */}
        <div className="my-4 border-t border-gray-200 w-full" />
        {/* OTHERS 分組 */}
        <div className="text-xs text-gray-400 mb-2 tracking-widest">OTHERS</div>
        <nav className="flex flex-col gap-2 w-full">
          {othersItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition text-base w-full
                ${pathname === item.path
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      {/* SidebarWidget */}
      <SidebarWidget />
      {/* 用戶區塊 */}
      <UserBlock />
    </aside>
  );
};

export default Sidebar;