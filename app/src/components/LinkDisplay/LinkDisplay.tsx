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
    links: ILinkPair[],
    deleteLink: (v: number) => void,
    clearHistory: () => void
}

const LinkDisplay = (props: LinkDisplayProps) => {
    const linkCards = props.links.sort((a, b) => (a.key < b.key) ? 1 : -1).map(link => (
        <LinkCard
            key={link.key}
            value={link.key}
            shortLink={includeHTTP(link.shortLink)}
            link={includeHTTP(link.link)}
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