


import { createContext, useContext, useEffect, useState } from "react";

import { getProfile } from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        const token = localStorage.getItem("access");

        if (!token) {

            setLoading(false);

            return;

        }

        try {

            const profile = await getProfile();

            setUser(profile);

        }

        // catch {

        //     localStorage.clear();

        //     setUser(null);

        // }
        catch (error) {

            console.log(
                // "Profile Load Error:",
                "Failed to load profile:",
                error
            );

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    }

    function login(profile) {

        setUser(profile);

    }

    function logout() {

        // localStorage.clear();
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout,

                loading,

                loadUser

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}

