import React from 'react';
import { ArrowRight, Database, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAuth } from 'firebase/auth';

const Hero = () => {
  const { continueWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await continueWithGoogle();
      // Get the current user from Firebase
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Send email and name to backend to register if new
        localStorage.setItem('userEmail',user.email || '')
        const response = await fetch('http://127.0.0.1:8000/api/accounts/register-google/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName || '',
            profession: '' // or any other info you want to send
          }),
        });
        if (!response.ok) {
          throw new Error('Backend registration failed');
        }
      }
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Google sign-in failed: ' + JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-darkbg overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-40"></div>
              <div className="relative bg-primary p-4 rounded-full shadow-lg">
                <Database className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-extrabold text-accent mb-6 leading-tight">
            Automate Your Niche
            <span className="text-primary block">Data Collection</span>
            <span className="text-accent">Effortlessly</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-darktext mb-8 max-w-3xl mx-auto leading-relaxed">
            DataFlow provides affordable, customizable, and automated scraping 
            for the data you need, when you need it. Transform web data into 
            actionable insights without the complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/80 transition-colors duration-300 shadow-md flex items-center gap-3 justify-center mx-auto"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.63 2.36 30.21 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.2C12.13 13.99 17.57 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"/>
                  <path fill="#FBBC05" d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.89 15.1 0 19.41 0 24c0 4.59.89 8.9 2.69 12.24l7.98-6.2z"/>
                  <path fill="#EA4335" d="M24 48c6.21 0 11.63-2.05 15.54-5.59l-7.19-5.59c-2.01 1.35-4.59 2.15-8.35 2.15-6.43 0-11.87-4.49-13.33-10.54l-7.98 6.2C6.71 42.18 14.82 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
              {isLoading ? 'Continuing...' : 'Continue with Google'}
            </button>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-secondary mb-8">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-medium">Instant Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <span className="font-medium">Reliable Data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">$</span>
              <span className="font-medium">Affordable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;