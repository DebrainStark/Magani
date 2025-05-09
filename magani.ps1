
Set-Location -Path "magani-landing-page"

# Create public directory structure
New-Item -Path "public" -ItemType Directory
New-Item -Path "public\favicon.ico" -ItemType File
New-Item -Path "public\robots.txt" -ItemType File
New-Item -Path "public\images" -ItemType Directory
New-Item -Path "public\images\logo.svg" -ItemType File
New-Item -Path "public\images\hero-bg.jpg" -ItemType File
New-Item -Path "public\images\verification-icon.svg" -ItemType File
New-Item -Path "public\images\analytics-icon.svg" -ItemType File
New-Item -Path "public\images\exchange-icon.svg" -ItemType File

# Create src directory structure
New-Item -Path "src" -ItemType Directory
New-Item -Path "src\main.jsx" -ItemType File
New-Item -Path "src\App.jsx" -ItemType File
New-Item -Path "src\index.css" -ItemType File

# Create components directory
New-Item -Path "src\components" -ItemType Directory

# Create common components
New-Item -Path "src\components\common" -ItemType Directory
New-Item -Path "src\components\common\Button.jsx" -ItemType File
New-Item -Path "src\components\common\Card.jsx" -ItemType File
New-Item -Path "src\components\common\FeatureBox.jsx" -ItemType File
New-Item -Path "src\components\common\SectionTitle.jsx" -ItemType File

# Create layout components
New-Item -Path "src\components\layout" -ItemType Directory
New-Item -Path "src\components\layout\Navbar.jsx" -ItemType File
New-Item -Path "src\components\layout\Footer.jsx" -ItemType File

# Create section components
New-Item -Path "src\components\sections" -ItemType Directory
New-Item -Path "src\components\sections\Hero.jsx" -ItemType File
New-Item -Path "src\components\sections\ProblemStatement.jsx" -ItemType File
New-Item -Path "src\components\sections\Stakeholders.jsx" -ItemType File
New-Item -Path "src\components\sections\Products.jsx" -ItemType File
New-Item -Path "src\components\sections\AiTechnology.jsx" -ItemType File
New-Item -Path "src\components\sections\RisksMitigation.jsx" -ItemType File
New-Item -Path "src\components\sections\CallToAction.jsx" -ItemType File

# Create constants directory
New-Item -Path "src\constants" -ItemType Directory
New-Item -Path "src\constants\navigation.js" -ItemType File
New-Item -Path "src\constants\stakeholders.js" -ItemType File
New-Item -Path "src\constants\products.js" -ItemType File
New-Item -Path "src\constants\risks.js" -ItemType File

# Create utils directory
New-Item -Path "src\utils" -ItemType Directory
New-Item -Path "src\utils\helpers.js" -ItemType File

Write-Host "Magani landing page directory structure has been created successfully!" -ForegroundColor Green