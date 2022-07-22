import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

interface Props {
    handleCloseDialog(): void
    handleAgreeDialog(maxTemp: string): void
    openDialog: boolean
}

const DialogFavoritesComponent = ({ handleAgreeDialog, handleCloseDialog, openDialog }: Props) => {

    const [maxTemp, setMaxTemp] = React.useState('')

    const handleChange = (value: string) => {
        setMaxTemp(value)
    }

    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='dialog-container'
        >
            <DialogTitle id="alert-dialog-title">
                {"Do you want to create an alert for this city?"}
            </DialogTitle>
            <DialogContent className='dialog-content'>
                <TextField className='input-form'
                    id="outlined-basic"
                    label="max Temperature"
                    variant="outlined"
                    onChange={(e) => handleChange(e.currentTarget.value)}
                    value={maxTemp}
                    inputProps={{
                        typeof: 'number'
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Disagree</Button>
                <Button onClick={() => handleAgreeDialog(maxTemp)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogFavoritesComponent