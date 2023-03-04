const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const getAllCompetencesReqApi = async () => {
    try {
        const response = await fetch(`${urlApiNest}/competence`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            return data;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
}

export default getAllCompetencesReqApi;