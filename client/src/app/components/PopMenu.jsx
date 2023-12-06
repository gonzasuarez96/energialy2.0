import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import {MdOutlineLogout} from "react-icons/md";
import getLocalStorage from "../Func/localStorage";


 
export default function Example() {
  const userData = getLocalStorage();
  
  const defaultAvatar = `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}background=c7d2fe&color=3730a3&bold=true`

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <div className="flex justify-center align-middle ml-4 sm:ml-2 sm:min-w-max">
          <div className="w-[50px] h-[50px] object-fill m-2">
            <img
              className="rounded-full w-full h-full"
              src={userData?.company?.profilePicture || defaultAvatar}
              alt={userData?.company?.name || "Default Image"}
            />
          </div>
          <div className="hidden m-2 sm:block">
            <h4 className="text-sm">
              {userData?.company?.name || "Sin empresa asociada"}
            </h4>
            <h4 className="text-xs text-gray-600 ">
              {userData?.firstName + " " + userData?.lastName}
            </h4>
          </div>
        </div>
      </PopoverHandler>
      <PopoverContent className="w-60 p-1">
        <List className="p-0">
          <Link
            href="/dashboard"
            //className="text-sm hover:text-primary-600 hover:font-semibold"
          >
            <ListItem className="m-0 text-sm hover:text-primary-600 hover:font-semibold cursor-pointer">
              <ListItemPrefix>
                <MdSpaceDashboard />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <ListItem
            className="text-sm hover:text-primary-600 hover:font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            <ListItemPrefix>
              <MdOutlineLogout />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </PopoverContent>
    </Popover>
  );
}