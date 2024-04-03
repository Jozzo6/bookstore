import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';

function LoadingFailed({ text, action }) {
	return (
		<div>
			<h3 className='danger'>{text}</h3>
			{action && <PrimaryButton onClick={action} text='Try Again' />}
		</div>
	);
}

LoadingFailed.propTypes = {
	text: PropTypes.string,
	action: PropTypes.func,
};

export default LoadingFailed;
