


export function adaptResumeData(data) {

    if (!data) {

        return null;

    }

    // Already in frontend format
    if (data.personal) {

        return data;

    }

    // Old backend compatibility
    return {

        personal: {

            fullName: `${data.user?.first_name || ""} ${data.user?.last_name || ""}`,

            email: data.user?.email || "",

            phone: data.user?.phone || "",

            headline: data.profile?.headline || "",

            location: data.profile?.location || "",

            bio: data.profile?.bio || "",

            skills: data.user?.skills || "",

            profileImage: data.user?.profile_image || "",

            linkedin: data.profile?.linkedin || "",

            github: data.profile?.github || "",

            portfolio: data.profile?.portfolio || "",

        },

        education: data.education || [],

        experience: data.experience || [],

        projects: data.projects || [],

        certifications: data.certifications || [],

        languages: data.languages || [],

    };

}

















// export function adaptResumeData(data) {

//     if (!data) {

//         return null;

//     }

//     return {

//         personal: {

//             fullName: `${data.user.first_name} ${data.user.last_name}`,

//             email: data.user.email,

//             phone: data.user.phone,

//             headline: data.profile.headline,

//             location: data.profile.location,

//             bio: data.profile.bio,

//             skills: data.user.skills,

//             profileImage: data.user.profile_image,

//             linkedin: data.profile.linkedin,

//             github: data.profile.github,

//             portfolio: data.profile.portfolio,

//         },

//         education: data.education || [],

//         experience: data.experience || [],

//         projects: data.projects || [],

//         certifications: data.certifications || [],

//         languages: data.languages || [],

//     };

// }

