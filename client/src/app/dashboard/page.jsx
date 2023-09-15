'use client'
import React from "react";
import { useSelector } from "react-redux";
import Buttons from "./components/Buttons";

function DasboardPage() {
  const user = useSelector((state) => state.user.userData);

  return (
    <div className="w-full h-100 bg-[#f8f8fb] border border-black ml-4">
      <div className="flex">
        <h1 className="flex items-center">Hola, {user.firstName}</h1>
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default DasboardPage;
