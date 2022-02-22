import { Box, IconButton, Modal, Theme, Typography } from '@mui/material'
import { toggleLogin, toggleSignup } from '../redux/auth'
import CloseIcon from '@mui/icons-material/Close'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { Children } from '../types/commontypes'

const modalStyle = (theme: Theme) => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 12,
    p: 4,
    width: 500,
    [theme.breakpoints.down('sm')]: {
        width: 1,
        height: 1,
    },
})

const AuthModal: React.FC<Children & { type: string }> = ({
    children,
    type,
}) => {
    const loginModalOpen = useAppSelector((state) => state.auth.loginModal)
    const signupModalOpen = useAppSelector((state) => state.auth.signupModal)

    const openModalType = type === 'login' ? loginModalOpen : signupModalOpen
    const dispatch = useAppDispatch()

    const toggleModal = () => {
        type === 'login'
            ? dispatch(toggleLogin(false))
            : dispatch(toggleSignup(false))
    }

    return (
        <Modal open={openModalType} onClose={toggleModal}>
            <Box sx={modalStyle}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <Typography variant="h2" component="h2">
                        {type === 'login' ? 'Log In' : 'Sign Up'}
                    </Typography>
                    <IconButton
                        sx={{
                            mt: 0,
                            mb: 'auto',
                            position: 'absolute',
                            right: 0,
                        }}
                        onClick={toggleModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Modal>
    )
}

export default AuthModal
