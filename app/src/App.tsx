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
import { ILinkPair } from "./types";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

const baseURL = 'https://lnky.to'

const api = axios.create({
    baseURL: baseURL
})


export const App = () => {
    const [, copy] = useCopyToClipboard()
    const [links, setLinks] = useLocalStorage<ILinkPair[]>('links', [])
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

            // extract all keys and find the maximum + 1 to use as the new key
            const keys = links.map(link => link.key)
            const newKey = keys.length !== 0 ? Math.max(...keys) + 1 : 0
            // append links to state
            const newLinkPair: ILinkPair = {
                key: newKey,
                shortLink: shortLink,
                link: link
            }
            setLinks(links => ([...links, newLinkPair]))
            // display a success toast with the copied link
            toast({
                title: 'Shortened link copied to clipboard!',
                description: <Link href={shortLink}>{ shortLink }</Link>,
                status: 'success',
                duration: 9000,
                isClosable: true,
                variant: 'subtle',
                position: 'bottom-left'
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
                
                position: 'bottom-left'
            })
        }
    }

    const deleteLink = (v: number) => {
        setLinks(prevLinks => {
            return prevLinks.filter(l => l.key !== v)
        })
        toast({
            title: 'Link deleted',
            status: 'info',
            duration: 2000,
            isClosable: true,
            variant: 'subtle',
            position: 'bottom-left'
        })
    }

    const clearHistory = () => {
        setLinks([])
        toast({
            title: 'All links cleared',
            status: 'info',
            duration: 2000,
            isClosable: true,
            variant: 'subtle',
            position: 'bottom-left'
        })
    }

    return (
        <ChakraProvider theme={theme}>
            <ColorModeSwitcher position={'fixed'} top={10} right={10} />
            <Center my={20}>
                <VStack>
                    <Intro />
                    <LinkGenerator generateShortLink={generateShortLink} />
                    <LinkDisplay
                        links={links}
                        deleteLink={deleteLink}
                        clearHistory={clearHistory}
                    />
                </VStack>
            </Center>
        </ChakraProvider>
    )
}