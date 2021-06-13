import axios from 'axios';
import { baseUrl } from '../config.json';

const gameUrl = `${baseUrl}/games`;

const getbyGroupId = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${gameUrl}/group/${groupId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${gameUrl}/user/${userId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getSingleGame = (gameId) => new Promise((resolve, reject) => {
  axios.get(`${gameUrl}/${gameId}`).then((response) => {
    resolve(response.data[0]);
  }).catch((error) => reject(error));
});

const updateGame = (id, gameInfo) => axios
  .put(`${gameUrl}/${id}`, gameInfo)
  .catch((err) => console.warn(err));

const createGame = (gameInfo) => axios.post(`${gameUrl}`, gameInfo).catch((err) => console.warn(err));

const deleteGame = (gameId) => axios.delete(`${gameUrl}/${gameId}`).catch((err) => console.warn(err));

export default {
  getbyGroupId, getByUserId, getSingleGame, createGame, updateGame, deleteGame
};
