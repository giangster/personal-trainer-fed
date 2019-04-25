import React from "react";
import { firebaseAuth } from "../../config";

function logout() {
  return firebaseAuth().signOut();
}

const Logout = props => {
  return logout();
};

export default Logout;
