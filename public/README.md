# VAYO - Creating Community to Connect

**Stop Searching. Start Belonging.**

VAYO is a community-driven social platform that helps people discover meaningful connections with others who share their interests and vibe. Instead of endless scrolling through profiles, AI finds your people in under 2 seconds.

---

## Project Overview

VAYO Commune is a modern web platform designed to facilitate real-life community connections. Users can join a waitlist to gain exclusive early access to a platform that focuses on genuine human connections through shared activities, hobbies, and experiences rather than traditional online dating or social networking.

**Tagline:** "No searching. No scrolling. Just belonging."

---

## Project Architecture

### Directory Structure

```
VAYO_temp/
├── index.html              # Landing page with hero section
├── form.html               # Waitlist signup form
├── script.js               # Form validation & geolocation logic
├── style.css               # Main styling & animations
├── form.css                # Form-specific styling
├── favicon.png             # Browser icon
├── assets/                 # Media assets
│   ├── vayo-logo.png       # Brand logo
│   └── pin_bg_2.mp4        # Background video animation
├── public/                 # Static files for deployment
└── README.md               # This file
```

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with animations and gradients
- **Validation**: libphonenumber-js for international phone number validation
- **Video**: HTML5 video element with background animations
- **Fonts**: Google Fonts (Inter family)
- **3D Graphics**: Three.js library support
- **Version Control**: Git

---

## Key Features

### 1. **Landing Page** (`index.html`)
- Modern hero section with brand messaging
- Animated background video
- Navigation bar with call-to-action buttons
- Comprehensive footer with office locations and contact information
- Responsive design optimized for all devices

### 2. **Waitlist Form** (`form.html`)
- **User Information Collection**:
  - First Name
  - Last Name
  - Email Address
  - Phone Number with country code
  
- **Advanced Validation** (`script.js`):
  - International phone number validation using libphonenumber-js
  - Automatic country detection based on user's IP geolocation
  - Real-time phone number format validation
  - Support for 50+ countries worldwide
  - Pre-filled country selection for better UX

### 3. **Branding & Design**
- Consistent visual language across pages
- Modern typography with Inter font family
- Gradient overlays and glassmorphism effects
- Video background for immersive experience
- Cohesive color scheme and spacing

---

## Responsive Features

- **Mobile-First Design**: Optimized for smartphone, tablet, and desktop
- **Viewport Configuration**: Proper meta tags for responsive scaling
- **Touch-Friendly UI**: Large buttons and inputs for easy interaction
- **Cross-Browser Compatibility**: Works on all modern browsers

---

## Global Reach

### Supported Countries (50+)
- Americas: US, CA, MX, BR, AR, and more
- Europe: UK, Germany, France, Italy, Spain, Nordic countries, etc.
- Asia-Pacific: India, China, Japan, Singapore, Australia, NZ, and more
- Middle East: Saudi Arabia, UAE, and region
- Africa: South Africa, Nigeria, Egypt, and more

Automatic IP-based country detection provides seamless UX for international users.

---

## Form Validation

### Phone Number Validation
- Validates against E.164 international standard
- Accepts 7-15 digit phone numbers
- Real-time validation feedback (✓ or ✗)
- Graceful fallback if libphonenumber library is delayed
- Country-specific validation rules

### Data Fields
- **Required Fields**: First Name, Last Name, Email, Country Code, Phone Number
- **Email Validation**: HTML5 email type validation
- **Error Handling**: User-friendly error messages

---

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required for basic functionality
- Internet connection for external libraries (Google Fonts, Three.js, libphonenumber)

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd VAYO_temp
   ```

2. **Open in Browser**
   - Navigate to `index.html` in your web browser
   - Or use a local development server:
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```

3. **Access the Application**
   - Landing Page: `http://localhost:8000/index.html`
   - Waitlist Form: `http://localhost:8000/form.html`

---

## What This Project Showcases

### For Users
- Modern, professional web presence
- Clear value proposition: AI-powered community matching
- Easy waitlist signup process
- International support with automatic localization
- Mobile-friendly experience

### For Developers
- Clean, modular HTML/CSS/JS structure
- Advanced CSS animations and styling techniques
- Real-world form validation implementation
- Geolocation and internationalization patterns
- Integration of third-party libraries (libphonenumber, Three.js)
- Performance-optimized with lazy loading capabilities

### For the Business
- Professional brand presence
- Engaging multimedia experience
- Effective conversion funnel (landing → waitlist)
- Global market reach
- User data collection for analytics

---

## File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Main landing page with hero, nav, and footer |
| `form.html` | Waitlist signup form page |
| `script.js` | Form validation, phone number handling, geolocation |
| `style.css` | Main stylesheet for landing page |
| `form.css` | Stylesheet for form page |
| `favicon.png` | Browser tab icon |
| `assets/vayo-logo.png` | VAYO brand logo |
| `assets/pin_bg_2.mp4` | Background video animation |

---

## Links

- **Website**: Landing page at `index.html`
- **Waitlist**: Form page at `form.html`
- **Headquarters**: 1087 B, Sankranthi, Perumbaikkad, Kottayam - 686016, Kerala
- **Operations**: Koramangala 8th Block, Bangalore - 560095, Karnataka

---

## License

This project is part of the Laneway Company portfolio. All rights reserved.

---

## Support

For inquiries or feature requests, please contact the VAYO team through the contact information provided in the footer.

---

**VAYO: Where communities connect and belonging begins.**
