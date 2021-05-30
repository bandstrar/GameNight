import firebase from 'firebase';

const getUid = () => firebase.auth().currentUser?.uid;

export default { getUid };
