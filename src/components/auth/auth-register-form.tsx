import React, { useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function AuthRegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);

    function handleSubmit(event: any) {
        console.log('on passe dans le submit')
        event.preventDefault()

        const data = {
            surname: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        register(data)
    }
    return (
        <main>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </main>
    );
}
