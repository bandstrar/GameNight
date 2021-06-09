import React from 'react';
import { useForm } from 'react-hook-form';
import gameNightData from '../../helpers/data/gameNightData';

const GameNightForm = (props) => {
  const gameNight = props;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const gameNightInfo = {
      id: gameNight.night?.id || '',
      groupId: gameNight.groupId,
      title: data.title,
      date: data.date,
      description: data.description
    };

    if (gameNightInfo.id === '') {
      gameNightData.createGameNight({
        groupId: gameNightInfo.groupId, title: gameNightInfo.title, date: gameNightInfo.date, description: gameNightInfo.description
      }).then(() => {
        gameNight.onUpdate();
      });
    } else {
      gameNightData.updateGameNight(gameNightInfo.id, gameNightInfo).then(() => {
        gameNight.onUpdate();
      });
    }
    gameNight.toggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <h5>Title</h5>
    <input defaultValue={gameNight.night?.title || ''}{...register('title', { required: true })} />
    {errors.title && 'Title is required'}
    <h5>Pick a Date</h5>
    <input defaultValue={gameNight.night?.date || ''}type='date' {...register('date')} />
    <h5>Description / More Info</h5>
    <input defaultValue={gameNight.night?.description || ''}{...register('description', { required: true })} />
    {errors.description && 'Description is required'}
    <input type='submit' />
  </form>
  );
};

export default GameNightForm;
