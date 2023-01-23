const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const refreshTokenReqApi = async (refreshToken: string, id: number) => {
    try {
        const refresh = await fetch(`${urlApiNest}/user/refresh/${refreshToken}/${id}`, {
            method: 'GET',
        });
        if (refresh.ok) {
            const data = await refresh.json();
            return data;
        }
        else if (refresh.status === 401) {
            throw new Error('bad token: unauthorized');
        }
        else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
};


