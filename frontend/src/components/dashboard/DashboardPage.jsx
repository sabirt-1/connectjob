

import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";
import Loader from "../../components/common/Loader";


function DashboardPage() {

    const [profile, setProfile] = useState(null);

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

    };

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await getProfile();

                setProfile(data);

            } catch (error) {

                console.log(error);

            }

        }

        loadProfile();

    }, []);

    if (!profile) {
        // return <h2>Loading...</h2>;
        return <Loader />;
    }


    return (
        <div>

            <h1>Dashboard</h1>

            <h2>
                Welcome {profile.username}
            </h2>

            <p>
                Role: {profile.role}
            </p>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default DashboardPage;





// import { useEffect } from "react";
// import { getProfile } from "../services/profileService";

// function DashboardPage() {

//     useEffect(() => {

//         async function loadProfile() {

//             const data =
//                 await getProfile();

//             console.log(data);

//         }

//         loadProfile();

//     }, []);

//     return (
//         <h1>Dashboard</h1>
//     );
// }

// export default DashboardPage;