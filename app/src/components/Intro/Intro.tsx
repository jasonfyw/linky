import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import Lottie from 'react-lottie-player'
import lottieJson from './linkanimation.json';

const Intro = () => {

    return (
        <Container>
            <Center>
                <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 150, height: 150 }}
                />
            </Center>
        </Container>
    );
}

export default Intro;