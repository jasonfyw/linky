import React from 'react';
import {
    Button,
    Box,
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

interface LinkGeneratorFormProps {
    generateShortLink: (link: string) => void
}

const LinkGeneratorForm = (props: LinkGeneratorFormProps) => {
    const handleSubmit = async (
        values: { link: string },
        setSubmitting: (b: boolean) => void
    ) => {
        await props.generateShortLink(values.link)
        setSubmitting(false)
    }
    
    return (
        <Box minW={['xs', 'xl']}>
            <Formik
                initialValues={{
                    link: '',
                }}
                validationSchema={ShortenLinkSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    await handleSubmit(values, setSubmitting)
                    resetForm()
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Stack>
                            <Field
                                as={Input}
                                name='link'
                                variant={'filled'}
                                placeholder='example.com'
                                spellcheck='false'
                            />
                            <Button type="submit" isLoading={isSubmitting}>
                                Shorten
                            </Button>
                        </Stack>
                        {errors.link && touched.link ? <Text color='red.600'>{errors.link}</Text> : <Text>&nbsp;</Text>}
                    </Form>
                )}
            </Formik>
        </Box>
    )
};
export default LinkGeneratorForm;