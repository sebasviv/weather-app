import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingComponent = () => {
    return (
        <div className='loading-background'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
}

export default LoadingComponent