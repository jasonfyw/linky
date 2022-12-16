import {
    Center,
    ChakraProvider,
    theme,
    useToast,
    VStack,
    Link
} from "@chakra-ui/react";
import axios from "axios";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";
import LinkGenerator from "./components/LinkGeneratorForm"
import LinkDisplay from "./components/LinkDisplay";
import Intro from "./components/Intro";

const baseURL = 'http://localhost:8000'

const api = axios.create({
    baseURL: baseURL
})

export const App = () => {
    const [, copy] = useCopyToClipboard()
    const [links, setLinks] = useLocalStorage<string[][]>('links', [])
    const toast = useToast()

    /**
     * Generates shortened link from a user-inputted URL, copies to clipboard,
     * and displays a toast
     * @param link 
     */
    const generateShortLink = async (link: string) => {
        try {
            // make POST request to API to create a new shortened URL alias
            const res = await api.post('/new', {
                "url": link
            })
            // generate the full shortened link
            const shortLink = baseURL.concat('/', res.data.alias)
            // copy shortened link to clipboard
            copy(shortLink)
            // append links to state
            // TODO: use local storage to persist across session
            setLinks([...links, [shortLink, link]])
            // display a success toast with the copied link
            toast({
                title: 'Shortened link copied to clipboard!',
                description: <Link href={shortLink}>{ shortLink }</Link>,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (e) {
            // catch and extract message from error
            let message
            if (e instanceof Error) message = e.message
            else message = String(e)
            // display an error toast
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