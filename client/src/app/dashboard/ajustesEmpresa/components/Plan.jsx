import React, { useState } from "react";

const Plan = ({
  name,
  pricePerMonth,
  pricePerSemester,
  features,
  linkMonth,
  linkSemester,
  handleOptionSelected,
  selectedPlan,
  selectedOption,
}) => {
  const formatPrice = (price) => {
    if (price === null) {
      return null;
    } else {
      return `U$D ${price}`;
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleOption = () => {
    handleOptionSelected(name);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLinkClick = (link) => {
    if (
      (selectedOption === "MENSUAL" && link === linkMonth) ||
      (selectedOption === "SEMESTRAL" && link === linkSemester)
    ) {
      window.open(link, "_blank");
    }
  };

  return (
    <div
      className={`w-1/3 p-4 flex flex-col gap-4 shadow-outline text-primary-500`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOption}
    >
      <div
        className={` p-4 h-40 bg-bgGris ${
          selectedPlan === name || isHovered
            ? "bg-primary-500 transition duration-300 text-white"
            : ""
        }`}
      >
        <h3 className="text-center font-bold mb-2">{name}</h3>
        <div
          className={`text-center mb-2 border-2 cursor-pointer ${
            selectedOption === "MENSUAL" ? "bg-secondary-500 text-white" : ""
          }`}
          onClick={() => handleLinkClick(linkMonth)}
        >
          {pricePerMonth !== null ? `${formatPrice(pricePerMonth)}/mes` : null}
        </div>
        <div
          className={`text-center mb-2 border-2 cursor-pointer ${
            selectedOption === "SEMESTRAL" ? "bg-secondary-500 text-white" : ""
          }`}
          onClick={() => handleLinkClick(linkSemester)}
        >
          {pricePerSemester !== null
            ? `${formatPrice(pricePerSemester)}/semestre`
            : null}
        </div>
      </div>
      <div
        className={`p-2 h-70 text-sm overflow-y-auto shadow-outline bg-bgGris ${
          selectedPlan === name || isHovered
            ? "bg-primary-500 transition duration-300 text-white"
            : ""
        }`}
      >
        <ul>
          {features.map((feature, index) => (
            <li key={index} className="list-disc">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Plan;
