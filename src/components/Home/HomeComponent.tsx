import { AppBar, Box, IconButton, Toolbar, Typography, Button } from "@mui/material"
import { useAuth } from "../../context/autchContext"
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../utils/loading/LoadingComponent"


const Home = () => {

    const { user, logout, loading } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
    }

    if (loading) {
        return <LoadingComponent/>
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {user.displayName ? user.displayName : user.email}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Home