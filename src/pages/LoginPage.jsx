import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Card } from "../components/ui/card"; // Adjust this import based on your setup

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }
      const response = await api.post('/auth/login', { email, password });
      const token = response?.data?.token || response?.data?.tempToken;
      if (!token) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('token', token);
      window.location.href = '/new-trip';
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 lg:grid lg:grid-cols-2 lg:gap-8"
    style={{
        backgroundImage: `url(./bg.svg)`,
        backgroundSize: 'cover', // Adjusts the size of the image
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    }}
    >
      <div className="relative hidden lg:block">
        <img
          src={'./travel_3.svg'}
          width="650"
          height="650"
          alt="Login"
          className="rounded-xl object-cover"
          style={{ aspectRatio: '650/650', objectFit: 'initial' }}
        />
      </div>
      <div className="w-full max-w-md">
      <Card className="space-y-6 p-6">
        <div>
        <div>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                Log in to your account
            </h2>
        </div>
          
          <form className="space-y-6 mt-8">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-4">
                    <button
                    type="button"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mt-4"
                    onClick={handleSubmit}
                    >
                    Log In
                    </button>
                </div>
          </form>
          <p className="mt-6 text-center text-sm text-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default LoginPage;
