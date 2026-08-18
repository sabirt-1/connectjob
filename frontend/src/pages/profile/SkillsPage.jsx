


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import SkillManager from "../../components/profile/SkillManager";

import {
    getSkills,
    createSkill,
    deleteSkill,
} from "../../services/skillService";

import "./SkillsPage.css";

function SkillsPage() {

    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSkills();

    }, []);

    async function loadSkills() {

        try {

            setLoading(true);

            const data = await getSkills();

            setSkills(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(error);

            setSkills([]);

        } finally {

            setLoading(false);

        }

    }

    async function handleAdd(skill) {

        try {

            await createSkill(skill);

            loadSkills();

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        try {

            await deleteSkill(id);

            loadSkills();

        } catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return (
            <Loader text="Loading Skills..." />
        );

    }

    return (

        <DashboardShell
            title="My Skills"
            subtitle="Manage your technical and professional skills."
        >

            <SkillManager
                skills={skills}
                onAdd={handleAdd}
                onDelete={handleDelete}
            />

        </DashboardShell>

    );

}

export default SkillsPage;

