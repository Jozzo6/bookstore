import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SecondaryButton({ text, onClick, disabled = false }) {
	return (
		<Button variant='secondary' onClick={onClick} disabled={disabled}>
			{text}
		</Button>
	);
}

SecondaryButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default SecondaryButton;
