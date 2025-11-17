# Color Sense

**See the world through different eyes.**

Color Sense is a Web3-powered accessibility platform powered by the Polkadot ecosystem. It helps designers, developers, and creators understand color blindness and build more inclusive digital experiences through interactive tools, real-time feedback, and educational resources.

## 🎯 Project Overview

Color Sense addresses a critical gap in digital design: **over 300 million people experience color blindness**, yet most interfaces are built without considering their needs. Our platform combines empathy, education, and practical tools to make accessibility a core part of the design process.

### Objectives

- **Empower Designers**: Provide intuitive tools to test and improve color accessibility in real-time
- **Educate Creators**: Help users understand different types of color vision deficiencies through interactive simulations
- **Drive Engagement**: Use gamification to encourage consistent accessibility practices
- **Web3 Integration**: Leverage Polkadot's decentralized ecosystem for user authentication and future blockchain features
- **Build Empathy**: Enable users to experience designs through the eyes of people with color vision deficiencies

## ✨ What It Does

Color Sense is a comprehensive accessibility platform that offers:

### 1. **Color Vision Simulator**
- Upload images and see how they appear to people with different types of color blindness
- Supports 9 vision modes: Normal, Deuteranopia, Protanopia, Tritanopia, Achromatopsia, Deuteranomaly, Protanomaly, Tritanomaly, and Monochromacy
- Real-time image transformation using advanced color filtering algorithms
- Save and share transformed images to demonstrate accessibility considerations

### 2. **Accessibility Checker**
- Check color contrast ratios between foreground and background colors
- Get instant WCAG compliance feedback (AA and AAA standards)
- Live preview of color combinations
- Save accessibility reports for documentation
- Receive actionable guidance for improving contrast

### 3. **Gamification System**
- Earn Color Tokens for performing accessibility checks, running simulations, and saving reports
- Track your progress with detailed statistics
- Unlock achievements as you explore different vision modes and complete accessibility tasks
- View your contribution history and impact

### 4. **Web3 Authentication**
- Connect using any Polkadot-compatible wallet (Polkadot.js Extension, Talisman, SubWallet, Nova Wallet)
- Wallet-based authentication ensures secure, decentralized access
- Your wallet address serves as your unique identity in the platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- A Polkadot-compatible wallet extension installed in your browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Color-Sense
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Usage

1. **Connect Your Wallet**
   - On the landing page, click "Connect Wallet"
   - Select your installed Polkadot wallet from the list
   - Authorize the connection in your wallet extension
   - Once connected, you'll be redirected to the main application

2. **Explore the Dashboard**
   - View your token balance and wallet information
   - See your activity statistics (contrast checks, reports saved, images shared, vision modes tested)
   - Access quick actions: Try Simulator or Run Checker

3. **Use the Simulator**
   - Navigate to "Simulator" from the sidebar
   - Upload an image or use your camera
   - Select a vision mode to see how the image appears
   - Save or share transformed images

4. **Check Accessibility**
   - Navigate to "Accessibility" from the sidebar
   - Enter foreground and background colors
   - Get instant contrast ratio and WCAG compliance feedback
   - Save reports for your projects

5. **View Your Profile**
   - Check your token balance and total earned
   - View your achievements and activity history
   - See detailed statistics of your contributions

## 🛠️ Technologies & Dependencies

### Core Framework
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **React DOM 19.2.0** - React rendering

### Web3 & Blockchain
- **@polkadot/extension-dapp ^0.62.4** - Polkadot wallet integration
- **@polkadot/util ^13.5.8** - Polkadot utility functions
- **@polkadot/util-crypto ^13.5.8** - Cryptographic utilities

### UI Components & Styling
- **Tailwind CSS ^4.1.17** - Utility-first CSS framework
- **@radix-ui/react-dialog ^1.1.15** - Accessible dialog components
- **@radix-ui/react-dropdown-menu ^2.1.16** - Dropdown menu components
- **@radix-ui/react-avatar ^1.1.11** - Avatar components
- **@radix-ui/react-alert-dialog ^1.1.15** - Alert dialog components
- **@radix-ui/react-slot ^1.2.4** - Slot component for composition
- **lucide-react ^0.553.0** - Icon library
- **class-variance-authority ^0.7.1** - Component variant management
- **clsx ^2.1.1** - Conditional class names
- **tailwind-merge ^3.4.0** - Merge Tailwind classes

### Utilities & Features
- **sonner ^2.0.7** - Toast notifications
- **postcss ^8.5.6** - CSS processing
- **tw-animate-css ^1.4.0** - Animation utilities

### Development Tools
- **ESLint ^9** - Code linting
- **eslint-config-next 16.0.1** - Next.js ESLint configuration

## 🎨 Key Features

### Responsive Design
- Fully responsive layout that works on mobile, tablet, and desktop
- Adaptive sidebar that collapses on smaller screens
- Touch-friendly controls and interactions

### Real-time Feedback
- Instant color contrast calculations
- Live preview of color combinations
- Real-time image transformation in the simulator

### User Experience
- Smooth animations and transitions
- Toast notifications for user actions
- Tooltips for collapsed sidebar navigation
- Confirmation dialogs for critical actions

### Accessibility First
- WCAG AA and AAA compliance checking
- Support for multiple color vision deficiency types
- Educational content about color blindness
- Actionable guidance for improving accessibility

## 🔐 Security & Privacy

- Wallet-based authentication using Polkadot's secure extension system
- No sensitive data stored on servers
- All wallet interactions require explicit user authorization
- Client-side processing for image transformations and contrast calculations

## 📱 Supported Wallets

Color Sense supports the following Polkadot-compatible wallets:

- **Polkadot.js Extension** - Official Polkadot wallet extension
- **Talisman** - User-friendly Polkadot wallet
- **SubWallet** - Multi-chain wallet supporting Polkadot
- **Nova Wallet** - Mobile-first Polkadot wallet

## 🎯 The Aim Behind Color Sense

Color Sense was created to bridge the gap between design intention and accessibility reality. Our mission is to:

1. **Foster Empathy**: By allowing designers to see their work through different eyes, we create understanding and drive inclusive design decisions.

2. **Make Accessibility Accessible**: Complex WCAG guidelines become simple, actionable feedback that anyone can understand and implement.

3. **Build Better Digital Experiences**: Every color contrast check, every simulation, and every saved report contributes to a more inclusive web.

4. **Empower the Polkadot Community**: By integrating Web3 authentication, we're building a foundation for future decentralized features while ensuring user ownership and control.

5. **Drive Consistent Practice**: Through gamification and tracking, we encourage designers to make accessibility a regular part of their workflow, not an afterthought.

## 🏗️ Project Structure

```
Color-Sense/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── app/            # Main application components
│   │   ├── landing/        # Landing page components
│   │   ├── tokens/         # Token system components
│   │   ├── wallet/         # Wallet integration components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── layout/             # Layout components
│   ├── lib/                # Utilities and services
│   │   ├── services/       # Business logic services
│   │   └── utils/          # Helper functions
│   └── middleware.js       # Next.js middleware
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Please ensure that:
- All code follows the existing style and patterns
- Accessibility is maintained or improved
- New features include appropriate tests
- Documentation is updated for significant changes

<!-- ## 📄 License

This project is private and proprietary. -->

---

**Built with ❤️ for a more inclusive digital world.**
