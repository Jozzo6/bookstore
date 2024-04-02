import PropTypes from 'prop-types';
import { useState } from 'react';
import bookService from '../../../services/book.service';
import CustomInput from '../../../components/CustomInput';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { UpdateState } from '../../../services/enums';

function BookInfo({ book, onClose }) {
	const [b, setBook] = useState(book);
	const [state, setState] = useState(UpdateState.Idle);
	const [errMessage, setErrMessage] = useState(null);

	const update = async (e) => {
		try {
			setErrMessage(null);
			setState(UpdateState.Loading);
			e.preventDefault();
			await bookService.updateBook(b);
			setState(UpdateState.Updated);
		} catch (e) {
			setState(UpdateState.Error);
			setErrMessage(e.message);
		}
	};

	const close = () => {
		if (state === UpdateState.Loading) {
			return;
		} else if (state === UpdateState.Idle) {
			onClose(null);
		} else if (state === UpdateState.Updated) {
			onClose(b);
		} else if (state === UpdateState.Error || state === UpdateState.Edited) {
			if (window.confirm('Are you sure you want to discard changes?')) {
				onClose(null);
			}
		}
	};

	return (
		<div>
			<div className='d-flex column justify-content-between'>
				<h3>Book Info </h3>
				<SecondaryButton text='Close' onClick={close} />
			</div>
			<form onSubmit={update}>
				<CustomInput
					label='Author'
					name='author'
					value={b.author}
					onChange={(e) => {
						setBook({ ...b, author: e.target.value });
						setState(UpdateState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='Title'
					name='title'
					value={b.title}
					onChange={(e) => {
						setBook({ ...b, title: e.target.value });
						setState(UpdateState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='Publisher'
					name='publisher'
					value={b.publisher}
					onChange={(e) => {
						setBook({ ...b, publisher: e.target.value });
						setState(UpdateState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='Year Published'
					name='year'
					value={b.year}
					onChange={(e) => {
						setBook({ ...b, year: e.target.value });
						setState(UpdateState.Edited);
					}}
					type='number'
				/>
				<CustomInput
					label='ISBN'
					name='isbn'
					value={b.isbn}
					onChange={(e) => {
						setBook({ ...b, isbn: e.target.value });
						setState(UpdateState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='Quantity'
					name='quantity'
					value={b.quantity}
					onChange={(e) => {
						setBook({ ...b, quantity: e.target.value });
						setState(UpdateState.Edited);
					}}
					type='text'
				/>
				<div className='d-flex row'>
					<PrimaryButton type='submit' text='Update' onClick={update} />
				</div>
				{state === UpdateState.Error && errMessage && (
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
