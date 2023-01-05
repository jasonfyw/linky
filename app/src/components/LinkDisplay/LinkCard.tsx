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
import QrCodeModal from './QrCodeModal';
import { copySuccessToast, errorToast } from '../global/Toasts';

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
            copySuccessToast({ toast: toast })
        } catch (e) {
            // display an error toast
            errorToast({ toast: toast })
        }
    }

    const deleteLink = () => {
        props.deleteLink(props.value)
    }

    return (
        <>
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
                        <IconButton
                            aria-label='Delete link'
                            color='current'
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
                        <Button
                            colorScheme='cyan'
                            marginLeft={2}
                            size={'sm'}
                            leftIcon={<CopyIcon />}
                            onClick={copyLink}
                        >
                            Copy
                        </Button>
                    </Center>
                </Flex>
            </Card>

            <QrCodeModal
                isOpen={isOpen}
                onClose={onClose}
                shortLink={props.shortLink}
                link={props.link}
            />
        </>
    );
}

export default LinkCard;