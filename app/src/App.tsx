import { useState } from "react"
import {
    Center,
    ChakraProvider,
    theme,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import LinkGenerator from "./components/LinkGeneratorForm"
import LinkDisplay from "./components/LinkDisplay";
import Intro from "./components/Intro";

const baseURL = 'http://localhost:8000'

const api = axios.create({
    baseURL: baseURL
})

export const App = () => {
    const [shortLink, setShortLink] = useState<string>('')

    const generateShortLink = async (link: string) => {
        const res = await api.post('/new', {
            "url": link
        })
        const newLink = baseURL.concat('/', res.data.alias)
        setShortLink(newLink)
    }

    return (
        <ChakraProvider theme={theme}>
            <Center h={'100vh'}>
                <VStack>
                    <Intro />
                    <LinkDisplay shortLink={shortLink} />
                    <LinkGenerator generateShortLink={generateShortLink} />
                </VStack>
            </Center>
        </ChakraProvider>
    )
}