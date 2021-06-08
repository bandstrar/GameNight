import React from 'react';
import { useForm } from 'react-hook-form';

const GameFilterForm = (props) => {
  const games = props;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    games.filterGames(data);
    games.toggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <h5>Title</h5>
    <input defaultValue={''}{...register('title')} />
    <h5>Minimum Players</h5>
    <input defaultValue={1}type='number' {...register('minNumber', { min: 1, max: 99 })} />
    {errors.maxNumber && 'Outside range'}
    <h5>Maximum Players</h5>
    <input defaultValue={4}type='number'{...register('maxNumber', { min: 1, max: 99 })} />
    {errors.maxNumber && 'Outside range'}
    <h5>Weight</h5>
    <select {...register('weight')}>
        <option value="0">Light</option>
        <option value="1">Medium-Light</option>
        <option value="2">Medium</option>
        <option value="3">Medium-Heavy</option>
        <option value="4">Heavy</option>
      </select>
    <h5>Max Length In Minutes</h5>
    <input defaultValue={180}type='number'{...register('lengthInMinutes', { min: 1, max: 1000 })} />
    {errors.lengthInMinutes && 'Outside range'}
    <h5>Genre</h5>
    <input defaultValue={''}{...register('genre')} />
    <input type='submit' />
  </form>
  );
};

export default GameFilterForm;
