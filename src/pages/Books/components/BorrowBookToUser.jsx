import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../../../services/user.service';
import { StateEnum } from '../../../services/enums';
import bookService from '../../../services/book.service';
import PrimaryButton from '../../../components/PrimaryButton';

function BorrowBookToUser({ book, onClose }) {
	const [users, setUsers] = useState([]);
	const [state, setState] = useState(StateEnum.UnInitialized);
	const [borrowActionState, setBorrowActionState] = useState(StateEnum.Idle);
	const [errMessage, setErrMessage] = useState(null);

	useEffect(() => {
		if (state === StateEnum.UnInitialized) {
			getUsers();
		}
	}, [state]);

	const getUsers = async () => {
		try {
			setState(StateEnum.Loading);
			setUsers(await userService.getAllUsers());
			setState(StateEnum.Success);
		} catch (error) {
			setState(StateEnum.Error);
		}
	};

	const borrowToUser = async (user) => {
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
			{state === StateEnum.Loading && <p>Loading...</p>}
			{state === StateEnum.Error && <p>Error loading users</p>}
			{state === StateEnum.Success && (
				<div>
					{users.map((user) => (
						<div
							className='d-flex column justify-content-between m-4'
							key={user.id}
						>
							<p>
								{user.first_name} {user.last_name}
							</p>
							<PrimaryButton
								text='Borrow'
								disabled={borrowActionState === StateEnum.Loading}
								onClick={() => borrowToUser(user)}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

BorrowBookToUser.propTypes = {
	book: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default BorrowBookToUser;
