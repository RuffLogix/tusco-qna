import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { question } from "../interfaces/question.interface";
import {HiUserCircle} from "react-icons/hi";
interface Props {
	data: question;
}

const QuestionCard = ({data}: Props) => {
	const { question, answer, tags, author, timestamp } = data;

	return (
		<Box experimental_spaceY={5} p={6} borderWidth={1} borderColor="gray.200" rounded="lg">
			<Badge colorScheme={"purple"}>{tags}</Badge>
			<Heading as="h2" size="md">{question}</Heading>
			<Text>{answer}</Text>
			<HStack mt={10}>
				<HiUserCircle size={36} />
				<div >
					<Text  textAlign={"left"} fontSize={"xs"}>{author}</Text>
					<Text  textAlign={"left"} fontSize={"xs"}>{timestamp}</Text>
				</div>
			</HStack>
		</Box>
	);
};

export default QuestionCard;
