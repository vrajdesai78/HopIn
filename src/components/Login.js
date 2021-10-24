import React from 'react'
import SawoLogin from 'sawo-react'
import { useHistory } from "react-router-dom";
import { Container, Box, Typography } from '@material-ui/core'
import './Login.css'


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

        <Box height='100vh' width='100%' className='login-ctn'>
            <Container >
                <Typography variant="h2" className='heading'>
                    Welcome to Spaces
                </Typography>
                <div className='main-ctn'>
                    <SawoLogin config={sawoConfig} />
                </div>
            </Container>
        </Box>
    )
}

export default Login
