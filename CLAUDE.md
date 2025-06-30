# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

wire84 is a financial market intelligence reporting platform that generates sophisticated HTML reports for institutional clients. The project consists of static HTML templates with embedded CSS that create dark-themed, professional financial reports featuring market sentiment analysis, trading ideas, and proprietary intelligence.

## Architecture

This is a static HTML website project with the following structure:

- **Root HTML files**: Main report templates served directly
  - `index.html` - Main application entry point (likely React-based, references bundled assets)
  - `market-report.html` - Standalone market intelligence report template
  - `southpoint.html` - Client-specific report for Southpoint Capital Advisors LP
  - `email-template.html` - Email-formatted report template

- **Source directory (`src/`)**: Development templates
  - `email-template.html` - Source template for email reports
  - `market-report.html` - Source template for market reports

- **Assets directory (`assets/`)**: Bundled production assets
  - `main-dkjgwl51.js` - Main JavaScript bundle (806KB)
  - `main-btwvbh90.css` - Main CSS bundle (32KB)

- **Static assets**:
  - `favicon.svg` - Site favicon
  - `wire84.png` - Logo/branding image

## Development Workflow

### File Organization
- The project appears to have both source templates (`src/`) and production-ready HTML files in the root
- The main `index.html` references bundled assets, suggesting a build process exists
- Other HTML files are standalone templates with embedded CSS for email/report distribution

### Styling Architecture
- Uses a consistent dark theme with Source Code Pro monospace font
- Color scheme: Black background (#000000) with gray borders and red accent colors (#ef4444)
- Grid-based layouts with responsive design for different screen sizes
- CSS is embedded directly in HTML files for standalone distribution

### Content Structure
All reports follow a consistent structure:
1. **Header** - Brand logo, title, date, and distribution info
2. **Market Sentiment** - Sentiment analysis, headlines categorized by impact
3. **Critical Alerts** - Risk assessments with confidence levels and recommendations
4. **Trading Ideas** - Buy/sell recommendations with entry/exit points and conviction matrices
5. **Deep Intelligence** - Proprietary data insights from satellite imagery, web scraping, etc.

### Report Types
1. **General Market Reports** - Broad market intelligence
2. **Client-Specific Reports** - Customized for specific capital management firms
3. **Email Templates** - Formatted for email distribution with enhanced styling

## Development Commands

Since this appears to be a static site with a build process:

```bash
# No package.json found, but based on bundled assets:
# Build process likely exists (framework unclear)
# Assets suggest Vite or similar bundler was used

# For development:
# - Edit source files in src/ directory
# - Build process generates root HTML files and assets/
# - Static files can be served directly from root

# To serve locally (example):
python -m http.server 8000
# or
npx serve .
```

## Important Notes

### Content Guidelines
- All reports contain sophisticated financial market analysis
- Uses professional terminology and statistical measures
- Reports include confidence levels, probability assessments, and quantitative metrics
- Content suggests this is for institutional/professional use only

### Template Maintenance
- HTML templates contain embedded CSS for standalone distribution
- Font loading from Google Fonts (Source Code Pro)
- SVG logos are embedded inline for portability
- Responsive design considerations for mobile viewing

### Brand Consistency
- wire84 branding throughout
- Consistent color scheme and typography
- Professional financial industry styling
- Restriction notices for authorized distribution only