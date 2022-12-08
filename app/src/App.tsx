import { useState } from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import axios from "axios";
import LinkGenerator from "./components/LinkGenerator"
import LinkDisplay from "./components/LinkDisplay";

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export const App = () => {
    const [shortLink, setShortLink] = useState<string>('')

    const generateShortLink = async (link: string) => {
        const res = await api.post('/new', {
            "url": link
        })
        setShortLink(res.data.alias)
    }

    return (
        <ChakraProvider theme={theme}>
            <LinkGenerator generateShortLink={generateShortLink} />
            <LinkDisplay shortLink={shortLink} />
        </ChakraProvider>
    )
}