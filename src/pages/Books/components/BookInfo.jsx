import PropTypes from 'prop-types';
import { useState } from 'react';
import bookService from '../../../services/book.service';
import CustomInput from '../../../components/CustomInput';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { FormState, MessageBoxType } from '../../../services/enums';
import BorrowedListByBook from './BorrowedListByBook';
import { useMessageBox } from '../../../components/MessageBox/MessageBox';

function BookInfo({ book, onClose }) {
	const [b, setBook] = useState(book);
	const [state, setState] = useState(FormState.Idle);
	const { showMessage } = useMessageBox();

	const update = async (e) => {
		try {
			setState(FormState.Loading);
			e.preventDefault();
			await bookService.updateBook(b);
			showMessage('Book updated successfully', MessageBoxType.Success);
			setState(FormState.Success);
		} catch (e) {
			setState(FormState.Error);
			showMessage('Failed to update book', MessageBoxType.Error);
		}
	};

	const close = () => {
		if (state === FormState.Loading) {
			return;
		} else if (state === FormState.Idle) {
			onClose(null);
		} else if (state === FormState.Success) {
			onClose(b);
		} else if (state === FormState.Error || state === FormState.Edited) {
			if (window.confirm('Are you sure you want to discard changes?')) {
				onClose(null);
			}
		}
	};

	return (
		<div>
			<div className='d-flex column justify-content-between'>
				<h3>Book Info </h3>
				<SecondaryButton
					text='Close'
					disabled={state === FormState.Loading}
					onClick={close}
				/>
			</div>
			<div className='d-flex row justify-content-evenly'>
				<form onSubmit={update} className='mb-3'>
					<CustomInput
						label='Author'
						name='author'
						value={b.author}
						onChange={(e) => {
							setBook({ ...b, author: e.target.value });
							setState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='Title'
						name='title'
						value={b.title}
						onChange={(e) => {
							setBook({ ...b, title: e.target.value });
							setState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='Publisher'
						name='publisher'
						value={b.publisher}
						onChange={(e) => {
							setBook({ ...b, publisher: e.target.value });
							setState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='Year Published'
						name='year'
						value={b.year}
						onChange={(e) => {
							setBook({ ...b, year: e.target.value });
							setState(FormState.Edited);
						}}
						type='number'
					/>
					<CustomInput
						label='ISBN'
						name='isbn'
						value={b.isbn}
						onChange={(e) => {
							setBook({ ...b, isbn: e.target.value });
							setState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='Quantity'
						name='quantity'
						value={b.quantity}
						onChange={(e) => {
							setBook({ ...b, quantity: e.target.value });
							setState(FormState.Edited);
						}}
						type='number'
					/>
					<div className='d-flex row'>
						<PrimaryButton
							type='submit'
							disabled={state === FormState.Loading}
							text='Update'
							onClick={update}
						/>
					</div>
				</form>
				<BorrowedListByBook book={b} />
			</div>
		</div>
	);
}

BookInfo.propTypes = {
	book: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default BookInfo;
