import { useState, useEffect, useCallback } from 'react';
import userService from '../../services/user.service.jsx';
import { StateEnum } from '../../services/enums.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import UserInfo from './components/UserInfo.jsx';

function UserPage() {
	const [userState, setUserState] = useState(StateEnum.UnInitialized);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	const getUsers = useCallback(async () => {
		try {
			setUserState(StateEnum.Loading);
			setUsers(await userService.getAllUsers());
			setUserState(StateEnum.Success);
		} catch (e) {
			setUserState(StateEnum.Error);
		}
	}, []);

	useEffect(() => {
		if (userState === StateEnum.UnInitialized) {
			getUsers();
		}
	}, [userState, getUsers]);

	const openUserInfo = (user) => {
		setSelectedUser({ ...user });
	};

	const closeUserInfo = (user) => {
		if (user) {
			setUsers((prevUsers) =>
				prevUsers.map((u) => {
					if (u.id === user.id) {
						return user;
					}
					return u;
				})
			);
		}
		setSelectedUser(null);
	};

	return (
		<div className='container'>
			<h3 className='m-4'>Users Page</h3>
			{userState === 'loading' && <p>Loading...</p>}
			{userState === 'error' && <p>Error loading users</p>}
			{userState === 'success' && (
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>Email</th>
							<th scope='col'>First Name</th>
							<th scope='col'>Last Name</th>
							<th scope='col'>Account Type</th>
							<th scope='col'>Created</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr
								key={user.id}
								onClick={() => {
									openUserInfo(user);
								}}
							>
								<td>{user.email}</td>
								<td>{user.first_name}</td>
								<td>{user.last_name}</td>
								<td>{user.type}</td>
								<td>{user.created}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<Modal isOpen={selectedUser !== null}>
				{selectedUser && (
					<UserInfo user={selectedUser} onClose={closeUserInfo} />
				)}
			</Modal>
		</div>
	);
}

export default UserPage;
