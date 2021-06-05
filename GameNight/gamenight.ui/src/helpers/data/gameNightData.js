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

export default { getAllGroupGameNights, getSingleGameNight };
