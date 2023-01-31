const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AvatarUploadReqApi = async (image: any, token: string = '') => {
    console.log('imageAvatar', image)
    console.log('tokenAvatar', token)
    try {
        if (token == '') {
            token = localStorage.getItem('token') || '';
            if (token == '') {
                throw new Error("Token not found");
            }
        }

        const uploadImage = await fetch(`${urlApiNest}/user/upload`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: image
        });
        if (uploadImage.ok) {
            const imageUrl = await uploadImage.json();
            return imageUrl;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
}