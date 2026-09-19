
import { useState } from 'react';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const data = await response.text();

      if (response.ok) {
        setMessage(data);
      } else {
        setMessage(data || 'Password reset failed');
      }

    } catch (error) {
      console.error(error);
      setMessage('Could not connect to server.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>Forgot Password?</h1>

        <p>Reset your Lost & Found password</p>

        <form onSubmit={handleResetPassword}>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">
            Reset Password
          </button>

        </form>

        {message && <p>{message}</p>}

        <p>
          <a href="/login">Back to Login</a>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;

