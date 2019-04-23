import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";
import CustomerList from "./components/CustomerList";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = props => {
  const style = {
    display: "inline-block",
    margin: 10,
    textDecorationLine: "none",
    fontFamily: "RobotoCondensed",
    fontSize: 25,
    color: "white"
  };

  return (
    <div>
      <div>
        <AppBar
          position="static"
          color="default"
          style={{
            background:
              "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)"
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => <CustomerList />}
            >
              <Link to="/" style={{ margin: 0 }}>
                <HomeIcon style={{ color: "white", marginTop: 5 }} />
              </Link>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ color: "white" }}
            >
              <div>
                <Link to="/" style={style}>
                  Home
                </Link>
                <Link to="/calendar" style={style}>
                  Calendar
                </Link>
                <Link to="/login" style={style}>
                  Log In
                </Link>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      {props.children}
    </div>
  );
};

export default Header;
