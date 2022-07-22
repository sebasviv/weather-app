import { Alert, AlertColor, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

interface Props {
    open: boolean
    onClose(): void
    severity: AlertColor | undefined
    label: string
}

const AlertComponent = ({ open, onClose, severity, label }: Props) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                severity={severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                onClose()
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {label}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default AlertComponent