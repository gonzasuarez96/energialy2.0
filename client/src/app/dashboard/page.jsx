'use client'
import React from "react";
import { useSelector } from "react-redux";
import Buttons from "./components/Buttons";

function DasboardPage() {
  

  const userD = localStorage.getItem("user");
  const user = JSON.parse(userD);
  console.log('userPage:',user)

  return (
    <div className="w-full h-100 bg-[#f8f8fb] ml-4">
      <div className="flex">
        <h1 className="flex items-center p-2">Hola, {user.firstName}</h1>
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default DasboardPage;
