import Router from 'next/router';

const apiUrl = process.env.NEXT_APP_API_URL;

export const AuthLoginCallApi = async (formData: any) => {
    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const data = await response.json();
            console.log('data', data);
                  // Enregistre les informations de jeton dans le local storage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      // Redirige l'utilisateur vers la page d'accueil
      Router.push('/');
        } else if (response.status === 400) {
            throw new Error('Invalid email or password');
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        // Handle error
    }
};