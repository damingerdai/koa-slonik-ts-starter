module.exports = {
	'**/*.(j|t)s?(x)': filenames => filenames.length > 10
		? 'eslint --format stylish --fix'
		: `eslint --format stylish ${filenames.join(' ')} --fix`,
	'*.{md,json,yml,js,ts}': filenames => {
		const prettier = `prettier --write -- ${filenames.join(' ')}`;
		const git = `git add ${filenames.join(' ')}`;
		return [prettier, git];
	}
};
