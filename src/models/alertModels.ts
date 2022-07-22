import { AlertColor } from "@mui/material"

export interface IAlert {
    open: boolean
    onClose(): void
    severity: AlertColor | undefined
    label: string

}