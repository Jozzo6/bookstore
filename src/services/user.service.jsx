import axios from 'axios';

async function getAllUsers() {
	let res = await axios.get('users');
	return res.data;
}

async function getUser(id) {
	let res = await axios.get(`users/${id}`);
	return res.data;
}

async function updateUser(user) {
	let res = await axios.put(`users/${user.id}`, user);
	return res.data;
}

async function deleteUser(id) {
	let res = await axios.delete(`users/${id}`);
	return res.data;
}

export default {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
};
