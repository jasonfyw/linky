import {
    Container,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import React, { useState } from 'react';

const LinkGenerator = () => {
    const [inputLink, setInputLink] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { setInputLink(e.target.value) }

    return (
        <Container>
            <FormControl>
                <FormLabel>Link</FormLabel>
                <Input value={ inputLink } onChange={handleInputChange} />
            </FormControl>
        </Container>
    );
}

export default LinkGenerator;