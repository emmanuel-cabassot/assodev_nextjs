import React, { createContext } from 'react';
import { AddCvReqApi } from '../../api/projectDev/cv/addCv';
import { CvInterface } from '../../interfaces/cv/CvInterface';
import { useState } from 'react';

export const UserContext = createContext({
    cv: null as CvInterface | null,
    addCv: (formData: any) => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [cv, setCv] = useState(null);

    const addCv = async (formData: any) => {
        try{
            const cvResponse = await AddCvReqApi(formData);
            setCv(cvResponse);
        }
        catch (error: any) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider value={{  cv, addCv  }}>
            {children}
        </UserContext.Provider>
    );
};