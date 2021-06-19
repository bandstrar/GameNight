import React from 'react';
import { Button } from 'reactstrap';

const DeleteForm = (props) => {
  const deleteProps = props;

  return (
    <div>
        <h3>Are you sure you want to delete this?</h3>
        <Button className="btn-danger mt-2" onClick={() => deleteProps.onDelete()}>Yes</Button>
        <Button className="ml-3 mt-2" onClick={() => deleteProps.toggle()}>No</Button>
    </div>
  );
};

export default DeleteForm;
