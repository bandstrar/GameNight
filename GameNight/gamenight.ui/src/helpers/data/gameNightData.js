import axios from 'axios';
import { baseUrl } from '../config.json';

const gameNightUrl = `${baseUrl}/gameNight`;

const getAllGroupGameNights = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${gameNightUrl}/group/${groupId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getSingleGameNight = (nightId) => new Promise((resolve, reject) => {
  axios.get(`${gameNightUrl}/${nightId}`).then((response) => {
    resolve(response.data[0]);
  }).catch((error) => reject(error));
});

const updateGameNight = (id, nightInfo) => axios
  .put(`${gameNightUrl}/${id}`, nightInfo)
  .catch((err) => console.warn(err));

const createGameNight = (nightInfo) => axios.post(`${gameNightUrl}`, nightInfo).catch((err) => console.warn(err));

const deleteGameNight = (nightId) => axios.delete(`${gameNightUrl}/${nightId}`).catch((err) => console.warn(err));

export default {
  getAllGroupGameNights, getSingleGameNight, createGameNight, updateGameNight, deleteGameNight
};
