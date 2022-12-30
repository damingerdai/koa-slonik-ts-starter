import { sql } from 'slonik';

// https://github.com/gajus/slonik/issues/113#issuecomment-804319594
export const toSqlDate = (input: Date) => {
	return sql`to_timestamp(${input.getTime() / 1000})`;
};
