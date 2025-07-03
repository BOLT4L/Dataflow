import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Save, XCircle, Trash2, Globe, Clock, FileText, Code, Settings2 } from 'lucide-react';

const ConfigurationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    frequency: 'daily',
    elements: [{ selector: '', attribute: 'text' }],
    output_Format: 'json',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [configurations, setConfigurations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleElementChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newElements = [...form.elements];
    newElements[index] = { ...newElements[index], [e.target.name]: e.target.value };
    setForm({ ...form, elements: newElements });
  };

  const addElement = () => {
    setForm({ ...form, elements: [...form.elements, { selector: '', attribute: 'text' }] });
  };

  const removeElement = (index: number) => {
    const newElements = form.elements.filter((_, i) => i !== index);
    setForm({ ...form, elements: newElements });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // TODO: Replace with actual user email from auth context if available
      const userEmail = localStorage.getItem('userEmail') || '';
      const payload = {
        email: userEmail,
        name: form.name,
        url: form.url,
        frequency: form.frequency,
        output_format: form.output_Format,
        elements: form.elements || [],
      };
      const response = await fetch('http://127.0.0.1:8000/api/accounts/scraping-configurations/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }
      setIsSaving(false);
      navigate('/dashboard/configurations');
    } catch (error) {
      setIsSaving(false);
      alert('Error saving configuration: ' + error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      setIsDeleting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Deleting configuration');
        setIsDeleting(false);
        navigate('/dashboard/configurations');
      }, 1500);
    }
  };

  useEffect(() => {
    const fetchConfigurations = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/scraping-configurations/', {
          credentials: 'include', // if you use cookies/session auth
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if you use token auth
          },
        });
        if (response.ok) {
          const data = await response.json();
          setConfigurations(data);
        } else {
          setConfigurations([]);
        }
      } catch (error) {
        setConfigurations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConfigurations();
  }, []);

  if (loading) {
    return <div>Loading configurations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard/configurations" className="inline-flex items-center gap-2 text-darktext hover:text-darktext transition-colors duration-300">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Configurations</span>
        </Link>
        <h1 className="text-2xl font-bold text-lovable-yellow-300">Create New Configuration</h1>
      </div>

      <div className="bg-darkcard rounded-xl shadow-lg border border-lovable-purple-900 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-lovable-yellow-300 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-darktext mb-2">
                  Configuration Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext"
                  placeholder="e.g., Competitor Price Tracker"
                  required
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-darktext mb-2">
                  Target URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lovable-purple-300" />
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext"
                    placeholder="https://example.com/products"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-darktext mb-2">
                  Collection Frequency
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lovable-purple-300" />
                  <select
                    id="frequency"
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="outputFormat" className="block text-sm font-medium text-darktext mb-2">
                  Output Format
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lovable-purple-300" />
                  <select
                    id="outputFormat"
                    name="outputFormat"
                    value={form.output_Format}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext"
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="xml">XML</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Data Elements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-lovable-yellow-300">Data Elements to Collect</h2>
              <button
                type="button"
                onClick={addElement}
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-lovable-red-600 transition-colors duration-300 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                Add Element
              </button>
            </div>

            <div className="space-y-4">
              {form.elements.map((element, index) => (
                <div key={index} className="bg-lovable-purple-800 p-6 rounded-lg border border-lovable-purple-700 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  <button
                    type="button"
                    onClick={() => removeElement(index)}
                    className="absolute top-3 right-3 text-lovable-purple-400 hover:text-primary"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                  <div>
                    <label htmlFor={`selector-${index}`} className="block text-sm font-medium text-darktext mb-2">
                      CSS Selector
                    </label>
                    <div className="relative">
                      <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lovable-purple-300" />
                      <input
                        type="text"
                        id={`selector-${index}`}
                        name="selector"
                        value={element.selector}
                        onChange={(e) => handleElementChange(index, e)}
                        className="w-full pl-10 pr-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext"
                        placeholder="e.g., .product-title"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`attribute-${index}`} className="block text-sm font-medium text-darktext mb-2">
                      Attribute to Extract
                    </label>
                    <div className="relative">
                      <Settings2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lovable-purple-300" />
                      <select
                        id={`attribute-${index}`}
                        name="attribute"
                        value={element.attribute}
                        onChange={(e) => handleElementChange(index, e)}
                        className="w-full pl-10 pr-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext"
                      >
                        <option value="text">Text Content</option>
                        <option value="href">Link (href)</option>
                        <option value="src">Image Source (src)</option>
                        <option value="alt">Image Alt Text (alt)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {form.elements.length === 0 && (
                <p className="text-darktext text-center py-4">Add data elements to extract.</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-primary hover:bg-lovable-red-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-5 h-5" />
              {isDeleting ? 'Deleting...' : 'Delete Configuration'}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-lovable-red-600 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigurationForm;