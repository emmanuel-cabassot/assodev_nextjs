import Router from 'next/router';

const apiUrl = process.env.NEXT_APP_API_URL;

export const AuthRegisterCallApi = async (formData: any) => {
  try {
    const response = await fetch(`http://localhost:3000/user/register`, {
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh_token', data.refresh_token);
      // Redirige l'utilisateur vers la page d'accueil
      Router.push('/');
      // Handle successful registration
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    // Handle error
  }
};