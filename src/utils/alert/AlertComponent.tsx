import { Alert, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { IAlert } from '../../models/alertModels';



const AlertComponent = ({ open, onClose, severity, label }: IAlert) => {

    React.useEffect(() => {
        if (open === true) {
            setTimeout(() => {
                onClose()
            }, 3000)
        }
    }, [open])

    return (
        <>
            {open ?
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
                </Box> : <></>
            }
        </>
    )
}

export default AlertComponent