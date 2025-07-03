import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can I start collecting data?",
      answer: "Most users are collecting data within 15 minutes of signing up. Our intuitive setup process guides you through defining your data sources and collection rules. No technical expertise required."
    },
    {
      question: "What happens if a website changes its structure?",
      answer: "Our intelligent system automatically adapts to minor website changes. For major structural changes, you'll receive an alert, and our support team will help update your collection rules quickly."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption, secure data transmission, and comply with GDPR and SOC 2 standards. Your data is stored securely and never shared with third parties."
    },
    {
      question: "Can I integrate DataFlow with my existing systems?",
      answer: "Yes! We offer REST APIs, webhooks, and direct database integrations. You can also export data in multiple formats including CSV, JSON, and XML for easy integration with your existing workflows."
    },
    {
      question: "What if I need to collect data from sites that require login?",
      answer: "DataFlow supports authenticated data collection. You can securely provide credentials for sites that require login access, and we'll handle the authentication process automatically."
    },
    {
      question: "Do you offer support for complex data transformation?",
      answer: "Yes, our Professional and Enterprise plans include advanced data processing rules. You can clean, filter, and transform data before delivery to match your exact requirements."
    },
    {
      question: "What's your uptime guarantee?",
      answer: "We maintain 99.9% uptime with redundant systems and automatic failover. Enterprise customers receive an SLA with guaranteed uptime and response times."
    },
    {
      question: "Can I cancel or change my plan anytime?",
      answer: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time. No long-term contracts or cancellation fees. Changes take effect at the next billing cycle."
    }
  ];

  return (
    <div className="py-24 bg-darkbg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-accent mb-4">Frequently Asked Questions</h2>
          <p className="text-darktext">
            Everything you need to know about DataFlow and our data collection service
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-darkcard rounded-2xl border border-darksurface overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-darksurface transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-accent pr-4">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-secondary flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-8 pb-6">
                  <p className="text-darktext leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-darkcard p-8 rounded-2xl border border-darksurface shadow-lg">
            <h3 className="text-2xl font-bold text-accent mb-4">Still Have Questions?</h3>
            <p className="text-darktext mb-6">
              Our support team is here to help. Get in touch and we'll answer any questions about DataFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/80 transition-colors duration-300 shadow-md">
                Contact Support
              </button>
              <button className="border-2 border-secondary text-darktext px-6 py-3 rounded-full font-semibold hover:bg-secondary/80 transition-colors duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;