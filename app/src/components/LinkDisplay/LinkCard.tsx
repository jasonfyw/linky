import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Link,
    Text,
    Button,
    Flex,
    Spacer,
    Center,
    useToast,
    Box,
    IconButton,
    useDisclosure
} from '@chakra-ui/react';
import {
    CopyIcon, DeleteIcon
} from '@chakra-ui/icons';
import { useCopyToClipboard } from 'usehooks-ts';
import { HiQrcode } from 'react-icons/hi';

interface LinkCardProps {
    shortLink: string,
    link: string,
    value: number,
    deleteLink: (v: number) => void
}

const LinkCard = (props: LinkCardProps) => {
    const [, copy] = useCopyToClipboard()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const copyLink = () => {
        try {
            // copy shortened link to clipboard
            copy(props.shortLink)
            // display a success toast with the copied link
            toast({
                title: 'Link copied to clipboard!',
                status: 'success',
                duration: 2000,
                isClosable: true,
                variant: 'subtle',
                position: 'bottom-left'
            })
        } catch (e) {
            // display an error toast
            toast({
                title: 'An error occurred. Please try again',
                status: 'error',
                duration: 2000,
                isClosable: true,
                variant: 'subtle',
                position: 'bottom-left'
            })
        }
    }

    const deleteLink = () => {
        props.deleteLink(props.value)
    }

    return (
        <Card>
            <Flex>
                <Box>
                    <CardHeader pb={0} pt={2}>
                        <Center>
                            <Heading size={'md'}>
                                <Link href={props.shortLink} isExternal>
                                    {props.shortLink}
                                </Link>
                            </Heading>
                        </Center>
                    </CardHeader>
                    <CardBody pt={2} pb={4}>
                        <Text>
                            <Link href={props.link} isExternal>
                                {props.link}
                            </Link>
                        </Text>
                    </CardBody>
                </Box>
                <Spacer/>
                <Center mx={4}>
                    <Button
                        colorScheme='cyan'
                        size={'sm'}
                        leftIcon={<CopyIcon />}
                        onClick={copyLink}
                    >
                        Copy
                    </Button>
                    <IconButton
                        aria-label='Delete link'
                        color='current'
                        marginLeft={2}
                        onClick={deleteLink}
                        icon={<DeleteIcon />}
                        size='sm'
                        fontSize='md'
                    />
                    <IconButton
                        aria-label='Get QR code'
                        color='current'
                        marginLeft={2}
                        onClick={onOpen}
                        icon={<HiQrcode />}
                        size='sm'
                        fontSize='xl'
                    />
                </Center>
            </Flex>
        </Card>
    );
}

export default LinkCard;