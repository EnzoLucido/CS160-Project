# CS160-Project - Pet Shelter App

A React-based web application for finding pet shelters and matching the pets owners' own pets with pets in shelters based on pet information. Built with React, React Router, and Vite.

## Features

- **Find a Shelter**: Search for pet shelters near you
- **Shelter Details**: View shelter information including address, phone, and website
- **Send Pet Information**: Send your pet's information to shelters
- **My Pets**: Manage your pet information
- **Profile**: View and edit your profile
- **Status**: View the status of your pet's information sent to shelters
ß
## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 20.19.0 or higher, or 22.12.0 or higher)
  - Check your version: `node --version`
  - Download from: https://nodejs.org/
- **npm** (comes with Node.js)
  - Check your version: `npm --version`

## Setup Instructions

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd CS160-Project
   ```

2. **Navigate to the React app directory**:
   ```bash
   cd react-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with hot reload)

To run the application in development mode with hot reload:

```bash
cd react-app
npm run dev
```

The application will start and be available at:
- **Local**: http://localhost:5173
- **Network**: Your local network IP will also be displayed

The development server includes:
- Hot Module Replacement (HMR) - changes appear instantly without refresh
- Fast refresh for React components
- Detailed error messages in the browser

### Build for Production

To create an optimized production build:

```bash
cd react-app
npm run build
```

The built files will be in the `react-app/dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
cd react-app
npm run preview
```

## Available Scripts

From the `react-app` directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
CS160-Project/
├── react-app/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Home page with feature cards
│   │   │   ├── ShelterSearch.jsx     # Shelter search page
│   │   │   ├── ShelterDetail.jsx     # Shelter details page
│   │   │   └── Confirmation.jsx      # Confirmation page
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── main.jsx                  # Application entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── index.html                    # HTML template
│   ├── package.json                  # Dependencies and scripts
│   └── vite.config.js               # Vite configuration
└── README.md                         # This file
```

## Technologies Used

- **React** 19.2.0 - UI library
- **React Router DOM** 7.9.6 - Client-side routing
- **Vite** 7.2.4 - Build tool and dev server
- **ESLint** - Code linting and quality

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.).

### Dependencies not installing
Try clearing npm cache and reinstalling:
```bash
cd react-app
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Node version issues
Make sure you're using Node.js version 20.19.0+ or 22.12.0+. You can use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:
```bash
nvm install 22
nvm use 22
```

## License

This project is for educational purposes as part of CS160.