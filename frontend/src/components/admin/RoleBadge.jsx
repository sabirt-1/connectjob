


import "./UserTable.css";

function RoleBadge({ role }) {

    const roleClass = `role-badge ${role}`;

    return (

        <span className={roleClass}>

            {role}

        </span>

    );

}

export default RoleBadge;

