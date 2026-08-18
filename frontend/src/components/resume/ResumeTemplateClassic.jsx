


import "./ResumeTemplateClassic.css";

import Loader from "../common/Loader";

function ResumeTemplateClassic({ resume }) {

    if (!resume) {

        return (
            <Loader text="Preparing Resume..." />
        );

    }

    const {

        personal = {},
        education = [],
        experience = [],
        projects = [],
        certifications = [],
        languages = [],

    } = resume;

    return (

        <div className="classic-resume">

            <header className="classic-header">

                <h1>

                    {personal.fullName}

                </h1>

                <p className="classic-title">

                    {personal.headline}

                </p>

                <div className="classic-contact">

                    <span>{personal.email}</span>

                    <span>{personal.phone}</span>

                    <span>{personal.location}</span>

                </div>

            </header>

            <section>

                <h2>

                    Professional Summary

                </h2>

                <p>

                    {personal.bio}

                </p>

            </section>

            <section>

                <h2>

                    Skills

                </h2>

                <p>

                    {personal.skills}

                </p>

            </section>

            <section>

                <h2>

                    Professional Experience

                </h2>

                {

                    experience.map((item) => (

                        <div
                            key={item.id}
                            className="classic-item"
                        >

                            <div className="classic-item-header">

                                <h3>

                                    {item.job_title}

                                </h3>

                                <span>

                                    {

                                        item.currently_working
                                            ? "Present"
                                            : item.end_date

                                    }

                                </span>

                            </div>

                            <h4>

                                {item.company_name}

                            </h4>

                            <p>

                                {item.description}

                            </p>

                        </div>

                    ))

                }

            </section>

            <section>

                <h2>

                    Education

                </h2>

                {

                    education.map((item) => (

                        <div
                            key={item.id}
                            className="classic-item"
                        >

                            <div className="classic-item-header">

                                <h3>

                                    {item.degree}

                                </h3>

                                <span>

                                    {

                                        item.currently_studying
                                            ? "Present"
                                            : item.end_date

                                    }

                                </span>

                            </div>

                            <h4>

                                {item.institution}

                            </h4>

                            <p>

                                {item.field_of_study}

                            </p>

                        </div>

                    ))

                }

            </section>

            <section>

                <h2>

                    Projects

                </h2>

                {

                    projects.map((item) => (

                        <div
                            key={item.id}
                            className="classic-item"
                        >

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.description}

                            </p>

                            <small>

                                {item.technologies}

                            </small>

                        </div>

                    ))

                }

            </section>

            <section>

                <h2>

                    Certifications

                </h2>

                {

                    certifications.map((item) => (

                        <div
                            key={item.id}
                            className="classic-item"
                        >

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.issuing_organization}

                            </p>

                        </div>

                    ))

                }

            </section>

            <section>

                <h2>

                    Languages

                </h2>

                {

                    languages.map((item) => (

                        <p key={item.id}>

                            {item.language}
                            {" • "}
                            {item.proficiency}

                        </p>

                    ))

                }

            </section>

        </div>

    );

}

export default ResumeTemplateClassic;






