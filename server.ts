import * as dotenv from 'dotenv';
import { app } from './src';

dotenv.config();
if (require.main === module) {
	const port = parseInt(process.env.PORT || '3000', 10);
	app.listen(port);
}
