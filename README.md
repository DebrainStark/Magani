Overview
Magani is a comprehensive healthcare administration automation platform designed specifically for the Nigerian healthcare ecosystem. The platform addresses the critical challenge of high Medical Loss Ratios (MLRs) faced by healthcare providers through AI-powered automation, verification services, and advanced analytics.
This repository contains the React-based landing page for Magani, showcasing its features, benefits, and value proposition to healthcare providers, payers, and patients.
🚀 Features

Automated Verification Service: Streamline eligibility, benefits, and treatment verification
AI-driven Analytics: Gain insights from healthcare utilization data
Automated Data Exchange: Secure sharing between providers and payers
Offline Capability: Functions without internet connection
Nigeria-specific Healthcare AI: Custom DeepSeek LLM model optimized for the Nigerian healthcare context

🛠️ Technologies

Frontend Framework: React 18
Animation: Framer Motion
Styling: Tailwind CSS
Icons: Lucide React
Build Tool: Vite
Code Quality: ESLint, Prettier

📂 Project Structure
magani-landing-page/
├── public/                  # Static assets
│   ├── images/              # Images and icons
│   ├── favicon.ico          # Website favicon
│   └── robots.txt           # Robots file for SEO
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.jsx   # Button component
│   │   │   ├── Card.jsx     # Card component
│   │   │   ├── FeatureBox.jsx # Feature box component
│   │   │   └── SectionTitle.jsx # Section title component
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.jsx   # Navigation bar
│   │   │   └── Footer.jsx   # Footer component
│   │   └── sections/        # Page sections
│   │       ├── Hero.jsx     # Hero section
│   │       ├── ProblemStatement.jsx # Problem statement section
│   │       ├── Stakeholders.jsx     # Stakeholders section
│   │       ├── Products.jsx         # Products section
│   │       ├── AiTechnology.jsx     # AI technology section
│   │       ├── RisksMitigation.jsx  # Risks & mitigations section
│   │       └── CallToAction.jsx     # Call to action section
│   ├── constants/           # Constant definitions
│   │   ├── navigation.js    # Navigation items
│   │   ├── stakeholders.js  # Stakeholder data
│   │   ├── products.js      # Product data
│   │   └── risks.js         # Risks data
│   ├── utils/               # Utility functions
│   │   └── helpers.js       # Helper functions
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global CSS
├── .gitignore               # Git ignore file
├── package.json             # NPM package config
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
⚙️ Installation & Setup
Prerequisites

Node.js (v16.0.0 or later)
npm (v8.0.0 or later) or yarn (v1.22.0 or later)

Installation Steps

Clone the repository
bashgit clone https://github.com/your-username/magani.git
cd magani-landing-page

Install dependencies
bashnpm install
# or
yarn install

Start the development server
bashnpm run dev
# or
yarn dev

Open your browser and visit http://localhost:5173

📋 Available Scripts

npm run dev: Starts the development server
npm run build: Builds the app for production
npm run preview: Previews the production build locally
npm run lint: Runs ESLint to check for code quality issues
npm run format: Formats code using Prettier

🧩 Component Structure
Common Components

Button: Reusable button component with different variants (primary, outline, etc.)
Card: Container component with shadow and border options
FeatureBox: Showcase features with icon and text
SectionTitle: Standardized section title with subtitle support

Layout Components

Navbar: Responsive navigation with mobile menu
Footer: Site footer with links and contact information

Section Components

Hero: Main landing section with CTA
ProblemStatement: Explains the healthcare problem in Nigeria (high MLR)
Stakeholders: Details benefits for different stakeholders (providers, payers, patients)
Products: Showcases the product suite
AiTechnology: Highlights the AI technology (DeepSeek LLM)
RisksMitigation: Addresses implementation risks and mitigations
CallToAction: Final call to action section


🚀 Performance Optimizations

Code Splitting: Lazy loading of section components
Image Optimization: Optimized images for faster loading
Memoization: React.memo for performance-critical components
CSS Optimization: Tailwind's JIT compiler for minimal CSS
Animation Performance: Hardware-accelerated animations

🌐 Deployment
Build for Production
bashnpm run build
# or
yarn build
This will create a dist directory with production-ready files.
Deployment Options

Vercel: Connect your GitHub repository to Vercel for automatic deployments
Netlify: Deploy using the Netlify CLI or connect to GitHub
GitHub Pages: Deploy to GitHub Pages using GitHub Actions

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request


🙏 Acknowledgements

Tailwind CSS
Framer Motion
Lucide Icons
React
Vite