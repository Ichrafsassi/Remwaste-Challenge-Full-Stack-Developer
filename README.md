# SmartSkip - Skip Hire Web Application

A modern, responsive React web application for skip hire booking with a multi-step wizard interface.

## 🚀 Features

- **Multi-step Wizard**: 6-step booking process with progress tracking
- **API Integration**: Dynamic skip data fetching from external API
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **State Management**: React Context for global state with localStorage persistence
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean design with Tailwind CSS and Lucide icons

## 📋 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # App header with branding and theme toggle
│   │   └── ProgressIndicator.tsx # Step progress tracker
│   ├── Steps/
│   │   ├── PostcodeStep.tsx     # Step 1: Location entry
│   │   ├── WasteTypeStep.tsx    # Step 2: Waste type selection
│   │   ├── SelectSkipStep.tsx   # Step 3: Skip size selection (main focus)
│   │   ├── PermitCheckStep.tsx  # Step 4: Permit requirements
│   │   ├── ChooseDateStep.tsx   # Step 5: Delivery date selection
│   │   └── PaymentStep.tsx      # Step 6: Payment processing
│   ├── SkipCard.tsx            # Reusable skip card component
│   └── SmartSkipWizard.tsx     # Main wizard orchestrator
├── context/
│   └── AppContext.tsx          # Global state management with React Context
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Root application component
└── main.tsx                   # Application entry point
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Context** - State management solution

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smartskip-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Key Components

### SkipCard Component
The `SkipCard` component is a reusable card that displays:
- Skip size and hire period
- Pricing with VAT breakdown
- Feature badges (on-road allowed, heavy waste)
- Selection state with visual feedback

### API Integration
The app fetches skip data from:
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

Data includes:
- Skip ID and size
- Pricing (before VAT and VAT amount)
- Hire period information
- Permission flags (road placement, heavy waste)

### State Management
Using React Context to manage:
- Form data across all steps
- Current step tracking
- Theme preference
- Persistent storage with localStorage

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful gradient overlays
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Visual Feedback**: Clear selection states and loading indicators

## 📱 Responsive Design

- **Mobile**: Single column layout with touch-friendly interactions
- **Tablet**: Two-column grid with optimized spacing
- **Desktop**: Three-column grid with enhanced visual hierarchy

## 🔧 Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Step 3 Highlights (Select Skip Size)

The skip selection step features:
- **Dynamic API Data**: Real-time skip availability
- **Visual Skip Cards**: Image placeholders with gradient backgrounds
- **Price Calculations**: Including VAT with clear breakdown
- **Feature Badges**: Visual indicators for skip capabilities
- **Loading States**: Smooth loading experience with fallback data
- **Error Handling**: Graceful error handling with retry options
- **Recommendations**: Helpful guidance for skip size selection

## 🎯 Best Practices Implemented

- **Clean Code**: Well-commented, modular architecture
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized renders and lazy loading
- **Accessibility**: WCAG compliant design
- **SEO Friendly**: Semantic HTML and meta tags
- **Error Boundaries**: Graceful error handling
- **Loading States**: Clear user feedback during async operations

## 📦 Production Ready

The application is built with production considerations:
- Optimized bundle size
- Progressive enhancement
- Graceful degradation
- Cross-browser compatibility
- Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.