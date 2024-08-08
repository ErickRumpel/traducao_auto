import './App.css';
import { Box } from '@mui/material';
import Translate from './components/Translate';

function App() {
	return (
		<Box sx={{ alignContent: "center", textAlign: "center", justifyContent: "center" }}>
			<Translate />
		</Box>
	);
}

export default App;
