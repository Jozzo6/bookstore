import PropTypes from 'prop-types';
import bookService from '../services/book.service';
import { FormState, MessageBoxType } from '../services/enums';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { useMessageBox } from '../components/MessageBox/MessageBox';

function BookInfoRow({
	borrow,
	showBookInfo,
	removeFromList,
	showDeleteButton = true,
	showReturnButton = true,
}) {
	const [state, setState] = useState(FormState.Idle);
	const { showMessage } = useMessageBox();

	const returnBook = async () => {
		try {
			setState(FormState.Loading);
			await bookService.returnBook(borrow.id);
			borrow.status = 'returned';
			showMessage('Book returned successfully', MessageBoxType.Success);
			setState(FormState.Success);
		} catch (e) {
			showMessage('Failed to return message', MessageBoxType.Error);
			setState(FormState.Error);
		}
	};

	const deleteBorrow = async () => {
		try {
			setState(FormState.Loading);
			await bookService.deleteBorrow(borrow.id);
			removeFromList(borrow.id);
			showMessage('Book deleted successfully', MessageBoxType.Success);
			setState(FormState.Success);
		} catch (e) {
			showMessage('Failed to delete book', MessageBoxType.Error);
			setState(FormState.Error);
		}
	};

	return (
		<tr>
			<th>
				{showBookInfo
					? `${borrow.book.title} ${borrow.book.author}`
					: `${borrow.user.first_name} ${borrow.user.last_name}`}
			</th>
			<th>{new Date(borrow.created).toLocaleDateString()}</th>
			<th>
				<span
					className={
						borrow.status === 'borrowed' ? 'text-warning' : 'text-success'
					}
				>
					{borrow.status}
				</span>
			</th>
			<th>
				{showDeleteButton && (
					<SecondaryButton
						disabled={state === FormState.Loading}
						onClick={deleteBorrow}
						text='Delete'
					/>
				)}
			</th>
			<th>
				{borrow.status === 'borrowed' && showReturnButton && (
					<PrimaryButton
						text='Return'
						onClick={returnBook}
						disabled={state === FormState.Loading}
					/>
				)}
			</th>
		</tr>
	);
}

BookInfoRow.propTypes = {
	borrow: PropTypes.object.isRequired,
	showBookInfo: PropTypes.bool.isRequired,
	removeFromList: PropTypes.func,
	showDeleteButton: PropTypes.bool,
};

export default BookInfoRow;
