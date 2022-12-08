import React from 'react';
import {
    Button,
    Center,
    Container,
    Input,
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

const LinkGenerator = () => (
    <Center h={'100vh'}>
        <Container>
            <Formik
                initialValues={{
                    link: '',
                }}
                validationSchema={ShortenLinkSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field as={Input} name="link" />
                        {errors.link && touched.link ? <Text color='red.600'>{errors.link}</Text> : null}
                        <Button type="submit">Shorten</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    </Center>
);
export default LinkGenerator;