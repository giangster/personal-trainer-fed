import React from "react";
import { firebaseAuth } from "../../config";

export default class LogOut extends Component {
  logout() {
    return firebaseAuth().signOut();
  }
}
