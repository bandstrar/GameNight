import axios from 'axios';
import { baseUrl } from '../config.json';

const nightGameVoteUrl = `${baseUrl}/gameVotes`;

const getByNightGameId = (nightGameId) => new Promise((resolve, reject) => {
  axios.get(`${nightGameVoteUrl}/nightGame/${nightGameId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addVote = (gameVoteInfo) => axios.post(`${nightGameVoteUrl}`, gameVoteInfo).catch((err) => console.warn(err));

const removeVote = (nightGameId, userId) => axios.delete(`${nightGameVoteUrl}/${nightGameId}/${userId}`).catch((err) => console.warn(err));

export default { addVote, removeVote, getByNightGameId };
