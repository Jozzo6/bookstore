import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { StateEnum } from '../../../services/enums';
import bookService from '../../../services/book.service';
import UserBorrowInfo from '../../../components/UserBorrowInfo';
import PrimaryButton from '../../../components/PrimaryButton';
import Modal from '../../../components/Modal/Modal';
import BorrowBookToUser from './BorrowBookToUser';

function Borrowed({ book }) {
	const [state, setState] = useState(StateEnum.UnInitialized);
	const [borrowedList, setBorrowedList] = useState([]);
	const [isBorrowOpened, setIsBorrowOpened] = useState(false);

	useEffect(() => {
		if (state === StateEnum.UnInitialized) {
			getBorrows();
		}
	}, [state]);

	const getBorrows = async () => {
		try {
			setState(StateEnum.Loading);
			let list = await bookService.getBorrowedBooks(null, book.id, null);
			list.sort((a, b) => {
				if (a.status === b.status) {
					return new Date(b.created) - new Date(a.created);
				}
				return a.status === 'borrowed' ? -1 : 1;
			});
			setBorrowedList(list);
			setState(StateEnum.Success);
		} catch (error) {
			setState(StateEnum.Error);
		}
	};

	const onBorrowClose = (reload) => {
		if (reload) {
			getBorrows();
		}
		setIsBorrowOpened(false);
	};

	return (
		<div className='borrow-container'>
			<div className='mb-3 d-flex column justify-content-between'>
				<h5>Borrowed to:</h5>{' '}
				<PrimaryButton text='Borrow' onClick={ () => setIsBorrowOpened(true)} />
			</div>
			{state === StateEnum.Loading && <p>Loading...</p>}
			{state === StateEnum.Error && <p>Error loading borrowed list</p>}
			{state === StateEnum.Success && (
				<ul>
					{borrowedList.map((borrow) => (
						<UserBorrowInfo key={borrow.id} borrow={borrow} />
					))}
				</ul>
			)}
			<Modal isOpen={isBorrowOpened}>
				<BorrowBookToUser onClose={onBorrowClose} book={book} />
			</Modal>
		</div>
	);
}

Borrowed.propTypes = {
	book: PropTypes.object.isRequired,
};

export default Borrowed;
