'use client';

import Link from 'next/link';
import Image from 'next/image';
//import Banner from "@/app/assets/banner.jpg";
//import Logo from "@/app/assets/LogoPenzoil.png";
import { MdMoney } from 'react-icons/md';
import { MdPointOfSale } from 'react-icons/md';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import getLocalStorage from '../../Func/localStorage';

import Loader from '@/app/components/Loader';

import { menuBar } from '@/app/data/menu';
import { bankAccountOpen } from '@/app/Func/controllers';

function SideBar() {
  const [user, setUser] = useState(null);
  //console.log(user)
  const [isOpen, setIsOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [itemMenu, setItemMenu] = useState(menuBar);
  const [isBankAccountOpen, setIsBankAccountOpen] = useState(false);

  const banner = user?.company?.bannerPicture || null;
  const logo = user?.company?.profilePicture || null;
  //console.log(banner)
  //console.log(userData)

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //console.log(itemMenu)
  useEffect(() => {
    const fetchData = async () => {
      const user = getLocalStorage();
      setUser(user);
      const itemUserRole = menuBar.filter((item) => item.auth.includes(user?.role));
      setItemMenu(itemUserRole);

      // Llamar a bankAccountOpen y establecer el estado de isBankAccountOpen
      try {
        const result = await bankAccountOpen(user.company.id);
        setIsBankAccountOpen(result);
      } catch (error) {
        console.error('Error fetching bank account status:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`${isOpen ? 'md:w-[300px]' : 'md:w-[80px]'}
        h-screen bg-white max-w-[1/4] relative duration-300`}
    >
      <div
        className={`${isOpen ? 'top-28  -right-4 ' : 'top-6  -right-3 '} absolute  cursor-pointer z-10 bg-primary-400 rounded-full duration-300 p-2`}
        onClick={toggle}
      >
        {isOpen ? <AiOutlineMenu className="text-gray-100 " size="20px" /> : <AiOutlineMenu className="text-gray-100 " size="14px" />}
      </div>
      {/*Company Data */}
      <div className="flex flex-col items-center justify-center gap-2">
        {banner ? <img className="-z-0" src={banner} alt="bannerProfile" /> : null}
        {logo ? <img src={logo} className={`${isOpen ? 'w-[75px] h-[75px] rounded-full' : 'w-[50px] h-[50px] rounded-full duration-300'}`} /> : null}
      </div>
      {/*Menu Items*/}
      <div className={`  duration-300 ${isOpen ? 'px-2' : 'px-0'} `}>
        <ul className="pt-2 pl-0 w-full flex flex-col items-center justify-center gap-2">
          {itemMenu.length === 0 ? (
            <Loader />
          ) : (
            itemMenu.map((menuItem, index) => (
              <MenuItem menuItem={menuItem} key={index} isOpen={isOpen} user={user} isBankAccountOpen={isBankAccountOpen} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
