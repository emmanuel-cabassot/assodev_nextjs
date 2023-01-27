import { useState, useContext } from 'react';
import { AuthContext } from '../../../../../context/authContext';
import { Avatar, Button } from "@mui/material";
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export default function ProfileImage() {
    const [image, setImage] = useState('') as any;
    const [imageURL, setImageURL] = useState('');
    const { user } = useContext(AuthContext);
    const avatar = user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png";

    const handleChangeImage = (event: any) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(file);
        setImageURL(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <>
            {/* Avatar user  */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    src={`${urlApiNest}/user/profile-image/${imageURL ? imageURL : avatar}`}
                    alt="Picture of the user"
                    sx={{ width: 160, height: 160 }}
                />
            </Box>

            {/* Change avatar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleChangeImage}
                    hidden
                />
                <label htmlFor="contained-button-file">
                    <Button
                        component="span"
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            width: '170px',
                            ml: 2,
                        }}
                    >
                        Change avatar
                    </Button>
                </label>

                {/* Delete avatar */}
                <Button variant="outlined"
                    color='error'
                    startIcon={<DeleteIcon />}
                    sx={{
                        width: '170px',
                        textTransform: 'none',
                        mt: 2,
                        ml: 2,
                    }}
                >Delete avatar
                </Button>
            </Box>
        </>
    )
}