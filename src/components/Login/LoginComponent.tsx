import React from 'react'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/autchContext';
import { IRegisterForm } from '../../models/registerModel';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const LoginComponent = () => {

    const { login, loginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<IRegisterForm>({ shouldUseNativeValidation: true, mode: 'onSubmit' });
    const [errorForm, setErrorForm] = React.useState('')

    const onSubmitData = async (data: IRegisterForm) => {
        setErrorForm('')
        try {
            await login(data.email, data.password)
            navigate('/home')
            
        } catch (error: any) {
            setErrorForm(error.message)
        }

    }

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle()
            navigate('/home')
        } catch (error: any) {
            setErrorForm(error.message)
        }
        
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit((data) => onSubmitData(data))}>
                <TextField className='input-form' id="outlined-basic" label="E-mail" variant="outlined" inputProps={{ ...register("email") }} />
                <TextField className='input-form' id="outlined-basic" label="Password" variant="outlined" inputProps={{ ...register("password") }} />
                {errorForm ? <Typography className='error-form'>{errorForm}</Typography> : <></>}
                <Button type='submit'>Login</Button>
                <IconButton
                    onClick={handleGoogleSignin}
                >
                    <GoogleIcon />
                </IconButton>
            </form>
        </div>
    )
}

export default LoginComponent