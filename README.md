# LinkedIn to CV Generator

An AI-powered web application that transforms LinkedIn PDF profiles into professional, ATS-optimized CVs with multiple customizable templates.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## 🌟 Features

### 🤖 AI-Powered Extraction
- **Intelligent PDF Parsing**: Automatically extracts information from LinkedIn PDF exports using Google's Gemini AI
- **Smart Content Optimization**: Rewrites job descriptions using the STAR method (Situation-Task-Action-Result)
- **ATS-Friendly**: Generates content optimized for Applicant Tracking Systems
- **Multi-language Support**: Translates CV content while preserving company and school names

### 🎨 Professional Templates
- **4 Unique Designs**: Choose from professionally designed templates
  - **Template 1**: Dark sidebar with clean layout
  - **Template 2**: Navy blue sidebar with circular language indicators
  - **Template 3**: Light blue header with elegant styling
  - **Template 4**: Black header with progress bar skills
- **Responsive Preview**: Real-time preview of your CV as you customize
- **PDF Export**: Download your CV as a print-ready A4 PDF

### ✨ Customization Features
- **Skill Visibility Toggle**: Show/hide individual skills with eye icon
- **Drag & Drop Reordering**: Rearrange skills, certifications, and languages
- **Smart Visibility**: AI automatically shows top 4-5 most relevant skills
- **Certification Management**: Add and manage professional certifications
- **Language Selection**: Generate CVs in Italian, English, Spanish, French, or German

### 📄 Single-Page A4 Optimization
- **Strict Length Control**: AI enforces content limits to fit one A4 page
- **Smart Truncation**: Automatically selects most relevant experiences
- **Concise Descriptions**: Maximum 2-3 bullet points per role
- **Optimized Sections**: Balanced layout across all sections

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Linkedin-To-CV.git
   cd Linkedin-To-CV
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Step 1: Export Your LinkedIn Profile
1. Go to your LinkedIn profile
2. Click "More" → "Save to PDF"
3. Download the PDF file

### Step 2: Upload and Generate
1. Open the application
2. Select your preferred language (Italian, English, Spanish, French, German)
3. Upload your LinkedIn PDF
4. Click "Generate CV" and wait for AI processing

### Step 3: Customize
1. **Choose a Template**: Select from 4 professional designs
2. **Customize Content**:
   - Toggle skill visibility with the eye icon
   - Drag and drop to reorder skills
   - Show/hide certifications
   - Reorder languages

### Step 4: Download
- Click "Download PDF" to get your professional CV in A4 format

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **@react-pdf/renderer** - PDF generation
- **@dnd-kit** - Drag and drop functionality
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Google Generative AI (Gemini)** - AI-powered content extraction and optimization
- **pdf-parse** - PDF text extraction

### Template Customization
Each template has two versions:
- **Web version** (`*Web.tsx`): For browser preview
- **PDF version** (`*Pdf.tsx`): For PDF export

Modify colors, fonts, layouts in these files to match your brand.

## 🌍 Supported Languages

- 🇮🇹 Italian (Italiano)
- 🇬🇧 English
- 🇪🇸 Spanish (Español)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)

## 📊 AI Content Optimization

The AI model (Gemini) is configured to:
- **Rank skills by ATS relevance**: Most important skills appear first
- **Apply STAR method**: Rewrites descriptions with Situation-Task-Action-Result
- **Enforce A4 limits**: Maximum 800 words total
- **Preserve proper nouns**: Company names, schools, certifications stay in original language
- **Translate descriptions**: Job descriptions, summaries, skills translated to target language

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


