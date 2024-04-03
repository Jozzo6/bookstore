import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StateEnum } from '../../../services/enums';
import bookService from '../../../services/book.service';
import PrimaryButton from '../../../components/PrimaryButton';
import Loading from '../../../components/Loading/Loading';
import LoadingFailed from '../../../components/LoadingFailed/LoadingFailed';

function BooksToBorrow({ user, onClose }) {
	const [books, setBooks] = useState([]);
	const [state, setState] = useState(StateEnum.UnInitialized);
	const [borrowActionState, setBorrowActionState] = useState(StateEnum.Idle);
	const [errMessage, setErrMessage] = useState(null);

	useEffect(() => {
		if (state === StateEnum.UnInitialized) {
			getBooks();
		}
	}, [state]);

	const getBooks = async () => {
		try {
			setState(StateEnum.Loading);
			setBooks(await bookService.getAllBooks());
			setState(StateEnum.Success);
		} catch (error) {
			setState(StateEnum.Error);
		}
	};

	const borrowToUser = async (book) => {
		try {
			setBorrowActionState(StateEnum.Loading);
			let res = await bookService.borrowBook(book.id, user.id);
			if (!res.error) {
				setBorrowActionState(StateEnum.Success);
				onClose(true);
			}
			setErrMessage(res.error);
			setBorrowActionState(StateEnum.Error);
		} catch (e) {
			console.error(e);
			setBorrowActionState(StateEnum.Error);
		}
	};

	return (
		<div>
			<div className='d-flex column justify-content-between m-3'>
				<h5>Select user to which you`ll borrow the book</h5>
				<PrimaryButton text='Close' onClick={() => onClose(false)} />
			</div>
			{borrowActionState === StateEnum.Error && errMessage !== null && (
				<div className='alert alert-danger mt-3' role='alert'>
					{errMessage}
				</div>
			)}
			{state === StateEnum.Loading && <Loading />}
			{state === StateEnum.Error && (
				<LoadingFailed
					text='Something went wrong. Failed to load books.'
					action={getBooks}
				/>
			)}
			{state === StateEnum.Success && (
				<div>
					{books.map((book) => (
						<div
							className='d-flex column justify-content-between m-4'
							key={book.id}
						>
							<p>
								{book.title} {book.author} {book.publisher}
							</p>
							<PrimaryButton
								text='Borrow'
								disabled={borrowActionState === StateEnum.Loading}
								onClick={() => borrowToUser(book)}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

BooksToBorrow.propTypes = {
	user: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default BooksToBorrow;
