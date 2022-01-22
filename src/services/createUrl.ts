const createUrl = (key: string, gql: string): string => {
	const gq = "SELECT " + gql;
	const encodedgg = encodeURIComponent(gq);
	const url =
		"https://docs.google.com/spreadsheets/d/" +
		key +
		"/gviz/tq?tq=" +
		encodedgg;
	return url;
};

export default createUrl;