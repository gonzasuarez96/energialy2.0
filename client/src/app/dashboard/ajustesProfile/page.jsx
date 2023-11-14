'use client'
import React, {useState} from "react";
import Nav from "../components/Nav";
import EditProfile from "./components/EditProfile";

const optionsNav = ["Datos personales"];

function pageProfile() {
  const [selectedOption, setSelectedOption] = useState("");
  console.log('selectedoption profile:',selectedOption)
  console.log('optionsnav profile:',optionsNav)
  const handleOptions = (option) => {
    setSelectedOption(option);
  };


  return (
    <div className="w-full h-100 bg-white flex ml-4 shadow">
      <div className="w-1/4">
        <Nav options={optionsNav} onClick={handleOptions} />
      </div>
      <div className="flex-1">
        <EditProfile option={selectedOption} />
      </div>
    </div>
  );
}

export default pageProfile;
