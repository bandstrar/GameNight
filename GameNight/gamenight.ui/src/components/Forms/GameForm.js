import React from 'react';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import gameData from '../../helpers/data/gameData';

const GameForm = (props) => {
  const formProps = props;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const file = data.file[0];
    const storageRef = firebase.storage().ref();
    if (file) {
      const fileRef = storageRef.child(`gameNight/${formProps.dbUserId}/${Date.now()}${file.name}`);
      fileRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((image) => {
          const gameInformation = {
            id: formProps.game?.id || '',
            userId: formProps.dbUserId,
            title: data.title,
            minPlayers: Number(data.minPlayers),
            maxPlayers: Number(data.maxPlayers),
            weight: Number(data.weight),
            lengthInMinutes: Number(data.lengthInMinutes),
            genre: data.genre,
            gameImage: image
          };

          if (gameInformation.id === '') {
            gameData.createGame({
              userId: gameInformation.userId,
              title: gameInformation.title,
              minPlayers: Number(gameInformation.minPlayers),
              maxPlayers: Number(gameInformation.maxPlayers),
              weight: Number(gameInformation.weight),
              lengthInMinutes: Number(gameInformation.lengthInMinutes),
              genre: gameInformation.genre,
              gameImage: gameInformation.gameImage
            }).then(() => {
              formProps.onUpdate();
            });
          } else {
            gameData.updateGame(gameInformation.id, gameInformation)
              .then(() => {
                formProps.onUpdate();
              });
          }
        });
      });
    } else {
      const gameInformation = {
        id: formProps.game?.id || '',
        userId: formProps.dbUserId,
        title: data.title,
        minPlayers: Number(data.minPlayers),
        maxPlayers: Number(data.maxPlayers),
        weight: Number(data.weight),
        lengthInMinutes: Number(data.lengthInMinutes),
        genre: data.genre,
        gameImage: formProps.game?.gameImage || 'https://i.imgur.com/P0oi9VM.jpg',
      };
      if (gameInformation.id === '') {
        gameData.createGame({
          userId: gameInformation.userId,
          title: gameInformation.title,
          minPlayers: Number(gameInformation.minPlayers),
          maxPlayers: Number(gameInformation.maxPlayers),
          weight: Number(gameInformation.weight),
          lengthInMinutes: Number(gameInformation.lengthInMinutes),
          genre: gameInformation.genre,
          gameImage: gameInformation.gameImage
        }).then(() => {
          formProps.onUpdate();
        });
      } else {
        gameData.updateGame(gameInformation.id, gameInformation)
          .then(() => {
            formProps.onUpdate();
          });
      }
    }
    formProps.toggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Game Title</h5>
      <input defaultValue={formProps.game?.title || ''}{...register('title', { required: true })} />
      {errors.title && 'Title is required'}
      <h5>Upload an Image</h5>
      <input type='file' {...register('file')} />
      <h5>Minimum Players</h5>
      <input type='number' defaultValue={formProps.game?.minPlayers || 1}{...register('minPlayers', { required: true, min: 1, max: 99 })} />
      {errors.minPlayers && 'Outside player count range'}
      <h5>Maximum Players</h5>
      <input type='number' defaultValue={formProps.game?.maxPlayers || 1}{...register('maxPlayers', { required: true, min: 1, max: 99 })} />
      {errors.maxPlayers && 'Outside player count range'}
      <h5>Weight</h5>
        <select defaultValue={formProps.game?.weight || 0} {...register('weight', { required: true })}>
          <option value="0">Light</option>
          <option value="1">Medium-Light</option>
          <option value="2">Medium</option>
          <option value="3">Medium-Heavy</option>
          <option value="4">Heavy</option>
      </select>
      {errors.weight && 'Game Weight is required'}
      <h5>Length In Minutes</h5>
      <input type='number' defaultValue={formProps.game?.lengthInMinutes || 1}
      {...register('lengthInMinutes', { required: true, min: 1, max: 1000 })} />
      {errors.lengthInMinutes && 'Outside game length range'}
      <h5>Game Genre</h5>
      <input defaultValue={formProps.game?.genre || ''}{...register('genre', { required: true })} />
      {errors.genre && 'Genre is required'}
      <input type='submit' />
    </form>
  );
};

export default GameForm;
