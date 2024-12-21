"use client";
import { BiSolidMessageSquare } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: FaHouse, label: "Dashboard", href: "/" },
  { icon: BiSolidMessageSquare, label: "Chats", href: "/chats" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-16 bg-[#115E56] border-r h-screen flex flex-col items-center py-4 sticky top-0">
      <div className="flex items-center justify-center w-10 h-12 rounded-lg mb-8 bg-gradient-to-b from-[rgba(63,220,205,0.8)] via-[rgba(63,220,205,0.81)]  to-[rgba(9,84,77,1)]">
        <svg
          width="15"
          height="24"
          viewBox="0 0 15 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.57041 23.7476C4.21111 24.0352 2.49267 22.7086 3.65118 21.9416C4.73666 21.2229 7.03526 21.3271 7.96687 20.4358C12.3336 16.3607 1.11287 20.164 9.97977 13.7588C10.5901 13.3179 11.2167 12.8794 11.7036 12.3051C14.8439 8.60108 4.67221 14.1371 9.44818 8.61754C17.4931 -4.08883 4.66361 6.22522 3.09046 14.0306C0.341591 38.3623 -4.34444 8.68624 8.98362 1.74535C11.3578 0.625231 14.2636 -0.0147586 14.0283 3.8813C13.783 6.94192 11.8636 7.34524 13.7514 9.88103C15.0636 12.1452 11.8185 14.8365 10.5178 16.7054C13.3704 20.263 9.30599 22.957 5.57041 23.7476Z"
            fill="white"
          />
        </svg>
      </div>
      <hr className=" w-[50%] m-2 border-[rgba(19,78,72,1)]" />
      <div className="py-6 flex flex-col justify-between items-center h-full">
        <div>
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <button
                className={cn(
                  "w-10 h-10 mb-4 flex items-center justify-center rounded-lg",
                  pathname === item.href
                    ? "bg-green-100 text-[#115e56]"
                    : "text-white"
                )}
              >
                <item.icon size={20} />
              </button>
            </Link>
          ))}
        </div>
        <Link href="/settings">
          <IoMdSettings
            size={20}
            className="w-8 h-8 mb-4 flex items-center justify-center rounded-lg text-white"
          />
        </Link>
      </div>
    </div>
  );
}
