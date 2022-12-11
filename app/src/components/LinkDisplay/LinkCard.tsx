import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Link,
    Text
} from '@chakra-ui/react';
import React from 'react';

interface LinkCardProps {
    shortLink: string,
    link: string
}

const LinkCard = (props: LinkCardProps) => {
    return (
        <Card>
            <CardHeader>
                <Heading><Link href={props.shortLink}>{ props.shortLink }</Link></Heading>
            </CardHeader>
            <CardBody>
                <Text><Link href={props.link}>{ props.link }</Link></Text>
            </CardBody>
        </Card>
    );
}

export default LinkCard;