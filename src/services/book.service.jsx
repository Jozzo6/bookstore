import axios from 'axios';

async function getAllBooks() {
	let res = await axios.get('books');
	return res.data;
}

async function getBook(id) {
	let res = await axios.get(`books/${id}`);
	return res.data;
}

async function createBook(book) {
	let res = await axios.post('books', book);
	return res.data;
}

async function updateBook(book) {
	let res = await axios.put(`books/${book.id}`, book);
	return res.data;
}

async function deleteBook(id) {
	let res = await axios.delete(`books/${id}`);
	return res.data;
}

export default {
	getAllBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
};
