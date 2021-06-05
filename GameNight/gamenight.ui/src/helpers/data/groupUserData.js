import axios from 'axios';
import { baseUrl } from '../config.json';

const groupUserUrl = `${baseUrl}/groupUsers`;

const getActiveGroupUsers = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${groupUserUrl}/group/${groupId}/active`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getInactiveGroupUsers = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${groupUserUrl}/group/${groupId}/inactive`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getCurrentGroupUser = (userId, groupId) => new Promise((resolve, reject) => {
  axios.get(`${groupUserUrl}/${userId}/${groupId}`).then((response) => {
    resolve(response.data[0]);
  }).catch((error) => reject(error));
});

const createGroupUser = (groupUserInfo) => axios.post(`${groupUserUrl}`, groupUserInfo).catch((err) => console.warn(err));

export default {
  getActiveGroupUsers, getInactiveGroupUsers, getCurrentGroupUser, createGroupUser
};
