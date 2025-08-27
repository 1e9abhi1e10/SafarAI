
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Card } from "../components/ui/card";
export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL; // kept for any absolute-URL needs
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post(`/auth/signup`, { email, password });
        const token = response?.data?.token || response?.data?.tempToken;
        if (!token) throw new Error('Invalid signup response');
        localStorage.setItem('token', token);
        window.location.href = '/new-trip';
      } catch (error) {
        console.log(error);
        const message = error?.response?.data?.message || 'Signup failed';
        alert(message);
      }
    };

    const handleContinue = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post(`/auth/continue`, {});
        const token = response?.data?.tempToken || response?.data?.token;
        if (!token) throw new Error('Invalid continue response');
        localStorage.setItem('token', token);
        window.location.href = '/new-trip';
      } catch (error) {
        console.log(error);
        const message = error?.response?.data?.message || 'Something went wrong';
        alert(message);
      }
    };

    return (
    <div className="flex flex-col min-h-[100dvh]" 
    style={{
        backgroundImage: `url(./bg.svg)`,
        backgroundSize: 'cover', // Adjusts the size of the image
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    }}
    >
      {/* <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">AI Travel Planner</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="/testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </header> */}
      <div className="flex-1 flex items-center justify-center py-4 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="hidden lg:block">
          <img
            src={'./Traveling_2.svg'}
            width="650"
            height="650"
            alt="Sign up"
            className="rounded-xl object-cover"
            style={{ aspectRatio: "650/650", objectFit: "contain" }}
          />
        </div>
        <div className="w-full max-w-md">
            <Card className="space-y-6 p-6">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
              Create a new account
            </h2>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  placeholder="You@gmail.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
            <button
                onClick={handleSubmit}
                type="button"
                className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
            >
                Create Account
            </button>
              <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{" "}
              <Link to="/login" className="font-medium text-primary hover:text-blue-600">
                sign in to your existing account
              </Link>
            </p>
            <div className="mt-3"></div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {" "}
              <Link to="" className="font-bold text-primary hover:text-blue-600" onClick={handleContinue}>
                or just Try it out
              </Link>
            </p>
        
            </div>
          </form>
          </Card>
        </div>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AI Travel Planner. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
