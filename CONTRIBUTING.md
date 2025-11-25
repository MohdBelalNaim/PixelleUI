# Contributing to PixelleUI 🎨
 
Thank you for your interest in contributing to PixelleUI! We welcome contributions from the community and are excited to see what you'll help us build. Whether you're fixing bugs, adding features, improving documentation, or helping with design, every contribution is valuable.
 
## 🚀 Getting Started
 
### Prerequisites
 
Make sure you have the following installed:
 
- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm**
- **PHP** (v7.4 or higher)
- **MySQL** database
- **XAMPP** or similar PHP server environment
- **Git**
- **Composer** (for PHP dependencies)
 
### Complete Development Setup
 
#### 1. Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/PixelleUI.git
   cd PixelleUI
   ```
 
#### 2. Frontend Setup
1. Install Node.js dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or  
   pnpm install
   ```
 
2. Create environment file:
   ```bash
   cp .env.example .env  # if available, or create manually
   ```
 
3. Configure environment variables in `.env`:
   ```env
   # AWS Credentials (for React component generation)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   
   # Development API URLs
   API_URL=http://localhost/pixelle/api/
   FILE_URL=http://localhost/pixelle/ui/
   ```
 
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
 
#### 3. Backend Setup with XAMPP
 
1. **Install and Configure XAMPP:**
   - Download [XAMPP](https://www.apachefriends.org/download.html)
   - Start Apache and MySQL services from XAMPP Control Panel
 
2. **Setup Database:**
   - Open phpMyAdmin: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Create database: `pixelle-new`
   - Note: Tables will be created automatically by the application
 
3. **Setup Backend Files:**
   ```bash
   # Copy backend to XAMPP htdocs
   cp -r backend /path/to/xampp/htdocs/pixelle
   # On Windows: copy backend folder to C:\xampp\htdocs\pixelle
   ```
 
4. **Install PHP Dependencies:**
   ```bash
   cd /path/to/xampp/htdocs/pixelle
   composer install
   ```
 
5. **Configure Database Connection:**
   Edit `backend/config.php` if needed:
   ```php
   $conn = mysqli_connect("localhost","root","","pixelle-new");
   ```
 
6. **Test Backend:**
   - Visit: [http://localhost/pixelle](http://localhost/pixelle)
   - API should be accessible at: [http://localhost/pixelle/api/](http://localhost/pixelle/api/)
 
## 🤝 How to Contribute
 
### 🐛 Reporting Bugs
 
Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:
 
**For Frontend Issues:**
- Clear description of the issue
- Steps to reproduce the problem
- Expected vs actual behavior  
- Screenshots or screen recordings
- Browser and OS information
- Console errors (if any)
 
**For Backend/API Issues:**
- API endpoint affected
- Request/response details
- Database error messages
- PHP error logs
- Server environment details
 
**Bug Report Template:**
```markdown
## Bug Description
Brief description of the issue
 
## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error
 
## Expected Behavior
What should happen
 
## Actual Behavior
What actually happens
 
## Environment
- Browser: [Chrome 91, Firefox 89, etc.]
- OS: [Windows 10, macOS 11, Ubuntu 20.04, etc.]
- PHP Version: [if backend issue]
- Node.js Version: [if frontend issue]
```
 
### 💡 Suggesting Features
 
We welcome feature suggestions! Please:
 
- **Check existing requests** first in issues and discussions
- **Provide clear description** of the proposed feature
- **Explain the use case** and benefits to users
- **Consider implementation complexity** and maintenance
- **Include mockups or examples** when possible
 
**Feature Request Template:**
```markdown
## Feature Description
Clear description of the new feature
 
## Problem Statement
What problem does this solve?
 
## Proposed Solution
How should this feature work?
 
## Alternatives Considered
Other ways to solve this problem
 
## Additional Context
Mockups, examples, references
```
 
### 🔄 Pull Requests
 
#### Before Starting
1. **Check existing issues** - look for related work
2. **Discuss major changes** - create an issue first for big features
3. **Follow coding standards** - see guidelines below
 
#### PR Workflow
1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # Frontend: feature/component-search
   # Backend: feature/api-caching  
   # Fix: fix/sidebar-mobile-bug
   # Docs: docs/setup-instructions
   ```
 
2. **Make your changes** following our coding standards
 
3. **Test thoroughly:**
   ```bash
   # Frontend testing
   npm run build    # Ensure it builds
   npm run dev      # Test in development
   
   # Backend testing  
   # Test API endpoints manually
   # Check database interactions
   # Verify file permissions
   ```
 
4. **Commit with conventional commits:**
   ```bash
   git commit -m "feat: add component search functionality"
   git commit -m "fix: resolve mobile sidebar toggle issue"
   git commit -m "docs: update API documentation"
   ```
 
5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
 
6. **Create Pull Request** with:
   - **Clear title** following conventional commits
   - **Detailed description** of changes
   - **Reference related issues** using `#issue-number`
   - **Screenshots/demos** for UI changes
   - **Breaking changes** clearly documented
   - **Testing instructions** for reviewers
 
**PR Template:**
```markdown
## Description
Brief description of changes
 
## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
 
## Related Issues
Closes #123
Related to #456
 
## Testing
- [ ] Frontend builds without errors
- [ ] Backend API endpoints tested
- [ ] Database changes verified
- [ ] Cross-browser testing completed
- [ ] Mobile responsive testing completed
 
## Screenshots
[If applicable, add screenshots or GIFs]
 
## Additional Notes
Any additional information for reviewers
```
## 📋 Code Standards
- **Frontend**: Vue 3 + TypeScript + Tailwind CSS
- **Backend**: PHP 7.4+ with prepared statements
- **Commits**: Use conventional commits (`feat:`, `fix:`, `docs:`)

## 🧪 Testing Checklist
- [ ] `npm run build` succeeds
- [ ] Cross-browser compatibility  
- [ ] API endpoints work
- [ ] Mobile responsive

## 🆘 Need Help?
- [Issues](https://github.com/MohdBelalNaim/PixelleUI/issues) - Bug reports and feature requests
 
## 📄 License
By contributing, you agree that your contributions will be licensed under the MIT License.