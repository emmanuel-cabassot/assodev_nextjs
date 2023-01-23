
import React, { useState } from 'react';
import Head from 'next/head';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function AuthLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      username: event.target.email.value,
      password: event.target.password.value
    };

    login(data);
  }

  return (
    <>
      <Head>
        <title>Asso Dev</title>
        <meta name="description" content="Cherche et trouve" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
};

