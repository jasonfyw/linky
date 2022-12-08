import React from 'react';
import {
    Container,
    Text
} from '@chakra-ui/react';

interface LinkDisplayProps {
    shortLink: string
}

const LinkDisplay = (props: LinkDisplayProps) => {
    return (
        <Container>
            <Text>{ props.shortLink }</Text>
        </Container>
    );
}

export default LinkDisplay;