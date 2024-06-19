import React from "react";
import Image from "next/image";

function GalleryCard({imageUrl, description, openModal} ) {

  const handleImageClick = () => {
    openModal(imageUrl); 
  };

    return (
      <>
      <div
        className="w-[320px] h-[200px] flex flex-col rounded-md bg-white shadow-md hover:shadow-2xl cursor-pointer"
        onClick={handleImageClick}
      >
        <div className="flex w-full h-1/2 rounded-tr-md rounded-tl-md">
          <Image
            className="rounded-tr-md rounded-tl-md w-full h-full object-cover"
            src={imageUrl}
            width={320}
            height={220}
          />
        </div>
        
        <div className=" w-full mt-2 pt-2 flex justify-center">
          <h3 className="text-lg hover:text-secondary-500">
            {description}
          </h3>
        </div>
      </div>
    </>
    );
}

export default GalleryCard