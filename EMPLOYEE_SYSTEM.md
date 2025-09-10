# Employee Management System

A modern employee management web application built with Lit elements using functional programming patterns inspired by React.

## Features

- **Employee List**: View all employees with filtering and search capabilities
- **Add/Edit Employees**: Modal form for creating and updating employee records
- **Department Management**: Filter employees by department
- **Statistics Dashboard**: Overview of employee statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Automatically saves data locally

## Technical Implementation

This application demonstrates modern web development practices:

### Functional Programming Patterns
- Pure utility functions for data transformation
- Custom hooks-like patterns for reusable logic
- Immutable state updates
- Event-driven architecture

### Modern Lit Elements
- Functional component style (React-inspired)
- CSS-in-JS styling approach
- Property-based reactivity
- Custom event communication

### Features Implemented

#### Employee List Component (`employee-list.js`)
- Grid layout with employee cards
- Search and filter functionality
- Responsive design
- Empty state handling
- Action buttons (Edit/Delete)

#### Employee Form Component (`employee-form.js`)
- Modal-based form
- Form validation with error messages
- Create and edit modes
- Responsive layout
- Accessibility features

#### Main App Component (`employee-app.js`)
- Application state management
- Statistics calculation
- Event coordination
- Local storage integration
- Notification system

### Design System

The application uses a cohesive design system:
- **Primary Color**: ING Orange (#ff6200)
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent grid-based spacing
- **Shadows**: Subtle depth for cards and modals
- **Animations**: Smooth transitions and hover effects

### Data Structure

Each employee record contains:
- **ID**: Unique identifier
- **Name**: Full name
- **Email**: Contact email
- **Position**: Job title
- **Department**: Engineering, Design, Product, Marketing, Sales, HR
- **Phone**: Contact number
- **Start Date**: Employment start date

## Usage

1. **View Employees**: The main page shows all employees in a card grid
2. **Search**: Use the search box to find employees by name or email
3. **Filter**: Select a department to filter employees
4. **Add Employee**: Click "Add Employee" to open the form
5. **Edit Employee**: Click "Edit" on any employee card
6. **Delete Employee**: Click "Delete" and confirm to remove an employee

## Browser Support

- Modern browsers with ES6+ support
- Chrome 61+, Firefox 60+, Safari 10.1+, Edge 79+

## Local Development

The application runs entirely in the browser with no backend required. Data is stored in localStorage for persistence between sessions.
