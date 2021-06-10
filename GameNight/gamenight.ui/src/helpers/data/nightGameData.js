import axios from 'axios';
import { baseUrl } from '../config.json';

const nightGameUrl = `${baseUrl}/nightGame`;

const getByNightId = (nightId) => new Promise((resolve, reject) => {
  axios.get(`${nightGameUrl}/gameNight/${nightId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addGameToNight = (nightGameInfo) => axios.post(`${nightGameUrl}`, nightGameInfo).catch((err) => console.warn(err));

export default {
  getByNightId, addGameToNight
};
