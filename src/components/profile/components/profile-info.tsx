import { AuthContext } from '../../../context/authContext';
import ProfileImage from './profile-info/profile-image/profile-image';
import { useContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ProfileInfo() {
    const [userEmail, setUserEmail] = useState('') as any;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setUserEmail(user?.email);
    }, [user]);



    return (
        <>
            {/* profile info */}
            <Grid item  >
                <Grid container width={'350px'} textAlign={'center'} alignItems={'center'} justifyContent={'center'} >
                    <DialogTitle width={350} fontSize={28}>
                        My profile
                    </DialogTitle>

                    {/* Icone change password */}
                    <Tooltip title="Change password" placement="right" >
                        <IconButton onClick={() => console.log('reset password')}>
                            <LockResetIcon
                                sx={
                                    {
                                        color: 'primary.main',
                                        width: '50px',
                                        height: '50px',
                                    }
                                }
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>

                {/* Avatar user with remove and change */}
                <Grid container  >  
                    <ProfileImage />
                </Grid>

                {/* Informations utilisateur */}
                <Grid container mb={6} >
                    <Box sx={{
                        mt: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <TextField
                            id="outlined-name"
                            label="Surname"
                            defaultValue={user?.surname}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                width: '350px',
                                mt: 2,
                            }}
                        />
                        <TextField
                            id="outlined-name"
                            label="Email"
                            defaultValue={user?.email}
                            sx={{
                                width: '350px',
                                mt: 2,
                            }}
                        // onChange={handleChange}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}