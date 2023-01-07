import React, { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext({
    user: null,
    hydrateUser: (newUser: any) => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

    const hydrateUser = (newUser: any): void => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, hydrateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <UserContext.Provider value={{ user: null
//         }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
