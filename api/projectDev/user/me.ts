const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const userMeReqApi = async (accessToken: string) => {
    try {
        const response = await fetch(`${urlApiNest}/user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else if (response.status === 401) {
            throw new Error('bad token: unauthorized');
        }
        else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
};