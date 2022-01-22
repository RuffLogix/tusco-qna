/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Badge,
	Container,
	Grid,
	GridItem,
	Heading,
	Select,
	SimpleGrid,
	Spinner,
	Text,
	Wrap,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import useGetSheet from "../hooks/useGetSheet";
import { question } from "../interfaces/question.interface";
import QuestionCard from "../components/QuestionCard";

const Home = () => {
	const { data, loading } = useGetSheet();

	const handlefilter = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		return;
	};

	return (
		<Container className="container-box" maxW="container.lg">
			<Heading mt={10}>Q&A : Thailand Upper Southern Computing Olympiad</Heading>
			<Text mt={3}>
				ส่งคำถามมาได้ที่ :{" "}
				<Badge colorScheme="pink">
					<a
						target="_blank"
						href="https://forms.gle/SNeQzmrYAnF7WWbB8"
						color="purple"
						rel="noreferrer"
					>
						Q&A Form !!!
					</a>
				</Badge>
			</Text>
			<Select
				placeholder="--Select tags--"
				className="select-box"
				name="a"
				onSelect={handlefilter}
				mt={5}
			>
				<option value="Mathematics">Mathematics</option>
				<option value="Basic Programming">Basic Programming</option>
				<option value="Time Complexity">Time Complexity</option>
				<option value="Recursion">Recursion</option>
				<option value="Data Structure">Data Structure</option>
				<option value="Greedy Algorithm">Greedy Algorithms</option>
				<option value="State Space Search">State Space Search</option>
			</Select>
			<SimpleGrid columns={3} spacing={3} mt={10}>
				{loading ? (
					<Spinner />
				) : (
					data.map((question: question, idx: number) => (
						<QuestionCard key={idx} data={question} />
					))
				)}
			</SimpleGrid>
		</Container>
	);
};

export default Home;
