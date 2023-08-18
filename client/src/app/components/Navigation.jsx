"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Themebutton from "./Themebutton";
import Image from "next/image";
import Logo from '@/app/assets/Energialy Logo-01.svg'
import UserProfile from "./UserProfile";


export default function Navigation() {
  let pathname = usePathname() || "/";
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mt-auto mb-2 p-2 w-full shadow-md">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <Link href="/">
                    <Image src={Logo} />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                  <Link
                    href="/directory"
                    prefetch
                    className={`${
                      pathname === "/directory"
                        ? "border-purple-600 no-underline h-full inline-flex items-center px-1 text-purple-600 pt-1 border-b-2 text-sm font-medium"
                        : "border-transparent no-underline  text-gray-800 dark:text-gray-300 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 test-sm font-medium "
                    }`}
                  >
                    Directorio
                  </Link>
                  <Link
                    href="/licitaciones"
                    prefetch
                    className={`${
                      pathname === "/licitaciones"
                        ? "border-purple-600 no-underline h-full inline-flex items-center px-1 text-purple-600 pt-1 border-b-2 text-sm font-medium"
                        : "border-transparent no-underline  text-gray-800 dark:text-gray-300 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 test-sm font-medium "
                    }`}
                  >
                    Licitaciones
                  </Link>
                </div>
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
              <UserProfile />
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 flex flex-col">
              <Link
                href="/directory"
                prefetch
                className={`${
                  pathname == "/directory"
                    ? "bg-purple-600  no-underline text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    : "border-transparent  no-underline text-gray-800 hover:bg-purple-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                }`}
              >
                Directorio
              </Link>
              <Link
                href="/licitaciones"
                prefetch
                className={`${
                  pathname == "/licitaciones"
                    ? "bg-purple-600  no-underline text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    : "border-transparent no-underline text-gray-800 hover:bg-purple-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
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
