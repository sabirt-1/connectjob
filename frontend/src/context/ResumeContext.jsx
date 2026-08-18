


import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getResume } from "../services/resumeService";
import { adaptResumeData } from "../utils/resumeAdapter";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {

    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(true);

    const [template, setTemplate] = useState("modern");

    useEffect(() => {

        loadResume();

    }, []);

    async function loadResume() {

        try {

            const data = await getResume();
            console.log("Resume API:", data);

            setResume(
                adaptResumeData(data)
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ResumeContext.Provider
            value={{

                resume,

                setResume,

                loading,

                setLoading,

                template,

                setTemplate,

                refreshResume: loadResume,

            }}
        >

            {children}

        </ResumeContext.Provider>

    );

}

export function useResume() {

    return useContext(
        ResumeContext
    );

}








