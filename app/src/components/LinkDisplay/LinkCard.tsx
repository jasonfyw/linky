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
    Stack,
    IconButton
} from '@chakra-ui/react';
import {
    CopyIcon, DeleteIcon
} from '@chakra-ui/icons';
import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

interface LinkCardProps {
    shortLink: string,
    link: string,
    value: string,
    deleteLink: (v: string) => void
}

const LinkCard = (props: LinkCardProps) => {
    const [, copy] = useCopyToClipboard()
    const toast = useToast()
    
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
            })
        } catch (e) {
            // display an error toast
            toast({
                title: 'An error occurred. Please try again',
                status: 'error',
                duration: 2000,
                isClosable: true,
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
                            <Heading size={'md'}><Link href={props.shortLink}>{props.shortLink}</Link></Heading>
                        </Center>
                    </CardHeader>
                    <CardBody pt={2} pb={4}>
                        <Text><Link href={props.link}>{props.link}</Link></Text>
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
                </Center>
            </Flex>
        </Card>
    );
}

export default LinkCard;