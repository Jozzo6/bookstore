import { NavLink } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { useAuth } from '../services/auth.service';

function NavigationBar() {
	const { logout, hasAccess } = useAuth();

	return (
		<nav className='navbar  bg-body-tertiary p-5 d-flex flex-column'>
			<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
				<li className='nav-item'>
					<NavLink activeClassName='active' className='nav-link' to='/home'>
						Home
					</NavLink>
				</li>
				{hasAccess(2) && (
					<li className='nav-item'>
						<NavLink activeClassName='active' className='nav-link' to='/books'>
							Books
						</NavLink>
					</li>
				)}
				{hasAccess(2) && (
					<li className='nav-item'>
						<NavLink activeClassName='active' className='nav-link' to='/users'>
							Users
						</NavLink>
					</li>
				)}
			</ul>
			<PrimaryButton text='Logout' onClick={logout} />
		</nav>
	);
}

export default NavigationBar;
