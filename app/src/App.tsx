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
    const [links, setLinks] = useState<string[][]>([])

    const generateShortLink = async (link: string) => {
        const res = await api.post('/new', {
            "url": link
        })
        const shortLink = baseURL.concat('/', res.data.alias)
        setLinks([...links, [shortLink, link]])
    }

    return (
        <ChakraProvider theme={theme}>
            <Center my={20}>
                <VStack>
                    <Intro />
                    <LinkGenerator generateShortLink={generateShortLink} />
                    <LinkDisplay links={links} />
                </VStack>
            </Center>
        </ChakraProvider>
    )
}