const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AddCvReqApi = async (cv: any, token: string = '') => {
    try {
        if (token == '') {
            token = localStorage.getItem('token') || '';
            if (token == '') {
                throw new Error("Token not found");
            }
        }
    
        const uploadCv = await fetch(`${urlApiNest}/cv`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: cv
        });
        if (uploadCv.ok) {
            const cvUrl = await uploadCv.json();
            return cvUrl;
        }
    } catch (error) {
        throw new Error("erreur dans le addCv.ts");

    }
        
}