import * as http from 'http';
import * as dotenv from 'dotenv';
import { app } from './src';

dotenv.config();
if (require.main === module) {
	const port = parseInt(process.env.PORT || '3000', 10);
	const server = http.createServer(app.callback());
	const gracefulShutdown = (msg: string) => {
		console.info(`Shutdown initiated: ${msg}`);
		server.close(() => {
			console.info('Shutting down...');
			process.exit();
		});
	};
	server.listen(port, '0.0.0.0', () => {
		console.log(`Running on port: ${port}`);

		// Handle kill commands
		process.on('SIGTERM', gracefulShutdown);

		// Handle interrupts
		process.on('SIGINT', gracefulShutdown);

		// Prevent dirty exit on uncaught exceptions:
		process.on('uncaughtException', gracefulShutdown);

		// Prevent dirty exit on unhandled promise rejection
		process.on('unhandledRejection', gracefulShutdown);
	});
}
