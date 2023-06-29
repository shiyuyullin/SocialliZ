import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Icon, Header } from "semantic-ui-react";
import { open, close } from "../../util/States/modalState";

const modal = () => {
  const modalState = useSelector((state) => state.modalState.value);
  const errorState = useSelector((state) => state.errorState.value);
  const dispatch = useDispatch();

  return (
    <Modal dimmer="blurring" open={modalState}>
      <Header icon="archive" content="Failed" />
      <Modal.Content>
        <h4>{errorState}</h4>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => dispatch(close())}>
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default modal;
