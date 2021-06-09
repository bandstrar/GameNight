import axios from 'axios';
import { baseUrl } from '../config.json';

const nightGameUrl = `${baseUrl}/nightGame`;

const getByNightId = (nightId) => new Promise((resolve, reject) => {
  axios.get(`${nightGameUrl}/gameNight/${nightId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addVoteToGame = (id) => axios
  .put(`${nightGameUrl}/${id}/addVote`)
  .catch((err) => console.warn(err));

const removeVoteFromGame = (id) => axios
  .put(`${nightGameUrl}/${id}/removeVote`)
  .catch((err) => console.warn(err));

const addGameToNight = (nightGameInfo) => axios.post(`${nightGameUrl}`, nightGameInfo).catch((err) => console.warn(err));

export default {
  getByNightId, addGameToNight, addVoteToGame, removeVoteFromGame
};
