


import "./CompanyHeader.css";

import {

    FaBuilding,

    FaGlobe,

    FaUsers,

    FaMapMarkerAlt,

} from "react-icons/fa";
import { getImageUrl } from "../../utils/image";

function CompanyHeader({ company }) {

    return (

        <div className="company-header">

            <div className="company-logo">

                {

                    company.logo ?

                    // <img

                    //     src={company.logo}

                    //     alt={company.company_name}

                    // />
                    <img
                        src={getImageUrl(company.logo)}
                        alt={company.company_name}
                    />

                    :

                    company.company_name.charAt(0)

                }

            </div>

            <div className="company-header-info">

                <h1>

                    {company.company_name}

                </h1>

                <div className="company-tags">

                    <span>

                        <FaBuilding />

                        {company.industry}

                    </span>

                    <span>

                        <FaMapMarkerAlt />

                        {company.location}

                    </span>

                    <span>

                        <FaUsers />

                        {company.company_size}

                    </span>

                    {

                        company.website &&

                        <a

                            href={company.website}

                            target="_blank"

                            rel="noreferrer"

                        >

                            <FaGlobe />

                            Visit Website

                        </a>

                    }

                </div>

            </div>

        </div>

    );

}

export default CompanyHeader;

