/**
 * Main Application Component
 * Orchestrates the employee management application
 */

import { LitElement, html, css } from 'lit';
import './employee-list.js';
import './employee-form.js';
import { i18n } from './i18n.js';

// App-level utilities
const generateId = () => Date.now() + Math.random();

const showNotification = (message, type = 'success') => {
  // Simple notification system
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

// Application state management (simplified Redux-like pattern)
const useAppState = () => {
  return {
    addEmployee: (employees, newEmployee) => {
      return [...employees, { ...newEmployee, id: generateId() }];
    },
    
    updateEmployee: (employees, updatedEmployee) => {
      return employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
    },
    
    deleteEmployee: (employees, employeeId) => {
      return employees.filter(emp => emp.id !== employeeId);
    }
  };
};

// Main app styles
const appStyles = css`
  :host {
    display: block;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .app-container {
    min-height: 100vh;
  }

  .app-header {
    padding-inline: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
  }

  .logo-and-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
  }

  .app-logo {
    height: 20px;
  }

  .app-title {
    font-size: 1rem;
    font-weight: 700;
    margin-left: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .language-flag {
    cursor: pointer;
    height: 16px;
  }

  .language-btn {
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .language-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .language-btn.active {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
  }

  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #ff6200;
    margin-bottom: 5px;
  }

  .stat-label {
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    background-color: lightgray;
    margin-top: 60px; /* push down content so it doesn't overlap header */
  }

  @media (max-width: 768px) {
    .app-title {
      font-size: 2rem;
    } 
  }
`;

/**
 * Main Employee Management Application
 */
export class EmployeeApp extends LitElement {
  static styles = appStyles;

  static properties = {
    employees: { type: Array, state: true },
    showForm: { type: Boolean, state: true },
    editingEmployee: { type: Object, state: true },
    currentLanguage: { type: 'en' | 'tr', state: true }
  };

  constructor() {
    super();
    // Initialize app state
    this.employees = [];
    this.showForm = false;
    this.editingEmployee = null;
    this.currentLanguage = i18n.getLanguage();
    
    // Initialize state management
    this.appState = useAppState();
    
    // Listen for language changes
    this.languageChangeHandler = (newLanguage) => {
      this.currentLanguage = newLanguage;
      this.requestUpdate();
    };
    i18n.addListener(this.languageChangeHandler);
    
    // Load initial data
    this.loadInitialData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up language listener
    i18n.removeListener(this.languageChangeHandler);
  }

  // Data management methods
  loadInitialData = () => {
    // Load sample employees (in real app, this would come from API)
    this.employees = [
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet.yilmaz@company.com',
        position: 'Senior Frontend Developer',
        department: 'Engineering',
        startDate: '2022-03-15',
        phone: '+90 532 123 4567'
      },
      {
        id: 2,
        name: 'Elif Kaya',
        email: 'elif.kaya@company.com',
        position: 'UX Designer',
        department: 'Design',
        startDate: '2023-01-10',
        phone: '+90 535 987 6543'
      },
      {
        id: 3,
        name: 'Mehmet Demir',
        email: 'mehmet.demir@company.com',
        position: 'Product Manager',
        department: 'Product',
        startDate: '2021-11-20',
        phone: '+90 533 456 7890'
      },
      {
        id: 4,
        name: 'Ayşe Özkan',
        email: 'ayse.ozkan@company.com',
        position: 'Marketing Specialist',
        department: 'Marketing',
        startDate: '2023-06-01',
        phone: '+90 534 789 0123'
      },
      {
        id: 5,
        name: 'Can Kılıç',
        email: 'can.kilic@company.com',
        position: 'DevOps Engineer',
        department: 'Engineering',
        startDate: '2022-09-12',
        phone: '+90 536 111 2233'
      }
    ];
  }

  // Event handlers
  handleAddEmployee = () => {
    this.editingEmployee = null;
    this.openForm();
  }

  handleEditEmployee = (event) => {
    this.editingEmployee = event.detail.employee;
    this.openForm();
  }

  changeLanguage = (languageCode) => {
    i18n.setLanguage(languageCode);
  }

  handleEmployeeCreated = (event) => {
    const newEmployee = event.detail.employee;
    this.employees = this.appState.addEmployee(this.employees, newEmployee);
    showNotification(i18n.t('employeeAdded', { name: newEmployee.name }));
  }

  handleEmployeeUpdated = (event) => {
    const updatedEmployee = event.detail.employee;
    this.employees = this.appState.updateEmployee(this.employees, updatedEmployee);
    showNotification(i18n.t('employeeUpdated', { name: updatedEmployee.name }));
  }

  handleEmployeeDeleted = (event) => {
    const deletedEmployee = event.detail.employee;
    showNotification(i18n.t('employeeDeleted', { name: deletedEmployee.name }));
  }

  handleFormClosed = () => {
    this.showForm = false;
    this.editingEmployee = null;
  }

  // Helper methods
  openForm = () => {
    this.showForm = true;
    // Wait for the form to render, then open it
    setTimeout(() => {
      const form = this.shadowRoot.querySelector('employee-form');
      if (form) {
        form.open(this.editingEmployee);
      }
    }, 0);
  }

  // Pure render method
  render() {
    return html`
      <div class="app-container">
        <header class="app-header">
          <div class="logo-and-title">
            <img class="app-logo" src="./src/logo.png" alt="App Logo">
            <h1 class="app-title">ING</h1>
          </div>
          <div class="language-selector"> 
            ${this.currentLanguage === 'en' ? this.renderEnglishFlag() : this.renderTurkishFlag()  }
          </div>
        </header>

        <main class="main-content">
          <employee-list
            .employees=${this.employees}
            @add-employee=${this.handleAddEmployee}
            @edit-employee=${this.handleEditEmployee}
            @employee-deleted=${this.handleEmployeeDeleted}
          ></employee-list>
        </main>

        ${this.showForm ? html`
          <employee-form
            .isOpen=${this.showForm}
            @employee-created=${this.handleEmployeeCreated}
            @employee-updated=${this.handleEmployeeUpdated}
            @form-closed=${this.handleFormClosed}
          ></employee-form>
        ` : ''}
      </div>
    `;
  }

  renderEnglishFlag() {
    return html`<img class="language-flag" src="./src/english.png" alt="English" @click=${() => this.changeLanguage('tr')}/>`;
  }

  renderTurkishFlag() {
    return html`<img class="language-flag" src="./src/turkish.png" alt="Turkish" @click=${() => this.changeLanguage('en')} />`;
  }

  // Lifecycle methods
  updated(changedProperties) {
    if (changedProperties.has('employees')) {
      console.log(`Total employees: ${this.employees.length}`);
      
      // Auto-save to localStorage (in real app, sync with API)
      localStorage.setItem('employees', JSON.stringify(this.employees));
    }
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Load saved data from localStorage
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      try {
        const parsed = JSON.parse(savedEmployees);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.employees = parsed;
        }
      } catch (error) {
        console.warn('Failed to load saved employees:', error);
      }
    }
  }
}

window.customElements.define('employee-app', EmployeeApp);
