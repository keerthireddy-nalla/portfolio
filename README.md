# Personal Portfolio Website

A clean, customizable portfolio website built with vanilla HTML, CSS, and JavaScript. The site is data-driven, with all content loaded dynamically from JSON files.

![Portfolio Preview](assets/images/profile_photo.jpg)

## Features

- **Fully responsive** design that works on all devices
- **Dark/light mode** theme toggle with user preference memory
- **Tabbed navigation** system for clean organization of content
- **Data-driven approach** with all content loaded from JSON
- **Social media integration** with icons both in header and contact section
- **No dependencies** - built with only HTML, CSS, and vanilla JavaScript

## Table of Contents

- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Customization](#customization)
- [Deployment](#deployment)
- [How It Works](#how-it-works)
- [License](#license)

## Setup

1. Clone or download this repository
2. Edit the `data/content.json` file to add your personal information
3. Replace images in the `assets/images` folder with your own
4. Test the site locally using a web server

### Quick Start

To view the site locally:

1. Open the project folder in Visual Studio Code
2. Install the "Live Server" extension
3. Right-click on `index.html` and select "Open with Live Server"

## Folder Structure

```
portfolio-website/
├── index.html            # Main HTML file with page structure
├── styles/
│   └── style.css         # All styling for the website
├── scripts/
│   └── main.js           # JavaScript for dynamic content loading and interactivity
├── data/
│   └── content.json      # All your personal data (bio, skills, projects, etc.)
├── assets/
│   ├── images/           # Your profile photo and project screenshots
│   └── icons/            # Icons for the website (if any)
└── README.md             # This file
```

## Customization

### Basic Information

Edit the `data/content.json` file to update your information:

- **basics**: Name, title, summary, contact info
- **skills**: Your technical and professional skills
- **projects**: Your portfolio projects with descriptions
- **resume**: Education and work experience 
- **certifications**: Professional certifications

### Colors and Styling

To change the color scheme, edit the CSS variables in `styles/style.css`:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #333333;
    --text-secondary: #555555;
    --accent-color: #4a6fa5;
    /* ... other variables ... */
}
```

### Adding Projects

To add a new project, add an entry to the "projects" array in `content.json`:

```json
{
  "name": "Project Name",
  "description": "Description of the project",
  "image": "assets/images/project-image.jpg",
  "url": "https://link-to-live-demo.com",
  "githubUrl": "https://github.com/yourusername/project-repo",
  "keywords": ["Keyword1", "Keyword2", "Keyword3"]
}
```

## Deployment

### GitHub Pages Deployment

To deploy your portfolio website to GitHub Pages:

1. Create a new GitHub repository
2. Push your code to the repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

3. Go to your repository settings on GitHub
4. Scroll down to the "GitHub Pages" section
5. Select the branch you want to deploy (usually `main`)
6. Select the root folder (`/`)
7. Click "Save"

Your site will be published at `https://yourusername.github.io/portfolio/`

### Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Purchase a domain from a domain registrar (like Namecheap, GoDaddy, etc.)
2. In your GitHub repository, go to Settings > Pages
3. Under "Custom domain", enter your domain name and save
4. Configure your domain's DNS settings according to GitHub's instructions
5. Wait for DNS propagation (can take up to 48 hours)

## How It Works

This portfolio uses a data-driven approach where all content is stored in `content.json` and loaded dynamically with JavaScript.

- The `main.js` file fetches this data and populates the HTML with your information
- The tabbed navigation system shows different sections of your portfolio
- The theme toggle allows visitors to switch between light and dark modes
- The site is fully responsive and works on all device sizes

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using HTML, CSS and vanilla JavaScript.
