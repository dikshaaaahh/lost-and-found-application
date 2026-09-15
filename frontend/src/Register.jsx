
import { useState } from 'react';
import './Auth.css';
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.text();

      if (response.ok) {
        setMessage('Registration successful! 🎉');

        setName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        setMessage(data || 'Registration failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Could not connect to server.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>Create Account</h1>

        <p>Join Lost & Found</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        {message && <p>{message}</p>}

        <p>
          Already have an account?{' '}
          <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;
