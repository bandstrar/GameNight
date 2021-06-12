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

export default { getbyGroupId, getByUserId, getSingleGame };
