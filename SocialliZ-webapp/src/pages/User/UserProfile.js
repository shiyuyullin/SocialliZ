import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon, Header, Container, Divider } from "semantic-ui-react";

const UserProfile = ({ token }) => {
  const { userId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return response;
    }
    fetchUser().then((res) => {
      if (res.status !== 200) throw new Error("Failed to fetch status");
      setEmail(res.data.user.email);
      setName(res.data.user.name);
      setStatus(res.data.user.status);
    });
  }, [userId]);

  return (
    <Container textAlign="center">
      <Header as="h2" icon>
        <Icon name="user outline" />
        Hello! {name}
        <Divider />
        <Header.Subheader>You looks {status} today.</Header.Subheader>
      </Header>
    </Container>
  );
};

export default UserProfile;
