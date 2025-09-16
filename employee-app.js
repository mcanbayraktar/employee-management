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
    height: 50px;
    background: white;
    z-index: 1000;
  }

  .logo-and-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
  }

  .app-logo {
    height: 20px;
    border-radius: 4px;
  }

  .app-title {
    font-size: 1rem;
    font-weight: 700;
    margin-left: 20px;
  }

  .language-selector {
    display: flex;
    align-items: center;
  }

  .language-flag {
    cursor: pointer;
    height: 16px;
  }

  .header-buttons {
    display: flex;
    gap: 40px;
  }

  .employees-button, .add-new-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #ff6200;
    background: none;
    border: none;
    gap: 6px;
  }

  .employees-button.active, .add-new-button.active {
    opacity: 0.2;
  }

  .icon {
    max-height: 16px;
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
    background-color: #f6ecec;
    margin-top: 50px; /* push down content so it doesn't overlap header */
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
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        startDate: '2022-03-15',
        birthDate: '1992-03-15',
        phone: '+90 532 123 4567',
        email: 'ahmet.yilmaz@company.com',
        department: 'Analytics',
        position: 'Junior'
      },
      {
        id: 2,
        firstName: 'Elif',
        lastName: 'Kaya',
        startDate: '2023-01-10',
        birthDate: '1982-01-10',
        phone: '+90 535 987 6543',
        email: 'elif.kaya@company.com',
        department: 'Tech',
        position: 'Mid'
      },
      {
        id: 3,
        firstName: 'Mehmet',
        lastName: 'Demir',
        startDate: '2021-11-20',
        birthDate: '1990-11-20',
        phone: '+90 533 456 7890',
        email: 'mehmet.demir@company.com',
        department: 'Analytics',
        position: 'Senior'
      },
      {
        id: 4,
        firstName: 'Ayşe',
        lastName: 'Özkan',
        startDate: '2023-06-01',
        birthDate: '1995-06-01',
        phone: '+90 534 789 0123',
        email: 'ayse.ozkan@company.com',
        department: 'Tech',
        position: 'Junior',
      },
      {
        id: 5,
        firstName: 'Can',
        lastName: 'Türk',
        startDate: '2022-09-12',
        birthDate: '1990-09-12',
        phone: '+90 536 234 5678',
        email: 'can.turk@company.com',
        department: 'Analytics',
        position: 'Mid',
      },
      {
        id: 6,
        firstName: 'Zeynep',
        lastName: 'Şahin',
        startDate: '2023-02-28',
        birthDate: '1995-02-28',
        phone: '+90 537 345 6789',
        email: 'zeynep.sahin@company.com',
        department: 'Tech',
        position: 'Senior',
      },
      {
        id: 7,
        firstName: 'Emre',
        lastName: 'Koç',
        startDate: '2022-07-18',
        birthDate: '1995-07-18',
        phone: '+90 538 456 7890',
        email: 'emre.koc@company.com',
        department: 'Analytics',
        position: 'Junior',
      },
      {
        id: 8,
        firstName: 'Selin',
        lastName: 'Arslan',
        startDate: '2023-04-15',
        birthDate: '1995-04-15',
        phone: '+90 539 567 8901',
        email: 'selin.arslan@company.com',
        department: 'Tech',
        position: 'Mid',
      },
      {
        id: 9,
        firstName: 'Burak',
        lastName: 'Çelik',
        startDate: '2022-12-05',
        birthDate: '1995-12-05',
        phone: '+90 531 678 9012',
        email: 'burak.celik@company.com',
        department: 'Analytics',
        position: 'Senior',
      },
      {
        id: 10,
        firstName: 'Fatma',
        lastName: 'Yıldız',
        startDate: '2023-03-22',
        birthDate: '1993-03-22',
        phone: '+90 532 789 0123',
        email: 'fatma.yildiz@company.com',
        department: 'Tech',
        position: 'Junior',
      },
      {
        id: 11,
        firstName: 'Murat',
        lastName: 'Aydın',
        startDate: '2022-11-08',
        birthDate: '1990-11-08',
        phone: '+90 533 890 1234',
        email: 'murat.aydin@company.com',
        department: 'Analytics',
        position: 'Mid',
      },
      {
        id: 12,
        firstName: 'Deniz',
        lastName: 'Polat',
        startDate: '2023-05-10',
        birthDate: '1995-05-10',
        phone: '+90 534 901 2345',
        email: 'deniz.polat@company.com',
        department: 'Tech',
        position: 'Senior',
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
          <div class="header-buttons">
            <button class="employees-button ${this.showForm === true ? 'active' : ''}"  @click=${() => this.handleFormClosed()} >
              <img src='./src/employees.svg' alt="Employees"  class="icon"/>
              <p>${i18n.t('employees')}</p>
            </button>
            <button class="add-new-button ${this.showForm === false ? 'active' : ''}"  @click=${() => this.handleAddEmployee()}>
              <img src='./src/plus.svg' alt="Add Employee" class="icon"/>
              <p>${i18n.t('addNew')}</p>
            </button>
            <div class="language-selector"> 
              ${this.currentLanguage === 'en' ? this.renderEnglishFlag() : this.renderTurkishFlag()  }
            </div>
          </div>
        </header>

        <main class="main-content">
          <employee-list
            .employees=${this.employees}
            @add-employee=${this.handleAddEmployee}
            @edit-employee=${this.handleEditEmployee}
            @employee-deleted=${this.handleEmployeeDeleted}
            @renderListView=${this.renderListView}
            @renderTableView=${this.renderTableView}
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
