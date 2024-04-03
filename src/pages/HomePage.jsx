import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BooksPage from './Books/BooksPage';
import UsersPage from './Users/UsersPage';
import HomeUserInfo from './HomeUserInfo';
import UserInfoPage from './Users/UserInfoPage';

function HomePage() {
	return (
		<div className='main-container'>
			<NavigationBar />
			<Routes>
				<Route path='/' element={<HomeUserInfo />} />
				<Route path='/books' element={<BooksPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/users/:id' element={<UserInfoPage />} />
			</Routes>
		</div>
	);
}

export default HomePage;
