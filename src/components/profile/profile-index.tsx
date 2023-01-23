import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import Image from 'next/image';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export default function ProfileIndex() {
    const { user } = useContext(AuthContext);
    console.log(user);
    const avatar = user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png";
    return (
        <main>
            <h1>Profile</h1>
            <Image src={`${urlApiNest}/user/profile-image/${avatar}`} alt="Picture of the user" width={200} height={200} />
            <p>Vous êtes connecté en tant que {user?.email}</p>
            <p>Votre surname {user?.surname}</p>
        </main>
    );
}

