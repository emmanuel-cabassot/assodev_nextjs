const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const userRegisterReqApi = async (formData: any) => {
    try {
        const response = await fetch(`${urlApiNest}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else if (response.status === 409) {
            throw new Error('Email or surname already exists');
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
};