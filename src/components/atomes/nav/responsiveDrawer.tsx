import * as React from 'react';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';

const profilePageList = [{ id: 1, name: 'Profile', url: '/profile', icon: <MenuIcon /> }, { id: 2, name: 'CV', url: '/cv', icon: <InboxIcon /> }, { id: 3, name: 'Aspirations', url: '/aspirations', icon: <InboxIcon /> }];
const projectPageList = [{ id: 11, name: 'My projects', url: '/my-projects', icon: <MailIcon /> }, { id: 12, name: 'Favorite projects', url: '/favorite-projects', icon: <InboxIcon /> }];

export default function ResponsiveDrawer() {

    const router = useRouter();
    return (
        <div>
            <Toolbar />
            {/* divider est une barre de separation */}
            <Divider />
            <List>
                {profilePageList.map((profilPage) => (
                    <Link href={profilPage.url} key={profilPage.id} passHref legacyBehavior>
                        <ListItem disablePadding>
                            <ListItemButton
                                {...router.pathname === profilPage.url ? { selected: true } : { selected: false }}
                                sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                        },
                                  }}
                            >
                                <ListItemIcon>
                                    {profilPage.icon}
                                </ListItemIcon>
                                <ListItemText primary={profilPage.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))};
            </List>
            <Divider />
            <List>
                {projectPageList.map((projectPage) => (
                    <Link href={projectPage.url} key={projectPage.id} passHref legacyBehavior>
                        <ListItem disablePadding>
                            <ListItemButton {...router.pathname === projectPage.url ? { selected: true } : { selected: false }}>
                                <ListItemIcon>
                                    {projectPage.icon}
                                </ListItemIcon>
                                <ListItemText primary={projectPage.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))};
            </List>
        </div >
    );
};
