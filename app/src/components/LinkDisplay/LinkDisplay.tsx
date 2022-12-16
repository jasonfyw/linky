import {
    Center,
    Container,
    Link,
    Stack
} from '@chakra-ui/react';
import LinkCard from './LinkCard';
import { includeHTTP } from '../../helpers/links.helpers';
import { ILinkPair } from '../../types';

interface LinkDisplayProps {
    links: Record<number, ILinkPair>,
    deleteLink: (v: string) => void,
    clearHistory: () => void
}

const LinkDisplay = (props: LinkDisplayProps) => {
    const linkCards = Object.entries(props.links).map(([k, v]) => (
        <LinkCard
            key={k}
            value={k}
            link={includeHTTP(v.link)}
            shortLink={includeHTTP(v.shortLink)}
            deleteLink={props.deleteLink}
        />
    ))

    return (
        <Container my={15} pt={10}>
            <Stack>
                { linkCards }
            </Stack>
            {
                linkCards.length > 0 && (
                    <Center py={4}>
                        <Link
                            textDecor={'underline'}
                            fontSize={12}
                            onClick={props.clearHistory}
                        >
                            Clear history
                        </Link>
                    </Center>
                )
            }
        </Container>
    );
}

export default LinkDisplay;