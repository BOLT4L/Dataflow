import React from 'react';
import { ShoppingCart, MapPin, GraduationCap, Building, TrendingUp, Calendar } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: ShoppingCart,
      title: "E-commerce Price Monitoring",
      description: "Track competitor prices, product availability, and reviews across multiple platforms",
      examples: ["Product price changes", "Stock levels", "Customer reviews", "New product launches"],
      color: "text-accent",
      bgColor: "bg-darkcard",
      borderColor: "border-darksurface"
    },
    {
      icon: MapPin,
      title: "Local Business Intelligence",
      description: "Monitor local events, business listings, and community activities in your area",
      examples: ["Event listings", "Business hours", "Contact information", "Local news"],
      color: "text-primary",
      bgColor: "bg-darkcard",
      borderColor: "border-darksurface"
    },
    {
      icon: GraduationCap,
      title: "Academic Research Data",
      description: "Collect research papers, citations, and academic publications from various sources",
      examples: ["Research publications", "Citation counts", "Author information", "Conference proceedings"],
      color: "text-secondary",
      bgColor: "bg-darkcard",
      borderColor: "border-darksurface"
    },
    {
      icon: Building,
      title: "Real Estate Market Data",
      description: "Gather property listings, price trends, and market analytics for informed decisions",
      examples: ["Property listings", "Price history", "Market trends", "Neighborhood data"],
      color: "text-accent",
      bgColor: "bg-darkcard",
      borderColor: "border-darksurface"
    },
    {
      icon: TrendingUp,
      title: "Financial Market Intelligence",
      description: "Track stock prices, financial news, and market sentiment from various sources",
      examples: ["Stock prices", "Financial news", "Market analysis", "Company earnings"],
      color: "text-primary",
      bgColor: "bg-darkcard",
      borderColor: "border-darksurface"
    },
    {
      icon: Calendar,
      title: "Event & Entertainment Data",
      description: "Monitor concerts, sports events, festivals, and entertainment venues",
      examples: ["Event schedules", "Ticket prices", "Venue information", "Artist lineups"],
      color: "text-secondary",
      bgColor: "bg-darkcard",
      borderColor: "border-darksurface"
    }
  ];

  return (
    <div className="py-24 bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-accent mb-4">Perfect for Any Industry</h2>
          <p className="text-darktext max-w-3xl mx-auto">
            From e-commerce to academic research, DataFlow adapts to your specific data collection needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div key={index} className={`p-8 rounded-2xl border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${useCase.bgColor} ${useCase.borderColor}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${useCase.bgColor} ${useCase.borderColor}`}>
                    <Icon className={`w-6 h-6 ${useCase.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-accent">{useCase.title}</h3>
                </div>
                
                <p className="text-darktext mb-6 leading-relaxed">{useCase.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-accent text-sm uppercase tracking-wide">Examples:</h4>
                  <ul className="space-y-2">
                    {useCase.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-darktext">
                        <div className={`w-1.5 h-1.5 ${useCase.color.replace('text-', 'bg-')} rounded-full`}></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-darkcard p-8 rounded-2xl shadow-lg border border-darksurface max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-accent mb-4">Don't See Your Use Case?</h3>
            <p className="text-darktext mb-6">
              Our flexible platform can be customized for almost any data collection need. 
              Let's discuss how DataFlow can work for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/80 transition-colors duration-300 shadow-md">
                Contact Sales
              </button>
              <button className="border-2 border-secondary text-darktext px-6 py-3 rounded-full font-semibold hover:bg-secondary/80 transition-colors duration-300 shadow-md">
                View More Examples
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;