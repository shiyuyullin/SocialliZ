import React from "react";
import { useSelector } from "react-redux";
import { Icon, Header, Container, Divider } from "semantic-ui-react";

const UserProfile = () => {
  const user = useSelector((state) => state.userState.value);
  return (
    <Container textAlign="center">
      <Header as="h2" icon>
        <Icon name="user outline" />
        Hello! {user.name}
        <Divider />
        <Header.Subheader>You looks {user.status} today.</Header.Subheader>
      </Header>
    </Container>
  );
};

export default UserProfile;
