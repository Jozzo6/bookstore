import './App.css';
import LoginPage from './pages/LoginPage';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { useAuth } from './services/auth.service';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';

function App() {
	return (
		<>
			<Router>
				<AppRoutes />
			</Router>
		</>
	);
}

function AppRoutes() {
	const { authState } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (authState) {
			navigate('/');
		} else {
			navigate('/login');
		}
	}, [authState, navigate]);

	return (
		<>
			<main>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/' element={<HomePage />} />
					<Route path='*' element={<LoginPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
