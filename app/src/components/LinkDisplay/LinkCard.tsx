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
            <CardHeader pb={0} pt={4}>
                <Heading size={'md'}><Link href={props.shortLink}>{ props.shortLink }</Link></Heading>
            </CardHeader>
            <CardBody pt={2} pb={3}>
                <Text><Link href={props.link}>{ props.link }</Link></Text>
            </CardBody>
        </Card>
    );
}

export default LinkCard;