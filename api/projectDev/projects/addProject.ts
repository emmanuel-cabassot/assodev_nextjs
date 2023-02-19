const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AddProjectReqApi = async (project: any) => {
    try {
        const token = localStorage.getItem('token');
        if ( !token ) {
            throw new Error("Token not found");
        }
        const response = await fetch(`${urlApiNest}/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: project
        });
        if (response.ok) {
            console.log('response', response);
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }

    } catch (error) {
        throw error;
    }
}

export default AddProjectReqApi;