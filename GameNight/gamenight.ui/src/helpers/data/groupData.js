import axios from 'axios';
import { baseUrl } from '../config.json';

const groupUrl = `${baseUrl}/groups`;

const getUserGroups = (userId) => new Promise((resolve, reject) => {
  axios.get(`${groupUrl}/user/${userId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getSingleGroup = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${groupUrl}/${groupId}`).then((response) => {
    resolve(response.data[0]);
  }).catch((error) => reject(error));
});

const updateGroup = (id, groupInfo) => axios
  .put(`${groupUrl}/${id}`, groupInfo)
  .catch((err) => console.warn(err));

const createNewGroup = (groupInfo) => axios.post(`${groupUrl}`, groupInfo).catch((err) => console.warn(err));

export default {
  getUserGroups, getSingleGroup, createNewGroup, updateGroup
};
