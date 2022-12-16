import React from 'react';
import {
    Container,
    Stack
} from '@chakra-ui/react';
import LinkCard from './LinkCard';
import { includeHTTP } from '../../helpers/links.helpers';
import { ILinkPair } from '../../types';

interface LinkDisplayProps {
    links: Record<number, ILinkPair>,
    deleteLink: (v: string) => void
}

const LinkDisplay = (props: LinkDisplayProps) => {
    return (
        <Container my={15}>
            <Stack>
                {
                    Object.entries(props.links).map(([k, v]) => (
                        <LinkCard
                            key={k}
                            value={k}
                            link={includeHTTP(v.link)}
                            shortLink={includeHTTP(v.shortLink)}
                            deleteLink={props.deleteLink}
                        />
                    ))
                }
            </Stack>
        </Container>
    );
}

export default LinkDisplay;