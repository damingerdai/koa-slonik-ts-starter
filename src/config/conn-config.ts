export const connConfig = {
	user: process.env.POSTGRES_USER ?? 'postgres',
	password: process.env.POSTGRES_PASSWORD ?? '12345',
	port: process.env.POSTGRES_PORT
		? parseInt(process.env.POSTGRES_PORT, 10)
		: 5432,
	host: process.env.POSTGRES_HOST ?? 'localhost',
	db: process.env.POSTGRES_DB ?? 'postgres',
	connectionTimeout:
		parseInt(process.env.POSTGRES_CONNECTION_TIMEOUT, 10) ?? 5000,
	statementTimeout:
		parseInt(process.env.POSTGRES_STATEMENT_TIMEOUT, 10) ?? 60000,
	idleTimeout: parseInt(process.env.POSTGRES_IDLE_TIMEOUT, 10) ?? 5000,
	maximumPoolSize: parseInt(process.env.POSTGRES_MAXIMUM_POOL_SIZE, 10) ?? 10,
	postgresReportingEnabled: process.env.POSTGRES_MAXIMUM_POOL_SIZE === 'true'
};
