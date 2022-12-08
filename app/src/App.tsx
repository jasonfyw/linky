import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import LinkGenerator from "./components/LinkGenerator"

export const App = () => (
    <ChakraProvider theme={theme}>
        <LinkGenerator />
    </ChakraProvider>
)
    