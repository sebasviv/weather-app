import { Box, CircularProgress } from '@mui/material'
import React from 'react'

interface Props {
    fullScreen: boolean
}

const LoadingComponent = ({fullScreen}: Props) => {
    return (
        <div className={`${ fullScreen ? 'loading-background' : 'loading-background-small'}`}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
}

export default LoadingComponent