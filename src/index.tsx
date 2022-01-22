import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

render(
	<BrowserRouter>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</BrowserRouter>,	
	rootElement
);
