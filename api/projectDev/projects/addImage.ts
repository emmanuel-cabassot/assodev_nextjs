const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AddImageReqApi = async (image: any, idProject: any) => {
    try {
        const token = localStorage.getItem('token');
        if ( !token ) {
            throw new Error("Token not found");
        }
        const response = await fetch(`${urlApiNest}/project/upload-project-image/${idProject}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: image
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

export default AddImageReqApi;