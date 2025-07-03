import React from 'react';
import { AlertCircle, Target, CheckCircle } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <div className="py-24 bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-accent">The Problem</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-darkcard p-6 rounded-xl border border-darksurface">
                <h3 className="font-semibold text-primary mb-3">Manual Data Collection is Painful</h3>
                <p className="text-darktext">Hours spent copying and pasting data from websites, only to have it become outdated within days.</p>
              </div>
              
              <div className="bg-darkcard p-6 rounded-xl border border-darksurface">
                <h3 className="font-semibold text-primary mb-3">Expensive Enterprise Solutions</h3>
                <p className="text-darktext">Complex tools that cost thousands per month and require technical expertise to set up and maintain.</p>
              </div>
              
              <div className="bg-darkcard p-6 rounded-xl border border-darksurface">
                <h3 className="font-semibold text-primary mb-3">Inflexible Generic Tools</h3>
                <p className="text-darktext">One-size-fits-all solutions that don't adapt to your specific niche requirements.</p>
              </div>
            </div>
          </div>
          
          {/* Solution */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-accent">Our Solution</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-darkcard p-6 rounded-xl border border-darksurface">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Fully Automated Collection</h3>
                    <p className="text-darktext">Set it once and forget it. Our system handles all the heavy lifting while you focus on your business.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-darkcard p-6 rounded-xl border border-darksurface">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Affordable & Transparent</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-darkcard p-6 rounded-xl border border-darksurface">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Customizable to Your Needs</h3>
                    <p className="text-darktext">Built for niche requirements. Define exactly what data you need and how you want to receive it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution;