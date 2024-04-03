import PropTypes from 'prop-types';
import bookService from '../services/book.service';
import { FormState } from '../services/enums';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';

function UserBorrowInfo({ borrow }) {
	const [state, setState] = useState(FormState.Idle);

	const returnBook = async () => {
		try {
			setState(FormState.Loading);
			await bookService.returnBook(borrow.id);
			borrow.status = 'returned';
			setState(FormState.Success);
		} catch (e) {
			setState(FormState.Error);
		}
	};

	return (
		<div className='card mb-2'>
			<p className='h3'>
				{borrow.user.first_name} {borrow.user.last_name}
			</p>
			<p>Borrowed: {new Date(borrow.created).toLocaleDateString()}</p>{' '}
			<p className='h5'>
				Status:{' '}
				<span
					className={
						borrow.status === 'borrowed' ? 'text-warning' : 'text-success'
					}
				>
					{borrow.status}
				</span>
			</p>
			{borrow.status === 'borrowed' && (
				<PrimaryButton
					text='Return'
					onClick={returnBook}
					disabled={state === FormState.Loading}
				/>
			)}
		</div>
	);
}

UserBorrowInfo.propTypes = {
	borrow: PropTypes.object.isRequired,
};

export default UserBorrowInfo;
