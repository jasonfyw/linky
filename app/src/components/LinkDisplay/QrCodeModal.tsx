import {
    Box,
    Button,
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
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
                    <Center my={5}>
                        <Box bg={'white'} p={5} borderRadius={8}>
                            <QRCode value={props.shortLink} />
                        </Box>
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