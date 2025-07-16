Dataflow

Web Scraping Service

Dataflow is a web scraping service designed to extract data from websites. It provides a robust backend built with Django and Django REST Framework, and a modern frontend developed using React and TypeScript. This service allows users to define scraping configurations, specify elements to extract, and then perform scraping operations to retrieve desired information.

Features:
   • User Authentication: Secure user registration and login system.
   • Scraping Configuration Management: Users can create, view, and manage their web scraping configurations
   • Dynamic Element Selection: Define specific HTML elements to scrape using CSS selectors.
   • Multiple Element Types: Support for scraping various data types including text, links, and images.
   • Scalable Backend: Built with Django REST Framework for efficient API handling.
   • Interactive Frontend: A responsive React application for easy interaction with the service.

Backend
    • Django: High-level Python Web framework.
    • Django REST Framework: Powerful and flexible toolkit for building Web APIs.
    • BeautifulSoup4: Python library for pulling data out of HTML and XML files.
    • Requests: Python HTTP library for making web requests. 
    • SQLite3: Default database for development.

Frontend
    • React: JavaScript library for building user interfaces.
    • TypeScript: Superset of JavaScript that adds static types.
    • React Router DOM: Declarative routing for React.

Installation and Setup

To set up Dataflow locally, follow these steps:

Prerequisites
   • Python 3.x
   • Node.js and npm (or yarn)

Backend Setup
   1.Clone the repository
   2. Create a virtual environment and activate it
   3. Install backend dependencies
   4.Run database migrations:
   5.Create a superuser (for admin access):
   6.Run the Django development server:

Frontend Setup
   1.Navigate to the frontend directory:
   2.Install frontend dependencies:
   3.Start the React development server:



