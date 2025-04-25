// Main JavaScript file for the portfolio website

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const profileSelect = document.getElementById('profile-select');

// Global content object to store loaded data
let portfolioContent = {};
let availableProfiles = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set up theme toggle
    initThemeToggle();
    
    // Set up tab navigation
    initTabNavigation();
    
    // Load content data
    loadContent();
    
    // Set up profile selector
    initProfileSelector();
    
    // Set up CV download button
    initCVDownload();
});

// Initialize tab navigation functionality
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Only process if it's not a dropdown toggle
            if (!button.classList.contains('dropdown-toggle')) {
                const tabId = button.getAttribute('data-tab');
                switchTab(tabId);
            }
        });
    });
    
    // Check if there's a tab in URL hash
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        if (document.getElementById(tabId)) {
            switchTab(tabId);
        }
    }
}

// Switch active tab
function switchTab(tabId) {
    // Update URL hash
    window.location.hash = tabId;
    
    // Update active class on buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update active class on tab panes
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        if (pane.id === tabId) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });
}

// Initialize theme toggle functionality
function initThemeToggle() {
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Add event listener for theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Load content from JSON file
function loadContent(profile = 'default') {
    const contentUrl = profile === 'default' ? 
        'data/content.json' : 
        `data/content-${profile}.json`;
    
    fetch(contentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load content. Using default content instead.');
            }
            return response.json();
        })
        .then(data => {
            portfolioContent = data;
            renderContent();
            checkAvailableProfiles();
        })
        .catch(error => {
            console.error('Error loading content:', error);
            // If a specific profile fails to load, try loading the default
            if (profile !== 'default') {
                loadContent('default');
            }
        });
}

// Check for available profiles
function checkAvailableProfiles() {
    fetch('data/profiles.json')
        .then(response => {
            if (!response.ok) {
                return { profiles: ['default'] };
            }
            return response.json();
        })
        .then(data => {
            availableProfiles = data.profiles || ['default'];
            updateProfileSelector();
        })
        .catch(error => {
            console.error('Error loading profiles list:', error);
            availableProfiles = ['default'];
            updateProfileSelector();
        });
}

// Update profile selector dropdown
function updateProfileSelector() {
    // Clear existing options except the first one (default)
    while (profileSelect.options.length > 1) {
        profileSelect.remove(1);
    }
    
    // Add options for each available profile
    availableProfiles.forEach(profile => {
        if (profile === 'default') return; // Skip default as it's already there
        
        const option = document.createElement('option');
        option.value = profile;
        option.textContent = profile.charAt(0).toUpperCase() + profile.slice(1);
        profileSelect.appendChild(option);
    });
    
    // Set current profile
    const urlParams = new URLSearchParams(window.location.search);
    const currentProfile = urlParams.get('profile') || 'default';
    profileSelect.value = currentProfile;
}

// Initialize profile selector
function initProfileSelector() {
    profileSelect.addEventListener('change', () => {
        const selectedProfile = profileSelect.value;
        // Update URL with selected profile
        const url = new URL(window.location);
        if (selectedProfile === 'default') {
            url.searchParams.delete('profile');
        } else {
            url.searchParams.set('profile', selectedProfile);
        }
        window.history.pushState({}, '', url);
        
        // Load selected profile content
        loadContent(selectedProfile);
    });
}

document.getElementById('download-cv-btn').addEventListener('click', function () {
    const cvUrl = 'assets/docs/KeerthiReddyNalla_cv.pdf'; // Replace with the actual path to your CV file
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'KeerthiReddyNalla_cv.pdf'; // Replace with the desired file name
    link.click();
});




// Render content to the DOM
function renderContent() {
    // Basic info
    renderBasicInfo();
    
    // Skills
    renderSkills();
    
    // Resume
    renderResume();
    
    // Projects
    renderProjects();
    
    // Certifications
    renderCertifications();
    
    // Contact and social links
    renderContact();
    
    // Footer
    renderFooter();
    
    // Set LinkedIn URL
    setLinkedInLink();
}

