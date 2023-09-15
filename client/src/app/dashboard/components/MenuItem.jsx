'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowDropDown } from "react-icons/md";

function MenuItem({menuItem, index, isOpen}) {
   const [subMenuOpen, setSubMenuOpen] = useState(false);
   const router = useRouter();
  return (
    <>
      <li
        key={index}
        className={`text-gray-800 text-sm  cursor-pointer flex items-center p-2 hover:bg-slate-200 rounded-md ${
          isOpen ? "gap-x-4 w-full  " : "gap-x-0 w-auto justify-center"
        } ${menuItem.spacing ? "mt-9" : "mt-2"}`}
        onClick={() => {
          if (!menuItem.submenu) {
            router.push(`${menuItem.url}`);
          }
        }}
      >
        <span className="text-2xl block float-left">{menuItem.icon}</span>
        <span className={`text-base font-medium flex-1 ${!isOpen && "hidden"}`}>
          {menuItem.title}
        </span>
        {menuItem.submenu && isOpen && (
          <MdOutlineArrowDropDown
            className={`${subMenuOpen && "rotate-180 duration-300"}`}
            onClick={() => {
              setSubMenuOpen(!subMenuOpen);
            }}
          />
        )}
      </li>
      {menuItem.submenu && isOpen && subMenuOpen && (
        <ul>
          {menuItem.submenuItems.map((item, index) => (
            <li
              key={index}
              className={`text-gray-800 text-xs flex items-center gap-x-4 cursor-pointer p-1 px-3 hover:bg-slate-200 rounded-md`}
              onClick={() => router.push(`${item.url}`)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MenuItem