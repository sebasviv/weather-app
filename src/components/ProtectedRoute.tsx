import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/autchContext'
import LoadingComponent from '../utils/loading/LoadingComponent'
import FavoriteIcon from '@mui/icons-material/Favorite';

export function ProtectedRoute({ children }: any) {

    const navigate = useNavigate()
    const { user, loading, logout } = useAuth()
    if (loading) {
        return <LoadingComponent />
    }

    if (!user) {
        return <Navigate to='/login'></Navigate>
    }




    const handleFavoritePage = () => {
        return navigate('/favorites')
    }

    const handleHomePage = () => {
        return navigate('/home')
    }

    const handleLogout = async () => {
        await logout()
    }

    return <>
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
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user.displayName ? user.displayName : user.email}
                    </Typography>
                    <Button color="inherit" onClick={handleHomePage} startIcon={<FavoriteIcon />}>Home</Button>
                    <Button color="inherit" onClick={handleFavoritePage} startIcon={<FavoriteIcon />}>Favorites</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
        {children}

    </>
}