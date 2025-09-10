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
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .app-container {
    min-height: 100vh;
    padding: 20px;
  }

  .app-header {
    position: relative;
    text-align: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #ff6200 0%, #ff8533 100%);
    color: white;
    margin-bottom: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(255, 98, 0, 0.3);
  }

  .language-selector {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
  }

  .language-btn {
    padding: 8px 12px;
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

  .app-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .app-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 300;
  }

  .app-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
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
  }

  @media (max-width: 768px) {
    .app-title {
      font-size: 2rem;
    }
    
    .app-subtitle {
      font-size: 1rem;
    }
    
    .app-stats {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .app-stats {
      grid-template-columns: 1fr;
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
    currentLanguage: { type: String, state: true }
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
        salary: 85000,
        startDate: '2022-03-15',
        phone: '+90 532 123 4567'
      },
      {
        id: 2,
        name: 'Elif Kaya',
        email: 'elif.kaya@company.com',
        position: 'UX Designer',
        department: 'Design',
        salary: 75000,
        startDate: '2023-01-10',
        phone: '+90 535 987 6543'
      },
      {
        id: 3,
        name: 'Mehmet Demir',
        email: 'mehmet.demir@company.com',
        position: 'Product Manager',
        department: 'Product',
        salary: 95000,
        startDate: '2021-11-20',
        phone: '+90 533 456 7890'
      },
      {
        id: 4,
        name: 'Ayşe Özkan',
        email: 'ayse.ozkan@company.com',
        position: 'Marketing Specialist',
        department: 'Marketing',
        salary: 60000,
        startDate: '2023-06-01',
        phone: '+90 534 789 0123'
      },
      {
        id: 5,
        name: 'Can Kılıç',
        email: 'can.kilic@company.com',
        position: 'DevOps Engineer',
        department: 'Engineering',
        salary: 80000,
        startDate: '2022-09-12',
        phone: '+90 536 111 2233'
      }
    ];
  }

  // Statistics computation (pure functions)
  getEmployeeStats = () => {
    const totalEmployees = this.employees.length;
    // Count unique departments
    const uniqueDepartments = [];
    this.employees.forEach(emp => {
      if (!uniqueDepartments.includes(emp.department)) {
        uniqueDepartments.push(emp.department);
      }
    });
    const departments = uniqueDepartments.length;
    
    const averageSalary = this.employees.length > 0 
      ? Math.round(this.employees.reduce((sum, emp) => sum + emp.salary, 0) / this.employees.length)
      : 0;
    const recentHires = this.employees.filter(emp => {
      const startDate = new Date(emp.startDate);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return startDate > sixMonthsAgo;
    }).length;

    return {
      totalEmployees,
      departments,
      averageSalary,
      recentHires
    };
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

  formatSalary = (salary) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(salary);
  }

  // Pure render method
  render() {
    const stats = this.getEmployeeStats();

    return html`
      <div class="app-container">
        <header class="app-header">
          <div class="language-selector">
            ${i18n.getAvailableLanguages().map(lang => html`
              <button 
                class="language-btn ${this.currentLanguage === lang.code ? 'active' : ''}"
                @click=${() => this.changeLanguage(lang.code)}
              >
                ${lang.nativeName}
              </button>
            `)}
          </div>
          <h1 class="app-title">${i18n.t('appTitle')}</h1>
          <p class="app-subtitle">${i18n.t('appSubtitle')}</p>
        </header>

        <div class="app-stats">
          <div class="stat-card">
            <div class="stat-value">${stats.totalEmployees}</div>
            <div class="stat-label">${i18n.t('totalEmployees')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.departments}</div>
            <div class="stat-label">${i18n.t('departments')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${i18n.formatCurrency(stats.averageSalary)}</div>
            <div class="stat-label">${i18n.t('averageSalary')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.recentHires}</div>
            <div class="stat-label">${i18n.t('recentHires')}</div>
          </div>
        </div>

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
