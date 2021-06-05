import axios from 'axios';
import { baseUrl } from '../config.json';

const nightGameUrl = `${baseUrl}/nightGame`;

const getByNightId = (nightId) => new Promise((resolve, reject) => {
  axios.get(`${nightGameUrl}/gameNight/${nightId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { getByNightId };
