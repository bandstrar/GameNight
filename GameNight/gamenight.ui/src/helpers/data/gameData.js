import axios from 'axios';
import { baseUrl } from '../config.json';

const gameUrl = `${baseUrl}/games`;

const getbyGroupId = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${gameUrl}/group/${groupId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { getbyGroupId };
