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
 
export default function Example( {user, company}) {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <div className="flex justify-center align-middle ml-4 sm:ml-2 sm:min-w-max">
          <div className="w-[50px] h-[50px] m-2">
            <img
              className="rounded-full"
              src={user?.img || "defaultImg"}
              alt={user?.name || "Default Image"}
            />
          </div>
          <div className="hidden m-2 sm:block">
            <h4 className="text-sm">
              {company?.name || "Nombre de la empresa"}
            </h4>
            <h4 className="text-xs text-gray-600 ">
              {user || "Nombre de usuario"}
            </h4>
          </div>
        </div>
      </PopoverHandler>
      <PopoverContent className="w-60 p-1">
        <List className="p-0">
          <Link
            href="/dashboard"
            className="text-sm hover:text-primary-600 hover:font-semibold"
          >
            <ListItem className="m-0">
              <ListItemPrefix>
                <MdSpaceDashboard />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link
            href="/"
            className="text-sm hover:text-primary-600 hover:font-semibold"
          >
            <ListItem>
              <ListItemPrefix>
                <MdOutlineLogout />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </PopoverContent>
    </Popover>
  );
}