// Render basic profile information
function renderBasicInfo() {
    // Profile image
    const profileImageEl = document.getElementById('profile-image');
    profileImageEl.innerHTML = `
        <img src="${portfolioContent.basics.image || 'assets/images/default-profile.jpg'}" alt="${portfolioContent.basics.name}">
    `;
    
    // Name and title
    document.getElementById('name').textContent = portfolioContent.basics.name;
    document.getElementById('title').textContent = portfolioContent.basics.label;
    
    // Header social links (LinkedIn and GitHub)
    const headerSocialLinks = document.getElementById('header-social-links');
    headerSocialLinks.innerHTML = '';
    
    if (portfolioContent.basics && portfolioContent.basics.profiles) {
        // Map network names to Font Awesome icons
        const iconMap = {
            'GitHub': 'fab fa-github',
            'LinkedIn': 'fab fa-linkedin-in'
        };
        
        // Filter for LinkedIn and GitHub profiles only for the header
        const headerProfiles = portfolioContent.basics.profiles.filter(
            profile => profile.network === 'LinkedIn' || profile.network === 'GitHub'
        );
        
        headerProfiles.forEach(profile => {
            const icon = iconMap[profile.network] || 'fas fa-link';
            
            const linkEl = document.createElement('a');
            linkEl.href = profile.url;
            linkEl.className = 'header-social-link';
            linkEl.target = '_blank';
            linkEl.rel = 'noopener';
            linkEl.innerHTML = `<i class="${icon}"></i>`;
            linkEl.title = profile.network;
            
            headerSocialLinks.appendChild(linkEl);
        });
    }
    
    // Bio
    document.getElementById('bio').innerHTML = portfolioContent.basics.summary;
    
    // Page title
    document.title = `${portfolioContent.basics.name} | Portfolio`;
}

// Render skills section
function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    
    portfolioContent.skills.forEach(skill => {
        const skillEl = document.createElement('div');
        skillEl.className = 'skill-item';
        skillEl.innerHTML = `
            <h3>${skill.name}</h3>
        `;
        skillsContainer.appendChild(skillEl);
    });
}

// Render projects section
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    portfolioContent.projects.forEach(project => {
        const projectEl = document.createElement('div');
        projectEl.className = 'project-card';
        
        // Project image
        const imageUrl = project.image || 'assets/images/default-project.jpg';
        
        // Project tags
        const tagsHtml = project.keywords 
            ? project.keywords.map(tag => `<span class="project-tag">${tag}</span>`).join('')
            : '';
        
        // Project links
        let linksHtml = '';
        if (project.url) {
            linksHtml += `
                <a href="${project.url}" target="_blank" rel="noopener" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            `;
        }
        if (project.githubUrl) {
            linksHtml += `
                <a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link">
                    <i class="fab fa-github"></i> Source Code
                </a>
            `;
        }
        
        projectEl.innerHTML = `
            <div class="project-image">
                <img src="${imageUrl}" alt="${project.name}">
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-links">${linksHtml}</div>
            </div>
        `;
        
        projectsContainer.appendChild(projectEl);
    });
}

// Render resume section
function renderResume() {
    const resumeContainer = document.getElementById('resume-content');
    
    // Check if resume data exists
    if (!portfolioContent.resume) {
        resumeContainer.innerHTML = '<p>Resume information is currently unavailable.</p>';
        return;
    }
    
    let resumeHTML = '';
    
    
    
    // Work experience section
    if (portfolioContent.resume.work && portfolioContent.resume.work.length > 0) {
        resumeHTML += `
            <div class="resume-section">
                <h3>Work Experience</h3>
                <div class="resume-items">
        `;
        
        portfolioContent.resume.work.forEach(item => {
            resumeHTML += `
                <div class="resume-item">
                    <div class="resume-item-header">
                        <h4>${item.position} at ${item.company}</h4>
                        <span class="resume-date">${item.startDate || ''} - ${item.endDate || 'Present'}</span>
                    </div>
                    <p class="resume-subtitle">${item.location || ''}</p>
                    <p>${item.description || ''}</p>
                </div>
            `;
        });
        
        resumeHTML += `
                </div>
            </div>
        `;
    }
    // Education section
    if (portfolioContent.resume.education && portfolioContent.resume.education.length > 0) {
        resumeHTML += `
            <div class="resume-section">
                <h3>Education</h3>
                <div class="resume-items">
        `;
        
        portfolioContent.resume.education.forEach(item => {
            resumeHTML += `
                <div class="resume-item">
                    <div class="resume-item-header">
                        <h4>${item.institution}</h4>
                        <span class="resume-date">${item.startDate || ''} - ${item.endDate || 'Present'}</span>
                    </div>
                    <p class="resume-subtitle">${item.area} • ${item.studyType}</p>
                    <p>${item.description || ''}</p>
                </div>
            `;
        });
        
        resumeHTML += `
                </div>
            </div>
        `;
    }
    resumeContainer.innerHTML = resumeHTML || '<p>Resume information is currently unavailable.</p>';
}

