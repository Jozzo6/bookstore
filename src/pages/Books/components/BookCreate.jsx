import PropTypes from 'prop-types';
import { useState } from 'react';
import bookService from '../../../services/book.service';
import CustomInput from '../../../components/CustomInput';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { FormState } from '../../../services/enums';

function BookInfo({ onClose }) {
	const [b, setBook] = useState({
		author: '',
		title: '',
		publisher: '',
		year: null,
		isbn: '',
		quantity: '',
	});
	const [state, setState] = useState(FormState.Idle);
	const [errMessage, setErrMessage] = useState(null);

	const create = async (e) => {
		try {
			setErrMessage(null);
			setState(FormState.Loading);
			e.preventDefault();
			let book = await bookService.createBook(b);
			setState(FormState.Success);
			onClose(book);
		} catch (e) {
			setState(FormState.Error);
			setErrMessage(e.message);
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

	const isValid = () => {
		return b.author && b.title && b.publisher && b.year && b.isbn && b.quantity;
	};

	return (
		<div>
			<div className='d-flex column justify-content-between'>
				<h3>Book Create </h3>
				<SecondaryButton
					text='Close'
					disabled={state === FormState.Loading}
					onClick={close}
				/>
			</div>
			<form onSubmit={create}>
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
						disabled={state === FormState.Loading || !isValid()}
						text='Create'
						onClick={create}
					/>
				</div>
				{state === FormState.Error && errMessage && (
					<div className='alert alert-danger mt-3' role='alert'>
						{errMessage || 'An error occurred'}
					</div>
				)}
			</form>
		</div>
	);
}

BookInfo.propTypes = {
	book: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default BookInfo;
