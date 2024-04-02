import { useState, useEffect, useCallback } from 'react';
import bookService from '../services/book.service.jsx';
import { StateEnum } from '../services/enums';

function BooksPage() {
	const [bookState, setBookState] = useState(StateEnum.UnInitialized);
	const [books, setBooks] = useState([]);
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
			console.log('get books - unitilized');
			getBooks();
		}
	}, [bookState, getBooks]);

	return (
		<div>
			<h1>Books Page</h1>
			{bookState === 'loading' && <p>Loading...</p>}
			{bookState === 'error' && <p>Error loading books</p>}
			{bookState === 'success' && (
				<ul>
					{books.map((book) => (
						<li key={book.id}>{book.title}</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default BooksPage;