// Render certifications section
function renderCertifications() {
    const certificationsContainer = document.getElementById('certifications-container');
    
    // Check if certifications data exists
    if (!portfolioContent.certifications || portfolioContent.certifications.length === 0) {
        certificationsContainer.innerHTML = '<p>No certifications available at the moment.</p>';
        return;
    }
    
    let certsHTML = '<div class="certifications-grid">';
    
    portfolioContent.certifications.forEach(cert => {
        certsHTML += `
            <div class="certification-card">
                <div class="certification-logo">
                    <img src="${cert.logo || 'assets/images/default-cert.png'}" alt="${cert.name} logo">
                </div>
                <div class="certification-info">
                    <h3>${cert.name}</h3>
                    <p>${cert.issuer}</p>
                    <p class="certification-date">Issued: ${cert.issueDate}</p>
                    ${cert.expirationDate ? `<p class="certification-date">Expires: ${cert.expirationDate}</p>` : ''}
                    ${cert.url ? `<a href="${cert.url}" target="_blank" class="certification-link">
                        <i class="fas fa-external-link-alt"></i> View Certificate
                    </a>` : ''}
                </div>
            </div>
        `;
    });
    
    certsHTML += '</div>';
    certificationsContainer.innerHTML = certsHTML;
}

// Render contact section
function renderContact() {
    const contactText = document.getElementById('contact-text');
    const socialLinks = document.getElementById('social-links');
    
    contactText.innerHTML = `
        ${portfolioContent.basics.contactText || ''}<br>
        Email: ${portfolioContent.basics.email || ''}<br>
        Phone: ${portfolioContent.basics.phone || ''}<br>
    ` || `${portfolioContent.basics.email ? `Feel free to reach out to me at ${portfolioContent.basics.email}.` : ''}`;
    
    socialLinks.innerHTML = '';
    
    // Render social profiles
    portfolioContent.basics.profiles.forEach(profile => {
        // Map network names to Font Awesome icons
        const iconMap = {
            'GitHub': 'fab fa-github',
            'LinkedIn': 'fab fa-linkedin',
            'Twitter': 'fab fa-twitter',
            'Instagram': 'fab fa-instagram',
            'Facebook': 'fab fa-facebook',
            'YouTube': 'fab fa-youtube',
            'Dribbble': 'fab fa-dribbble',
            'Behance': 'fab fa-behance',
            'Medium': 'fab fa-medium',
            'Stack Overflow': 'fab fa-stack-overflow',
            'CodePen': 'fab fa-codepen',
            'Dev.to': 'fab fa-dev',
            'Personal Website': 'fas fa-globe',
            'Email': 'fas fa-envelope'
        };
        
        const icon = iconMap[profile.network] || 'fas fa-link';
        
        const linkEl = document.createElement('a');
        linkEl.href = profile.url;
        linkEl.className = 'social-link';
        linkEl.target = '_blank';
        linkEl.rel = 'noopener';
        linkEl.innerHTML = `<i class="${icon}"></i>`;
        linkEl.title = profile.network;
        
        socialLinks.appendChild(linkEl);
    });
}

// Render footer
function renderFooter() {
    const footerText = document.getElementById('footer-text');
    footerText.innerHTML = portfolioContent.basics.footerText || 
        `© ${new Date().getFullYear()} ${portfolioContent.basics.name}. All rights reserved.`;
}

// Helper function to get profile from URL
function getProfileFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('profile') || 'default';
}

// Load initial content based on URL
window.addEventListener('load', () => {
    const profile = getProfileFromUrl();
    if (profile !== 'default') {
        loadContent(profile);
    }
});
