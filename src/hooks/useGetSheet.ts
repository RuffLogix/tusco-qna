import axios from "axios";
import { useEffect, useState } from "react";
import { question } from "../interfaces/question.interface";
import createUrl from "../services/createUrl";

const useGetSheet = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<question[]>([]);

	useEffect(() => {
		(async () => {
			const gsKey = "1Ga5LqToH5gC10Phmp2N_Q5qnapWHVL3JYmcJYT4v4Kc";
			const gql = "*";
			const url = createUrl(gsKey, gql);

			const res = await axios.get(url);
			const responseText = res.data;
			const resData = JSON.parse(
				responseText.match(/(?<=.*\().*(?=\);)/s)[0]
			).table.rows;
			//console.log(resData);

			const helper: question[] = [];

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resData.forEach((row: { c: any[] }) => {
				const col = row.c;
				const timestamp = col[0].f;
				const author = col[1].v;
				const question = col[2].v;
				const tags = col[3].v;
				const answer = col[4].v;
				helper.push({ timestamp, question, tags, answer, author });
			});

			setData(helper);
			setLoading(false);
		})();
	}, [data]);

	return { data, loading };
};

export default useGetSheet;
