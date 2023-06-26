import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const mainNavigation = ({ onLogout, isAuth, userId }) => {
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
            Welcome, {userId}
          </Menu.Item>
        )}
        {!isAuth && <Menu.Item name="login" as={NavLink} to="/"></Menu.Item>}
        {!isAuth && (
          <Menu.Item name="signup" as={NavLink} to="/signup"></Menu.Item>
        )}

        {isAuth && <Menu.Item name="logout" onClick={onLogout} />}
      </Menu.Menu>
    </Menu>
  );
};

export default mainNavigation;
