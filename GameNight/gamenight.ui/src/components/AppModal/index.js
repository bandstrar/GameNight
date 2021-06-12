/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

const AppModal = (props) => {
  const {
    buttonLabel,
    className,
    modalTitle,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button className='modal-add m-2' onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className='modal-header'>{modalTitle}</ModalHeader>
        <ModalBody className='modal-body'>
          {React.cloneElement(props.children, { toggle })}
        </ModalBody>
      </Modal>
      </>
  );
};

export default AppModal;
