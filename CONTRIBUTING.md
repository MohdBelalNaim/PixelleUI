# Contributing to PixelleUI

Thank you for your interest in contributing to PixelleUI! We welcome contributions from the community and are excited to see what you'll help us build.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/PixelleUI.git
   cd PixelleUI
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- Clear description of the issue
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

### Suggesting Features

We welcome feature suggestions! Please:

- Check existing feature requests first
- Provide clear description of the proposed feature
- Explain the use case and benefits
- Consider including mockups or examples

### Pull Requests

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. Make your changes following our coding standards
3. Test your changes thoroughly
4. Commit with descriptive messages:
   ```bash
   git commit -m "feat: add new component feature"
   # or
   git commit -m "fix: resolve sidebar toggle issue"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request with:
   - Clear title and description
   - Reference related issues
   - Screenshots/demos for UI changes

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use Tailwind CSS for styling
- Maintain consistent indentation (2 spaces)
- Add proper type definitions

### Component Guidelines

- Keep components focused and reusable
- Use meaningful prop names with proper types
- Include proper documentation/comments
- Follow Vue naming conventions
- Ensure accessibility best practices

### Commit Convention

We follow conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Testing

- Test your changes in multiple browsers
- Ensure responsive design works properly
- Test accessibility features
- Verify no console errors

## Project Structure

```
├── assets/          # CSS and static assets
├── components/      # Reusable Vue components
├── composable/      # Vue composables
├── layouts/         # Nuxt layouts
├── pages/           # Nuxt pages
├── public/          # Static files
├── store/           # State management
└── types/           # TypeScript type definitions
```

## Need Help?

- Check the [README.md](README.md) for basic setup
- Browse existing issues and discussions
- Feel free to ask questions in issues

## Code of Conduct

Please be respectful and inclusive in all interactions. We're here to build something great together!

## License

By contributing to PixelleUI, you agree that your contributions will be licensed under the MIT License.