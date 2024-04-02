import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PrimaryButton({ text, onClick, disabled = false }) {
	return (
		<Button variant='primary' onClick={onClick} disabled={disabled}>
			{text}
		</Button>
	);
}

PrimaryButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default PrimaryButton;
