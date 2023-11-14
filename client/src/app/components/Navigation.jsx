"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/app/assets/Energialy Logo-01.svg";
import UserProfile from "./UserProfile";
import React, { useEffect, useState } from "react";


import { useRouter } from "next/navigation";
import getLocalStorage from "../Func/localStorage";


export default function Navigation() {
  const [user, setUser] = useState(null);
  

  function isAuthenticated() {
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  let pathname = usePathname() || "/";
  const router = useRouter();

  useEffect(() => {
    const user = getLocalStorage();
    setUser(user);
  },[])

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mt-auto p-2 w-full shadow-md bg-white">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex items-center cursor-pointer">
                  <div
                    onClick={() => {
                      router.refresh();
                      router.push("/");
                    }}
                  >
                    <Image src={Logo} />
                  </div>
                </div>

                {isAuthenticated() ? (
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                    {user.company?.id ? null: <Link
                      href="/registerCompany"
                      prefetch
                      className={`${
                        pathname === "/registerCompany"
                          ? "no-underline bg-secondary-600 text-white py-2 px-2 rounded-lg inline-block text-center uppercase font-semibold tracking-wide"
                          : "no-underline bg-[#191654] text-white py-2 px-2 rounded-lg inline-block text-center uppercase font-semibold tracking-wide transition duration-300 ease-in-out hover:bg-secondary-600"
                      }`}
                    >
                      Registra tu empresa
                    </Link> }
                    <div
                      onClick={() => {
                        router.refresh();
                        router.push("/directory");
                      }}
                      className={`${
                        pathname === "/directory"
                          ? "border-secondary-600 no-underline h-full inline-flex items-center px-1 text-secondary-600 pt-1 border-b-2 text-sm font-medium cursor-pointer"
                          : "border-transparent no-underline  text-gray-600 dark:text-gray-300 hover:text-secondary-500 inline-flex items-center px-1 pt-1 border-b-2 test-sm font-medium cursor-pointer"
                      }`}
                    >
                      Directorio
                    </div>
                    <Link
                    href="/tenders"
                    prefetch
                    className={`${
                      pathname === "/licitaciones"
                        ? "border-secondary-600 no-underline h-full inline-flex items-center px-1 text-secondary-600 pt-1 border-b-2 text-sm font-medium"
                        : "border-transparent no-underline  text-gray-800 dark:text-gray-300 hover:text-secondary-500 inline-flex items-center px-1 pt-1 border-b-2 test-sm font-medium "
                    }`}
                  >
                    Licitaciones
                  </Link>
                    <UserProfile />
                  </div>
                ) : (
                  <div className="sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                    <Link
                      href="/login"
                      prefetch
                      className={`${
                        pathname === "/login"
                          ? "border-[#191654] no-underline text-[#191654] h-full inline-flex items-center px-1 pt-1 border-b-2 font-medium"
                          : "border-transparent no-underline text-[#191654] h-full inline-flex items-center px-1 pt-1 transition duration-300 hover:border-[#191654] border-b-2 font-medium"
                      }`}
                    >
                      Iniciar Sesion
                    </Link>
                    <Link
                      href="/register"
                      prefetch
                      className={`${
                        pathname === "/register"
                          ? "no-underline bg-secondary-600 text-white py-2 px-3 rounded-lg inline-block text-center uppercase font-semibold tracking-wide text-sm"
                          : "no-underline bg-[#191654] text-white py-2 px-3 rounded-lg inline-block text-center uppercase font-semibold tracking-wide text-sm transition duration-300 ease-in-out hover:bg-secondary-600"
                      }`}
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-text-gray-400 ">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 flex flex-col">
              <Link
                href="/directory"
                prefetch
                className={`${
                  pathname == "/directory"
                    ? "border-secondary-600  no-underline text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    : "border-transparent  no-underline text-gray-800 hover:border-secondary-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                }`}
              >
                Directorio
              </Link>
              <Link
                href="/licitaciones"
                prefetch
                className={`${
                  pathname == "/licitaciones"
                    ? "border-secondary-600  no-underline text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    : "border-transparent no-underline text-gray-800 hover:border-secondary-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                }`}
              >
                Licitaciones
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
