import axios from 'axios';
import { baseUrl } from '../config.json';

const nightGameUrl = `${baseUrl}/nightGame`;

const getByNightId = (nightId) => new Promise((resolve, reject) => {
  axios.get(`${nightGameUrl}/gameNight/${nightId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addGameToNight = (nightGameInfo) => axios.post(`${nightGameUrl}`, nightGameInfo).catch((err) => console.warn(err));

const removeByGameId = (gameId) => axios.delete(`${nightGameUrl}/game/${gameId}`).catch((err) => console.warn(err));

const removeByNightId = (nightId) => axios.delete(`${nightGameUrl}/gameNight/${nightId}`).catch((err) => console.warn(err));

export default {
  getByNightId, addGameToNight, removeByGameId, removeByNightId
};
