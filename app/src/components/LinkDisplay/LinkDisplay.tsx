import React from 'react';
import {
    Container,
    Stack
} from '@chakra-ui/react';
import LinkCard from './LinkCard';
import { includeHTTP } from '../../helpers/links.helpers';

interface LinkDisplayProps {
    links: string[][]
}

const LinkDisplay = (props: LinkDisplayProps) => {
    return (
        <Container my={15}>
            <Stack>
                {
                    props.links.map(alias => (
                        <LinkCard
                            link={includeHTTP(alias[1])}
                            shortLink={includeHTTP(alias[0])}
                        />
                    ))
                }
            </Stack>
        </Container>
    );
}

export default LinkDisplay;