'use client'
import PopMenu from "./PopMenu";

function UserProfile() {
  const defaultImg = "../assets/Energialy_Logo_Favicon-01";
  return (

    <PopMenu >

      {/* <div className="flex justify-center align-middle ml-4 sm:ml-2 sm:min-w-max"
      >
        <div className="w-[50px] h-[50px] m-2">
          <img
            className="rounded-full"
            src={user?.img || defaultImg}
            alt={user?.name || "Default Image"}
          />
        </div>
        <div className="hidden m-2 sm:block">
          <h4 className="text-sm">{company?.name || 'Nombre de la empresa'}</h4>
          <h4 className="text-xs text-gray-600 flex justify-end">{user.firstName + ' ' + user.lastName || 'Nombre de usuario'}</h4>
        </div>
      </div> */}
    </PopMenu>
  );
}

export default UserProfile;
