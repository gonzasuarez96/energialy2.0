'use client'
import Link from "next/link";
import Image from "next/image";
//import Banner from "@/app/assets/banner.jpg";
//import Logo from "@/app/assets/LogoPenzoil.png";
import { MdMoney } from "react-icons/md";
import {MdPointOfSale} from 'react-icons/md'
import {MdOutlineArrowDropDown} from 'react-icons/md'
import {AiOutlineMenu} from 'react-icons/ai'
import { useState } from "react";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

import { menuBar } from "@/app/data/menu";


function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const userData = useSelector((state) => state.user.userData )
  // const banner = userData.company.bannerPicture || null;
  // const logo = userData.company.profilePicture || null;
  //console.log(userData)

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  
  //console.log(banner)
  //console.log(logo);

  return (
    <div
      className={`${isOpen ? "md:w-[300px]" : "md:w-[80px]"}
        h-screen bg-white max-w-[1/4] relative duration-300`}
    >
      <div
        className={`${
          isOpen ? "top-28  -right-4 " : "top-6  -right-3 "
        } absolute  cursor-pointer z-10 bg-primary-400 rounded-full duration-300 p-2`}
        onClick={toggle}
      >
        {isOpen ? (
          <AiOutlineMenu className="text-gray-100 " size="20px" />
        ) : (
          <AiOutlineMenu className="text-gray-100 " size="14px" />
        )}
      </div>
      {/*Company Data */}
      <div className="flex flex-col items-center justify-center">
{/*         {banner ? <img className="-z-0" src={banner} alt="bannerProfile"/> : null} */}
{/*         {logo ? <img
          src={logo}
          className={`${isOpen ? "w-[100px]" : "w-[50px] duration-300"}`}
        />: null} */}
        
      </div>
      {/*Menu Items*/}
      <div
        className={`flex flex-col items-start justify-center gap-4 duration-300 ${
          isOpen ? "px-2" : "px-0"
        } `}
      >
        <ul className="pt-2 w-full items-center ">
          {menuBar.map((menuItem, index) => (
            <MenuItem menuItem={menuItem} key={index} isOpen={isOpen} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
