/* eslint-disable callback-return, no-use-before-define */
import { db } from './pool';
import * as cls from 'cls-hooked';
import {
	DatabaseConnectionType,
	DatabaseTransactionConnectionType
} from 'slonik';

const DB_CONTEXT_NAMESPACE = 'database';
const CONNECTION_KEY = 'connection';
const TRANSACTION_KEY = 'transaction';

export const withTransaction = async (next: () => Promise<any>) => {
	const dbNameSpace =
		cls.getNamespace(DB_CONTEXT_NAMESPACE) ??
		cls.createNamespace(DB_CONTEXT_NAMESPACE);

	const transaction = dbNameSpace.get(TRANSACTION_KEY);
	if (transaction) {
		console.log('\n transaction found \n');
		await next();
	} else {
		console.log('\n no transaction found, starting a new one \n');
		await dbNameSpace.runAndReturn(async () => {
			await dbInstance().transaction(async t => {
				dbNameSpace.set(TRANSACTION_KEY, t);
				await next();
			});
		});
	}
};

export const withConnection = async (next: () => Promise<any>) => {
	const dbNameSpace =
		cls.getNamespace(DB_CONTEXT_NAMESPACE) ??
		cls.createNamespace(DB_CONTEXT_NAMESPACE);

	const connection = dbNameSpace.get(CONNECTION_KEY);
	if (connection) {
		console.log('\n connection found \n');
		await next();
	} else {
		console.log('\n no connection found, starting a new one \n');
		await dbNameSpace.runAndReturn(async () => {
			await db.connect(async conn => {
				dbNameSpace.set(CONNECTION_KEY, conn);
				await next();
			});
		});
	}
};

export const dbInstance = () => {
	const ns = cls.getNamespace(DB_CONTEXT_NAMESPACE);
	if (ns) {
		const transaction: DatabaseTransactionConnectionType =
			ns.get(TRANSACTION_KEY);
		if (transaction) {
			return transaction;
		}

		const connection: DatabaseConnectionType = ns.get(CONNECTION_KEY);
		if (connection) {
			return connection;
		}
		return db;
	}
	return db;
};
