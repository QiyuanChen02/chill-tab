import { User } from "firebase/auth";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Children } from "../types/commontypes";


export const UserContext = React.createContext<[User | null | undefined, boolean]>([null, false]);

export const GetUserContext = () => {
    return useContext(UserContext);
}

const UserProvider: React.FC<Children> = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    return (
        <UserContext.Provider value={[user, loading]}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;