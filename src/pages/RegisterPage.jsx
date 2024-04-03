import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../services/auth.service';
import SecondaryButton from '../components/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useMessageBox } from '../components/MessageBox/MessageBox';
import { MessageBoxType } from '../services/enums';

function RegisterPage() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const { showMessage } = useMessageBox();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');

	const registerAction = async (e) => {
		e.preventDefault();
		try {
			await register(email, password, first_name, last_name);
			navigate('/');
		} catch (error) {
			showMessage('Failed to register', MessageBoxType.Error);
		}
	};

	const isValid = () => {
		return email !== '' && password.length >= 8;
	};

	return (
		<div className='container'>
			<h1 className='h1 mb-5'>Register Page</h1>
			<div className='card'>
				<div className='card-body'>
					<form onSubmit={registerAction} className='mb-3'>
						<CustomInput
							label='First Name'
							name='first_name'
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
							type='text'
							placeholder='First Name'
						/>
						<CustomInput
							label='Last Name'
							name='last_name'
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
							type='text'
							placeholder='First Name'
						/>
						<CustomInput
							label='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='Email'
						/>
						<CustomInput
							label='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							placeholder='Password'
							obscure='true'
							message={'Password must be at least 6 characters'}
						/>
						<PrimaryButton
							type='submit'
							text='Register'
							onClick={registerAction}
							disabled={!isValid()}
						/>
					</form>
					<SecondaryButton text='Login' onClick={() => navigate('/login')} />
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
