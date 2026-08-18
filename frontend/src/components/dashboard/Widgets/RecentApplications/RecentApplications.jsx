


import "./RecentApplications.css"
import Card from "../../../common/Card";
import StatusBadge from "../../../common/Badge/StatusBadge";

function RecentApplications({

    applications = []

}){

    return(
        <div className="rec-app">
        <Card

            title="Recent Applications"

        >

            {

                applications.length===0 ?

                (

                    <p>

                        No applications yet.

                    </p>

                )

                :

                applications.map(

                    application=>(

                        <div

                            key={application.id}

                            className="application-item"

                        >

                            <h4>

                                {

                                    application.job

                                }

                            </h4>

                            <h5>

                                {

                                    application.candidate

                                }

                            </h5>

                            <p>

                                {

                                    application.company

                                }

                            </p>

                            {/* <span>

                                {

                                    application.status

                                }

                            </span> */}
                            <StatusBadge
                                status={application.status}
                            />

                        </div>

                    )

                )

            }

        </Card>
        </div>

    );

}

export default RecentApplications;

