const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AddCompetenceToProjectReqApi = async (competences: any, idProject: any) => {
    try {
        const body = {
            "id_project": idProject,
            "id_competence": competences.id
        }
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch(`${urlApiNest}/project-competence`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
}

export default AddCompetenceToProjectReqApi;