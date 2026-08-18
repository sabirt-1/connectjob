


import "./AdminRecentApplications.css";

function AdminRecentApplications({

    applications

}) {

    return (

        <div className="dashboard-card">

            <h2>

                Recent Applications

            </h2>

            <table className="recent-table">

                <thead>

                    <tr>

                        <th>Candidate</th>

                        <th>Job</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.map(

                            (application) => (

                                <tr

                                    key={application.id}

                                >

                                    <td>

                                        {application.candidate}

                                    </td>

                                    <td>

                                        {application.job}

                                    </td>

                                    <td>

                                        <span
                                            className={`status-pill ${application.status}`}
                                        >

                                            {application.status}

                                        </span>

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminRecentApplications;

