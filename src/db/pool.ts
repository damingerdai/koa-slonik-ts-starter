import { createMockPool, createMockQueryResult, createPool } from 'slonik';
import { createInterceptors } from 'slonik-interceptor-preset';
import { connConfig } from '../config';

const mockDb = createMockPool({
	// eslint-disable-next-line require-await
	query: async () => createMockQueryResult([])
});
const isSSL = process.env.POSTGRES_SSL === 'true';
const {
	user,
	password,
	host,
	port,
	db: dbName,
	connectionTimeout,
	statementTimeout,
	idleTimeout,
	maximumPoolSize,
	postgresReportingEnabled
} = connConfig;
const connectStr = `postgres://${user}:${password}@${host}:${port}/${dbName}?ssl=${
	isSSL ? '1' : '0'
}`;
const clientConfiguration = {
	connectionTimeout,
	statementTimeout,
	idleTimeout,
	maximumPoolSize,
	interceptors: [...createInterceptors()],
	// Default pg-node type parsers work fine
	typeParsers: [
		{
			name: 'numeric',
			parse: value => {
				return value === null ? value : Number(value);
			}
		}
	]
};

export const db = postgresReportingEnabled
	? createPool(connectStr, clientConfiguration)
	: mockDb;
