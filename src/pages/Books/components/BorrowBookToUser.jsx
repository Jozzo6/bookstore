import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../../../services/user.service';
import { MessageBoxType, StateEnum } from '../../../services/enums';
import bookService from '../../../services/book.service';
import PrimaryButton from '../../../components/PrimaryButton';
import Loading from '../../../components/Loading/Loading';
import LoadingFailed from '../../../components/LoadingFailed/LoadingFailed';
import { useMessageBox } from '../../../components/MessageBox/MessageBox';

function BorrowBookToUser({ book, onClose }) {
	const [users, setUsers] = useState([]);
	const [state, setState] = useState(StateEnum.UnInitialized);
	const [borrowActionState, setBorrowActionState] = useState(StateEnum.Idle);
	const { showMessage } = useMessageBox();

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
			await bookService.borrowBook(book.id, user.id);
			showMessage('Book borrowed successfully', MessageBoxType.Success);
			setBorrowActionState(StateEnum.Error);
		} catch (e) {
			console.log('hello there koji kurac pas mater');
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
				<PrimaryButton text='Close' onClick={() => onClose(false)} />
			</div>
			{state === StateEnum.Loading && <Loading />}
			{state === StateEnum.Error && (
				<LoadingFailed
					text='Something went wrong. Failed to load users.'
					action={getUsers}
				/>
			)}
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
