import PropTypes from 'prop-types';

const CustomInput = ({
	label,
	name,
	value,
	onChange,
	type = 'text',
	message,
	placeholder,
	...props
}) => {
	return (
		<div className='mb-3'>
			{label && (
				<label className='form-label' htmlFor={name}>
					{label}
				</label>
			)}
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				{...props}
				className='form-control'
			/>
			{message && <div className='form-text'>{message}</div>}
		</div>
	);
};

CustomInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	message: PropTypes.string,
};

export default CustomInput;
