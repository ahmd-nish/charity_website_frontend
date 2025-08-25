# 🤝 Contributing to Charity Platform Frontend

Thank you for your interest in contributing to the Charity Platform! This document provides guidelines and information for contributors.

## 📋 **Table of Contents**
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)

## 🤲 **Code of Conduct**

This project is committed to fostering an inclusive and welcoming community. Please treat all participants with respect and kindness.

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 16.0.0 or higher
- npm or yarn package manager
- Git for version control
- Basic knowledge of React.js and Material-UI

### **Local Development Setup**
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/charity_website_frontend.git
   cd charity_website_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```
5. Start development server:
   ```bash
   npm start
   ```

## 💻 **Development Process**

### **Branch Naming Convention**
- `feature/description` - New features
- `fix/description` - Bug fixes
- `enhance/description` - Improvements to existing features
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates
- `test/description` - Test additions or modifications

### **Development Workflow**
1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following our coding standards
3. Test your changes thoroughly
4. Commit your changes with proper commit messages
5. Push your branch and create a Pull Request

## 📝 **Commit Message Guidelines**

We follow a structured commit message format to maintain a clean and readable git history.

### **Format**
```
[TYPE] - Brief description (50 characters max)

Optional detailed explanation of the changes made.
Include the motivation for the change and contrast 
with previous behavior if applicable.

Resolves: #123
See also: #456, #789
```

### **Types**
- **ADD** - New features or components
- **FIX** - Bug fixes
- **ENHANCE** - Improvements to existing features
- **REFACTOR** - Code restructuring without behavior change
- **REMOVE** - Removing features or code
- **DOCS** - Documentation changes
- **TEST** - Adding or modifying tests
- **STYLE** - Code style changes (formatting, etc.)
- **PERF** - Performance improvements

### **Examples**
```bash
[ADD] - User authentication with JWT tokens

- Implement login and registration forms
- Add JWT token storage and validation
- Create protected route component
- Integrate with backend authentication API

Resolves: #45
```

```bash
[FIX] - Donation form validation errors

- Fix amount validation to accept decimal values
- Resolve form submission on Enter key press
- Correct error message display timing

Fixes: #123
```

## 🔄 **Pull Request Process**

### **Before Submitting**
- [ ] Code follows project coding standards
- [ ] All tests pass (`npm test`)
- [ ] No console errors or warnings
- [ ] Code is properly documented
- [ ] Changes are tested in multiple browsers
- [ ] Responsive design is maintained

### **Pull Request Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots of UI changes

## Checklist
- [ ] My code follows the project style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## 🎨 **Coding Standards**

### **JavaScript/React Guidelines**
- Use functional components with hooks
- Follow React best practices and patterns
- Use PropTypes for type checking
- Keep components small and focused
- Use meaningful variable and function names

### **Code Style**
```javascript
// ✅ Good - Descriptive naming
const handleDonationSubmission = async (donationData) => {
  try {
    const response = await donationsAPI.createDonation(donationData);
    showSuccessMessage('Donation submitted successfully!');
  } catch (error) {
    showErrorMessage('Failed to submit donation');
  }
};

// ❌ Bad - Generic naming
const handleClick = (data) => {
  // unclear what this does
};
```

### **Component Structure**
```javascript
// Component file structure
import React, { useState, useEffect } from 'react';
import { Material-UI imports } from '@mui/material';
import { Custom components } from '../components';
import { API services } from '../services';

const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(initialValue);
  
  // Effect hooks
  useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // handler logic
  };
  
  // Render helpers (if needed)
  const renderHelper = () => {
    return <div>Helper content</div>;
  };
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### **File Organization**
```
src/
├── components/          # Reusable UI components
│   ├── ComponentName/   # Component directory
│   │   ├── index.js    # Main component export
│   │   ├── ComponentName.js  # Component implementation
│   │   ├── ComponentName.test.js  # Component tests
│   │   └── ComponentName.styles.js  # Styled components (if needed)
├── pages/              # Page-level components
├── services/           # API and external service integrations
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── constants/          # Application constants
```

### **CSS/Styling Guidelines**
- Use Material-UI's styling system (`sx` prop or `styled` components)
- Follow mobile-first responsive design
- Use consistent spacing using theme values
- Maintain accessibility standards (WCAG 2.1)

```javascript
// ✅ Good - Using theme values
<Box sx={{ 
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper
}}>
  Content
</Box>

// ❌ Bad - Hard-coded values
<Box sx={{ 
  padding: '16px',
  marginBottom: '24px',
  backgroundColor: '#ffffff'
}}>
  Content
</Box>
```

## 🧪 **Testing Guidelines**

### **Testing Requirements**
- All new features must include unit tests
- Critical user flows should have integration tests
- UI components should have render tests
- API integrations should be mocked in tests

### **Test Structure**
```javascript
// ComponentName.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ComponentName from './ComponentName';
import { store } from '../redux/store';

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ComponentName', () => {
  test('renders without crashing', () => {
    renderWithProviders(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  test('handles user interaction correctly', async () => {
    renderWithProviders(<ComponentName />);
    
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Success Message')).toBeInTheDocument();
    });
  });
});
```

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test ComponentName.test.js
```

## 🐛 **Bug Reports**

When reporting bugs, please include:
- **Environment**: Browser version, OS, device
- **Steps to reproduce**: Clear step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any error messages

### **Bug Report Template**
```markdown
**Environment**
- Browser: Chrome 91.0.4472.124
- OS: macOS Big Sur 11.4
- Device: MacBook Pro 13" 2020

**Steps to Reproduce**
1. Go to donation page
2. Enter invalid amount
3. Click submit
4. See error

**Expected Behavior**
Should show validation error message

**Actual Behavior**
Form submits with invalid data

**Screenshots**
[Attach screenshot]

**Console Errors**
```
Error: Invalid donation amount
    at DonationForm.js:45
```
```

## 🎯 **Feature Requests**

When requesting features:
- Explain the use case and benefit
- Provide mockups or examples if helpful
- Consider the impact on existing functionality
- Be open to alternative solutions

## 📚 **Resources**

- [React Documentation](https://reactjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Testing Library Documentation](https://testing-library.com/)

## 🙋 **Questions?**

If you have questions about contributing:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out to maintainers

## 🎉 **Recognition**

Contributors will be:
- Listed in the project's CONTRIBUTORS.md file
- Mentioned in release notes for significant contributions
- Invited to join the project's community discussions

Thank you for contributing to the Charity Platform! Your efforts help make a positive impact on communities in need.
