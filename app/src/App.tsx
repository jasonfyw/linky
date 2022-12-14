import { useState } from "react"
import {
    Center,
    ChakraProvider,
    theme,
    useToast,
    VStack,
    Link
} from "@chakra-ui/react";
import axios from "axios";
import { useCopyToClipboard } from "usehooks-ts";
import LinkGenerator from "./components/LinkGeneratorForm"
import LinkDisplay from "./components/LinkDisplay";
import Intro from "./components/Intro";

const baseURL = 'http://localhost:8000'

const api = axios.create({
    baseURL: baseURL
})

export const App = () => {
    const [, copy] = useCopyToClipboard()
    const [links, setLinks] = useState<string[][]>([])
    const toast = useToast()

    const generateShortLink = async (link: string) => {
        try {
            const res = await api.post('/new', {
                "url": link
            })
            const shortLink = baseURL.concat('/', res.data.alias)
            copy(shortLink)

            setLinks([...links, [shortLink, link]])
            toast({
                title: 'Shortened link copied to clipboard!',
                description: <Link href={shortLink}>{ shortLink }</Link>,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (e) {
            let message
            if (e instanceof Error) message = e.message
            else message = String(e)
            toast({
                title: 'An error occurred. Please try again',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
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