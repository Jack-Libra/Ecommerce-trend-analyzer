"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/contexts/SidebarContext";
import { useTheme } from "@/contexts/ThemeContext";

const Header: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sidebar 菜單按鈕
  const handleSidebarToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  // 用戶選單
  const handleUserMenuToggle = () => setUserMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed w-full h-20 ">
      <div className="flex flex-col relative">
          {/* Sidebar Toggle Button */}
          <button
            className="flex absolute -left-3 -top-2 border-2 border-black bg-gray-50"
            onClick={handleSidebarToggle}
            aria-label="切換側邊欄"
          >
            {/* 漢堡/收合 icon */}
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24"> {/* viewBox="minX minY width height" */}
              <path d="M3 6h18,M3 12h18,M3 18h18" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>

          </button>

          {/* 搜尋框 */}
          <div className="lg:block flex-1 ">
            <form >
              <div className="relative ">
                <span className="absolute left-1 top-13  pointer-events-none text-brand">
                  <svg className="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="9" cy="9" r="7" stroke="black" strokeWidth="2" fill="none" />
                    <path d="M35 35L15 15" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="搜尋或輸入指令..."
                  className="absolute left-0 top-10 
                  text-gray-800
                  border border-black-50                 
                  py-2  pl-6 
                  focus:ring-2 focus:outline-none focus:ring-pink-400"
                />
              </div>
            </form>
          </div>
        {/* 右側功能區 */}
        <div className="flex items-center  gap-4 px-5 py-4 lg:justify-end lg:px-0">
          {/* 主題切換按鈕 */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="切換主題"
          >
            {theme === "dark" ? (
              // 太陽 icon
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              // 月亮 icon
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
          {/* 用戶選單按鈕 */}
          <div className="relative">
            <button
              onClick={handleUserMenuToggle}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-blue-400 transition"
              aria-label="用戶選單"
            >
              <span className="font-bold text-gray-600 dark:text-gray-200">N</span>
            </button>
            {/* 用戶下拉選單（可擴充） */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg py-2 z-50">
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">個人資料</button>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">登出</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;