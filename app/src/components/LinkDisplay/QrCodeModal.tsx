import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

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
                    Insert qr code
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