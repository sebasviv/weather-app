import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/autchContext';
import { IRegisterForm } from '../../models/registerModel';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { signUp } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<IRegisterForm>({ shouldUseNativeValidation: true, mode: 'onSubmit' });
    const [errorForm, setErrorForm] = React.useState('')

    const onSubmitData = async (data: IRegisterForm) => {
        setErrorForm('')
        try {
            await signUp(data.email, data.password)
            navigate('/login')
        } catch (error: any) {
            setErrorForm(error.message)
        }

    }

    return (
        <div className='register-form'>
            <form onSubmit={handleSubmit((data) => onSubmitData(data))}>
                <TextField className='input-form' id="outlined-basic" label="E-mail" variant="outlined" inputProps={{ ...register("email") }} />
                <TextField className='input-form' id="outlined-basic" label="Password" variant="outlined" inputProps={{ ...register("password") }} />
                { errorForm ? <Typography className='error-form'>{errorForm}</Typography> : <></>}
                <Button type='submit'>Register</Button>
            </form>
        </div>

    )
}

export default Register