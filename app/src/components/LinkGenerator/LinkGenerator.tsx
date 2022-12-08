import React from 'react';
import {
    Button,
    Center,
    Container,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ShortenLinkSchema = Yup.object().shape({
    link: Yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter valid URL'
    ).required('Please enter a URL'),
});

interface LinkGeneratorProps {
    generateShortLink: (link: string) => void
}

const LinkGenerator = (props: LinkGeneratorProps) => {
    const handleSubmit = (values: { link: string }) => {
        props.generateShortLink(values.link)
    }
    
    return (
        <Center h={'100vh'}>
            <Container>
                <Formik
                    initialValues={{
                        link: '',
                    }}
                    validationSchema={ShortenLinkSchema}
                    onSubmit={values => {
                        handleSubmit(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Stack>
                                <Field
                                    as={Input}
                                    name='link'
                                    variant={'filled'}
                                    placeholder='example.com'
                                />
                                <Button type="submit">
                                    Shorten
                                </Button>
                            </Stack>
                            {errors.link && touched.link ? <Text color='red.600'>{errors.link}</Text> : <Text>&nbsp;</Text>}
                        </Form>
                    )}
                </Formik>
            </Container>
        </Center>
    )
};
export default LinkGenerator;