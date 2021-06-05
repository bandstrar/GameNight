import React from 'react';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import groupData from '../../helpers/data/groupData';
import groupUserData from '../../helpers/data/groupUserData';

const GroupForm = (props) => {
  const group = props;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const file = data.file[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`gameNight/${group.dbUserId}/${Date.now()}${file.name}`);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((image) => {
        const groupInformation = {
          id: group.group?.id || '',
          name: data.name,
          image,
          description: data.description
        };

        if (groupInformation.id === '') {
          groupData.createNewGroup({ name: groupInformation.name, image: groupInformation.image, description: groupInformation.description })
            .then((response) => {
              const groupUserObject = {
                userId: group.dbUserId,
                groupId: response.data.id,
                admin: true,
                isActive: true
              };

              groupUserData.createGroupUser(groupUserObject).then(() => {
                group.onUpdate();
              });
            });
        } else {
          groupData.updateGroup(groupInformation.id, groupInformation)
            .then(() => {
              group.onUpdate();
            });
        }
      });
    });
    group.toggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Group Name</h5>
      <input defaultValue={group.group?.name || ''}{...register('name', { required: true })} />
      {errors.name && 'Name is required'}
      <h5>Upload an Image</h5>
      <input defaultValue={group.group?.image || ''}type='file' {...register('file')} />
      <h5>Group Description</h5>
      <input defaultValue={group.group?.description || ''}{...register('description', { required: true })} />
      {errors.description && 'Description is required'}
      <input type='submit' />

    </form>
  );
};

export default GroupForm;
