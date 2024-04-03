import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { StateEnum } from '../../../services/enums';
import bookService from '../../../services/book.service';
import PrimaryButton from '../../../components/PrimaryButton';
import Modal from '../../../components/Modal/Modal';
import BookInfoRow from '../../../components/BorrowInfoRow';
import BooksToBorrow from './BooksToBorrow';
import Loading from '../../../components/Loading/Loading';
import LoadingFailed from '../../../components/LoadingFailed/LoadingFailed';

function BorrowedListByUser({ user }) {
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
			let list = await bookService.getBorrowedBooks(user.id, null, null);
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

	const removeFromList = (borrowId) => {
		setBorrowedList((prevList) =>
			prevList.filter((borrow) => borrow.id !== borrowId)
		);
	};

	return (
		<div className='borrow-container'>
			<div className='mb-3 d-flex column justify-content-between'>
				<h5>Borrowed books:</h5>{' '}
				<PrimaryButton
					text='Borrow book'
					onClick={() => setIsBorrowOpened(true)}
				/>
			</div>
			{state === StateEnum.Loading && <Loading />}
			{state === StateEnum.Error && (
				<LoadingFailed
					text='Something went wrong. Failed to load borrowed books.'
					action={getBorrows}
				/>
			)}
			{state === StateEnum.Success && (
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>Name</th>
							<th scope='col'>Date Borrowed</th>
							<th scope='col'>Status</th>
							<th scope='col'></th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{borrowedList.map((borrow) => (
							<BookInfoRow
								key={borrow.id}
								borrow={borrow}
								showBookInfo={true}
								removeFromList={removeFromList}
							/>
						))}
					</tbody>
				</table>
			)}
			<Modal isOpen={isBorrowOpened}>
				<BooksToBorrow onClose={onBorrowClose} user={user} />
			</Modal>
		</div>
	);
}

BorrowedListByUser.propTypes = {
	user: PropTypes.object.isRequired,
};

export default BorrowedListByUser;
