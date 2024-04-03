import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BooksPage from './Books/BooksPage';
import UsersPage from './Users/UsersPage';
import HomeUserInfo from './HomeUserInfo';
import UserInfo from './Users/components/UserInfo';

function HomePage() {
	return (
		<div className='main-container'>
			<NavigationBar />
			<Routes>
				<Route path='/' element={<HomeUserInfo />} />
				<Route path='/books' element={<BooksPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/users/:id' element={<UserInfo />} />
			</Routes>
		</div>
	);
}

export default HomePage;
