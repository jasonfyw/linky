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
    useToast
} from '@chakra-ui/react';
import {
    CopyIcon
} from '@chakra-ui/icons';
import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

interface LinkCardProps {
    shortLink: string,
    link: string
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

    return (
        <Card>
            <CardHeader pb={0} pt={2}>
                <Flex>
                    <Center>
                        <Heading size={'md'}><Link href={props.shortLink}>{props.shortLink}</Link></Heading>
                    </Center>
                    <Spacer/>
                    <Button
                        colorScheme='cyan'
                        size={'sm'}
                        leftIcon={<CopyIcon/>}
                        onClick={copyLink}
                    >
                        Copy
                    </Button>
                </Flex>
            </CardHeader>
            <CardBody pt={2} pb={4}>
                <Text><Link href={props.link}>{props.link}</Link></Text>
            </CardBody>
        </Card>
    );
}

export default LinkCard;

function toast(arg0: { title: string; description: JSX.Element; status: string; duration: number; isClosable: boolean; }) {
    throw new Error('Function not implemented.');
}
