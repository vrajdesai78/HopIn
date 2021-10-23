import React from 'react'
import SawoLogin from 'sawo-react'
import { useHistory } from "react-router-dom";
import { Container, Box, Typography } from '@material-ui/core'


function Login() {

    let history = useHistory();

    function sawoLoginCallback(payload) {
        history.push("/home");
        alert('Login Successful')
        console.log(payload.customFieldInputValues.Name)

    }

    const sawoConfig = {
        onSuccess: sawoLoginCallback,
        identifierType: 'email',
        apiKey: process.env.REACT_APP_SAWO_API,
        containerHeight: '500px',
    }

    return (

        <Box height='100vh' width='100%' b>
            <Container >
                <Typography variant="h1"
                    color={'#00A19D'}>
                    Welcome to Spaces
                </Typography>
                <Box border='1px solid black'>
                    <div className='main-ctn'>
                        <SawoLogin config={sawoConfig} />
                    </div>
                </Box>
            </Container>
        </Box>
    )
}

export default Login
