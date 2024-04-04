import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MessageBoxType, StateEnum } from '../../../services/enums';
import bookService from '../../../services/book.service';
import PrimaryButton from '../../../components/PrimaryButton';
import Loading from '../../../components/Loading/Loading';
import LoadingFailed from '../../../components/LoadingFailed/LoadingFailed';
import { useMessageBox } from '../../../components/MessageBox/MessageBox';

function BooksToBorrow({ user, onClose }) {
	const [books, setBooks] = useState([]);
	const [state, setState] = useState(StateEnum.UnInitialized);
	const [borrowActionState, setBorrowActionState] = useState(StateEnum.Idle);
	const [reload, setReload] = useState(false);
	const { showMessage } = useMessageBox();

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
		} catch (e) {
			setState(StateEnum.Error);
		}
	};

	const borrowToUser = async (book) => {
		try {
			setBorrowActionState(StateEnum.Loading);
			await bookService.borrowBook(book.id, user.id);
			showMessage('Book borrowed successfully', MessageBoxType.Success);
			setReload(true);
			setBorrowActionState(StateEnum.Error);
		} catch (e) {
			showMessage(
				'Failed to borrow book: ' + e.toString(),
				MessageBoxType.Error
			);
			setBorrowActionState(StateEnum.Error);
		}
	};

	return (
		<div>
			<div className='d-flex column justify-content-between m-3'>
				<h5>Select user to which you`ll borrow the book</h5>
				<PrimaryButton text='Close' onClick={() => onClose(reload)} />
			</div>
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
