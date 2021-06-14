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

const removeByGameId = (gameId) => axios.delete(`${nightGameVoteUrl}/game/${gameId}`).catch((err) => console.warn(err));

const removeByNightId = (nightId) => axios.delete(`${nightGameVoteUrl}/gameNight/${nightId}`).catch((err) => console.warn(err));

const removeByGroupId = (groupId) => axios.delete(`${nightGameVoteUrl}/group/${groupId}`).catch((err) => console.warn(err));

export default {
  addVote, removeVote, getByNightGameId, removeByGameId, removeByNightId, removeByGroupId
};
