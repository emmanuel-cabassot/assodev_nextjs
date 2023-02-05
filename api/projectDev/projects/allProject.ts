const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const allProjectReqApi = async () => {
    try {
        const response = await fetch(`${urlApiNest}/project`, {
            method: 'GET',
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