import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Testimonials = () => {
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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Manager",
      company: "TechStyle Co.",
      content: "DataFlow has completely transformed how we monitor our data. What used to take our team 8 hours daily now happens automatically. We've seen a 23% increase in efficiency since implementing it.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Research Director",
      company: "Urban Analytics",
      content: "The local business intelligence we get from DataFlow is invaluable. Real-time updates on city permits, business openings, and event schedules help us stay ahead of market trends.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Emily Watson",
      role: "Lead Researcher",
      company: "Academic Insights Lab",
      content: "As a researcher, DataFlow saves me countless hours collecting publication data. The accuracy and consistency of the data collection has improved our research quality significantly.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="py-24 bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-accent mb-4">What Our Customers Say</h2>
          <p className="text-darktext max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their data collection process
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-darkcard p-8 rounded-2xl border border-darksurface hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              
              <blockquote className="text-darktext mb-8 leading-relaxed italic">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-accent">{testimonial.name}</div>
                  <div className="text-secondary text-sm">{testimonial.role}</div>
                  <div className="text-primary text-sm font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center items-center text-center">
          <div className="bg-darkcard p-8 rounded-2xl border border-darksurface shadow-lg w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-accent mb-4">Ready to Join Them?</h3>
            <p className="text-darktext mb-6 max-w-2xl mx-auto">
              Start your free trial today and see why businesses trust DataFlow for their data collection needs
            </p>
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

export default Testimonials;