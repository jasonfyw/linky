import {
    Box,
    Button,
    Center,
    Code,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';

interface QrCodeModalProps {
    isOpen: boolean,
    onClose: () => void,
    shortLink: string,
    link: string
}

const QrCodeModal = (props: QrCodeModalProps) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>QR Code</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center mb={2}>
                        <VStack>
                            <Link href={props.shortLink} mb={3}><Code>{props.link}</Code></Link>
                            <Box bg={'white'} p={5} borderRadius={8}>
                                <QRCode value={props.shortLink} />
                            </Box>
                        </VStack>
                    </Center>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default QrCodeModal;