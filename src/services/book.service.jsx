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

async function borrowBook(id, user_id) {
	let res = await axios.post(`books/${id}/borrow/${user_id}`);
	return res.data;
}

async function returnBook(borrow_id) {
	let res = await axios.put(`books/return/${borrow_id}`);
	return res.data;
}

async function getBorrowedBooks(user_id, book_id, isbn) {
	let res = await axios.get(`borrowed/books`, {
		params: { user_id, book_id, isbn },
	});
	return res.data;
}

export default {
	getAllBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
	borrowBook,
	returnBook,
	getBorrowedBooks,
};
