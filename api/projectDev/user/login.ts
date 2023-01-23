const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const loginReqApi = async (formData: any) => {
    try {
        const response = await fetch(`${urlApiNest}/user/login`, {
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
        else if (response.status === 404) {
            throw new Error('Invalid email or password');
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
};