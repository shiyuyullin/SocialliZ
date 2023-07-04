import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutHandler } from "../../../util/Handlers/logoutHandler";

const mainNavigation = () => {
  const user = useSelector((state) => state.userState.value);
  const userId = useSelector((state) => state.userIdState.value);
  const isAuth = useSelector((state) => state.authState.value);
  return (
    <Menu inverted size="large" color="teal">
      <Menu.Item name="home">
        <Icon color="black" name="users" />
        SocialliZ
      </Menu.Item>
      {isAuth && (
        <Menu.Item name="feed" as={NavLink} to="/">
          Feed
        </Menu.Item>
      )}
      <Menu.Menu position="right">
        {isAuth && (
          <Menu.Item name="userProfile" as={NavLink} to={`user/${userId}`}>
            Welcome, {user.name}
          </Menu.Item>
        )}
        {!isAuth && <Menu.Item name="login" as={NavLink} to="/"></Menu.Item>}
        {!isAuth && (
          <Menu.Item name="signup" as={NavLink} to="/signup"></Menu.Item>
        )}

        {isAuth && <Menu.Item name="logout" onClick={logoutHandler} />}
      </Menu.Menu>
    </Menu>
  );
};

export default mainNavigation;
