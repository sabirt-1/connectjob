



// import { useEffect, useState } from "react";

// import {
//     getMyApplications
// }
// from "../../services/applicationService";

// function CandidateApplicationsPage() {

//     const [
//         applications,
//         setApplications
//     ] = useState([]);

//     const [
//         loading,
//         setLoading
//     ] = useState(true);

//     useEffect(() => {

//         async function loadApplications() {

//             try {

//                 const data =
//                     await getMyApplications();

//                 setApplications(data);

//             } catch (error) {

//                 console.log(error);

//             } finally {

//                 setLoading(false);

//             }

//         }

//         loadApplications();

//     }, []);

//     if (loading) {

//         return <h2>Loading...</h2>;

//     }

//     return (

//         <div className="container">

//             <h1>
//                 My Applications
//             </h1>

//             {applications.length === 0 ? (

//                 <p>
//                     No applications found.
//                 </p>

//             ) : (

//                 applications.map(
//                     (application) => (

//                     <div
//                         key={application.id}
//                         className="job-card"
//                     >

//                         <h3>
//                             Job ID:
//                             {" "}
//                             {application.job}
//                         </h3>

//                         <p>
//                             Status:
//                             {" "}
//                             {application.status}
//                         </p>

//                         <p>
//                             Applied:
//                             {" "}
//                             {
//                                 application.applied_at
//                             }
//                         </p>

//                     </div>

//                 )))

//             }

//         </div>

//     );

// }

// export default CandidateApplicationsPage;


