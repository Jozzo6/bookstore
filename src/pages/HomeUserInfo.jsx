import bookService from '../services/book.service';
import { useAuth } from '../services/auth.service';
import { useEffect, useState } from 'react';
import { StateEnum } from '../services/enums';
import BookInfoRow from '../components/BorrowInfoRow';

function HomeUserInfo() {
	const [borrowedBooks, setBorrows] = useState([]);
	const [state, setState] = useState(StateEnum.UnInitialized);

	const { authValue } = useAuth();

	useEffect(() => {
		if (state === StateEnum.UnInitialized) {
			getBorrows();
		}
	});

	const getBorrows = async () => {
		try {
			setState(StateEnum.Loading);
			setBorrows(
				await bookService.getBorrowedBooks(authValue.user.id, null, null)
			);
			setState(StateEnum.Success);
		} catch (e) {
			setState(StateEnum.Error);
		}
	};

	return (
		<div>
			<h1>Home</h1>

			{state === StateEnum.Loading && <p>Loading...</p>}
			{state === StateEnum.Error && <p>Error loading borrowed books</p>}
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
						{borrowedBooks.map((borrow) => (
							<BookInfoRow
								key={borrow.id}
								borrow={borrow}
								showBookInfo={true}
								showDeleteButton={false}
								removeFromList={() => {}}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default HomeUserInfo;
