import { Alert, Button } from 'react-bootstrap';

const AlertMessage = ({ message, close }) => {
	return (
		<Alert variant="info">
			<Alert.Heading>{message}</Alert.Heading>
			<Button onClick={() => close(false)}>clear message</Button>
		</Alert>
	)
}

export default AlertMessage;