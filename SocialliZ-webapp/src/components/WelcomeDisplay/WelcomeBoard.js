import React from "react";
import { Header, Icon } from "semantic-ui-react";

const WelcomeBoard = () => {
  return (
    <Header as="h2" icon textAlign="center">
      <Icon name="users" circular />
      <Header.Content>SocialliZ</Header.Content>
    </Header>
  );
};

export default WelcomeBoard;
