import { useState, useEffect, useCallback } from 'react';
import bookService from '../../services/book.service.jsx';
import { StateEnum } from '../../services/enums.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import BookInfo from './components/BookInfo.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import BookCreate from './components/BookCreate.jsx';

function BooksPage() {
	const [bookState, setBookState] = useState(StateEnum.UnInitialized);
	const [books, setBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);
	const [createBookOpened, setCreateBookOpened] = useState(false);

	const getBooks = useCallback(async () => {
		try {
			setBookState(StateEnum.Loading);
			setBooks(await bookService.getAllBooks());
			setBookState(StateEnum.Success);
		} catch (e) {
			setBookState(StateEnum.Error);
		}
	}, []);

	useEffect(() => {
		if (bookState === StateEnum.UnInitialized) {
			getBooks();
		}
	}, [bookState, getBooks]);

	const openBookInfo = (book) => {
		setSelectedBook({ ...book });
	};

	const closeBookInfo = (book) => {
		if (book) {
			setBooks((prevBooks) =>
				prevBooks.map((b) => {
					if (b.id === book.id) {
						return book;
					}
					return b;
				})
			);
		}
		setSelectedBook(null);
	};

	const closeBookCreate = (book) => {
		if (book) {
			setBooks((prevBooks) => [...prevBooks, book]);
		}
		setCreateBookOpened(false);
	};

	return (
		<div className='container'>
			<div className='d-flex column justify-content-between m-4'>
				<h3 className='h3'>Books Page</h3>
				<PrimaryButton text='Add' onClick={() => setCreateBookOpened(true)} />
			</div>
			{bookState === 'loading' && <p>Loading...</p>}
			{bookState === 'error' && <p>Error loading books</p>}
			{bookState === 'success' && (
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>Author</th>
							<th scope='col'>Title</th>
							<th scope='col'>Publisher</th>
							<th scope='col'>Year Published</th>
							<th scope='col'>ISBN</th>
							<th scope='col'>Quantity</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book) => (
							<tr
								key={book.id}
								onClick={() => {
									openBookInfo(book);
								}}
							>
								<td>{book.author}</td>
								<td>{book.title}</td>
								<td>{book.publisher}</td>
								<td>{book.year}</td>
								<td>{book.isbn}</td>
								<td>{book.quantity}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<Modal isOpen={selectedBook !== null}>
				{selectedBook && (
					<BookInfo book={selectedBook} onClose={closeBookInfo} />
				)}
			</Modal>

			<Modal isOpen={createBookOpened}>
				<BookCreate onClose={closeBookCreate} />
			</Modal>
		</div>
	);
}

export default BooksPage;
