import React from 'react';
import { Clock, TrendingUp, Settings, Shield, Zap, Users } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Eliminate hours of manual data collection. Focus on analysis and decision-making instead of data gathering.",
      gradient: "from-primary to-primary/80"
    },
    {
      icon: TrendingUp,
      title: "Gain Actionable Insights",
      description: "Fresh, structured data delivered consistently helps you spot trends and opportunities faster.",
      gradient: "from-secondary to-secondary/80"
    },
    {
      icon: Settings,
      title: "Customizable to Your Needs",
      description: "Tailor data collection rules, formats, and delivery methods to match your specific requirements.",
      gradient: "from-accent to-accent/80"
    },
    {
      icon: Shield,
      title: "Reliable & Automated",
      description: "99.9% uptime with intelligent error handling. Your data collection runs smoothly 24/7.",
      gradient: "from-primary to-primary/80"
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Go from zero to collecting data in minutes, not days. No technical expertise required.",
      gradient: "from-secondary to-secondary/80"
    },
    {
      icon: Users,
      title: "Scalable Solutions",
      description: "Start small and grow. Our platform scales with your needs from startup to enterprise.",
      gradient: "from-accent to-accent/80"
    }
  ];

  return (
    <div className="py-24 bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-accent mb-4">Why Choose DataFlow?</h2>
          <p className="text-darktext max-w-3xl mx-auto">
            Transform your data collection process with benefits that drive real business outcomes
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="group bg-darkcard p-8 rounded-2xl border border-darksurface hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-accent mb-4">{benefit.title}</h3>
                <p className="text-darktext leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Experience the Difference</h3>
            <p className="text-darktext mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already using DataFlow to automate their data collection
            </p>
            <button className="bg-accent text-darkbg px-8 py-3 rounded-full font-semibold hover:bg-accent/80 transition-colors duration-300 shadow-md">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;