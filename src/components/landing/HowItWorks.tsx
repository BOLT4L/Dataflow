import React from 'react';
import { Search, Calendar, Bot, Cog, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const HowItWorks = () => {
  const { continueWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await continueWithGoogle();
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Google sign-in failed: ' + JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      icon: Search,
      title: "Define Your Data",
      description: "Tell us exactly what data you need and from which sources. Our intuitive interface makes setup simple.",
      color: "bg-primary"
    },
    {
      icon: Calendar,
      title: "We Schedule",
      description: "Set your preferred collection frequency - hourly, daily, weekly, or custom intervals.",
      color: "bg-secondary"
    },
    {
      icon: Bot,
      title: "We Scrape",
      description: "Our intelligent bots collect your data automatically, handling site changes and anti-bot measures.",
      color: "bg-accent"
    },
    {
      icon: Cog,
      title: "We Process",
      description: "Raw data is cleaned, structured, and validated to ensure accuracy and consistency.",
      color: "bg-primary"
    },
    {
      icon: Download,
      title: "Access Your Data",
      description: "Receive data via API, email, CSV downloads, or direct database integration.",
      color: "bg-secondary"
    }
  ];

  return (
    <div className="py-24 bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-accent mb-4">How It Works</h2>
          <p className="text-darktext max-w-3xl mx-auto">
            Our streamlined 5-step process turns complex data collection into a simple, automated workflow
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-center group">
                    {/* Step number */}
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-darksurface border-2 border-darksurface rounded-full text-sm font-bold text-darktext mb-4 relative z-10">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`mx-auto w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-accent">{step.title}</h3>
                      <p className="text-darktext leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 flex justify-center items-center text-center">
          <div className="bg-darkcard p-8 rounded-2xl shadow-lg border border-darksurface max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-accent mb-4">Ready to Get Started?</h3>
            <p className="text-darktext mb-6">Set up your first data collection in under 5 minutes</p>
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
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;