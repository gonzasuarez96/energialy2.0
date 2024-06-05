// ListGuesserWithLog.js

import React from "react";
import { ListGuesser } from "react-admin";

const ListGuesserWithLog = (props) => {
  console.log("ListGuesser renderizado con props:", props);
  return <ListGuesser {...props} />;
};

export default ListGuesserWithLog;