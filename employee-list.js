/**
 * Employee List Component
 * A functional-style Lit element for displaying and managing employees
 */

import { LitElement, html, css } from 'lit';
import { i18n } from './i18n.js';

// Utility functions (pure functions like React utils)
const formatDate = (dateString) => {
  return i18n.formatDate(dateString);
};

const formatSalary = (salary) => {
  return i18n.formatCurrency(salary);
};

const filterEmployees = (employees, searchTerm, departmentFilter) => {
  return employees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || 
      employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });
};

// Custom hook-like functionality
const useEmployeeFilters = () => {
  return {
    applyFilters: (employees, filters) => {
      return filterEmployees(employees, filters.search, filters.department);
    }
  };
};

// Styles as a separate concern (like styled-components)
const employeeListStyles = css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #ff6200;
  }

  .title {
    color: #ff6200;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }

  .filters {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 15px;
    margin-bottom: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .filter-input, .filter-select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s;
  }

  .filter-input:focus, .filter-select:focus {
    outline: none;
    border-color: #ff6200;
    box-shadow: 0 0 0 2px rgba(255, 98, 0, 0.1);
  }

  .add-button {
    background: #ff6200;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .add-button:hover {
    background: #e55a00;
  }

  .employee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .employee-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #eee;
  }

  .employee-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .employee-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6200, #ff8533);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .employee-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .employee-position {
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .employee-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 15px;
    font-size: 13px;
  }

  .detail-label {
    color: #888;
  }

  .detail-value {
    color: #333;
    font-weight: 500;
  }

  .employee-actions {
    display: flex;
    gap: 8px;
  }

  .action-button {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
  }

  .action-button.edit {
    border-color: #007bff;
    color: #007bff;
  }

  .action-button.edit:hover {
    background: #007bff;
    color: white;
  }

  .action-button.delete {
    border-color: #dc3545;
    color: #dc3545;
  }

  .action-button.delete:hover {
    background: #dc3545;
    color: white;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .empty-state-icon {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .filters {
      grid-template-columns: 1fr;
    }
    
    .employee-grid {
      grid-template-columns: 1fr;
    }
  }
`;

/**
 * Employee List component with functional React-like patterns
 */
export class EmployeeList extends LitElement {
  static styles = employeeListStyles;

  static properties = {
    employees: { type: Array },
    searchTerm: { type: String, state: true },
    departmentFilter: { type: String, state: true },
    departments: { type: Array },
    currentLanguage: { type: String, state: true }
  };

  constructor() {
    super();
    // Initialize state (like useState initial values)
    this.employees = [];
    this.searchTerm = '';
    this.departmentFilter = '';
    this.departments = i18n.getDepartments();
    this.currentLanguage = i18n.getLanguage();
    
    // Initialize "hooks"
    this.filters = useEmployeeFilters();
    
    // Listen for language changes
    this.languageChangeHandler = (newLanguage) => {
      this.currentLanguage = newLanguage;
      this.departments = i18n.getDepartments();
      this.requestUpdate();
    };
    i18n.addListener(this.languageChangeHandler);
    
    // Load sample data
    this.loadSampleEmployees();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up language listener
    i18n.removeListener(this.languageChangeHandler);
  }

  // Pure helper methods
  loadSampleEmployees = () => {
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
      }
    ];
  }

  // Event handlers as arrow functions (like React)
  handleSearchChange = (event) => {
    this.searchTerm = event.target.value;
  }

  handleDepartmentChange = (event) => {
    this.departmentFilter = event.target.value;
  }

  handleAddEmployee = () => {
    this.dispatchEvent(new CustomEvent('add-employee', {
      bubbles: true,
      detail: { action: 'add' }
    }));
  }

  handleEditEmployee = (employee) => {
    this.dispatchEvent(new CustomEvent('edit-employee', {
      bubbles: true,
      detail: { employee, action: 'edit' }
    }));
  }

  handleDeleteEmployee = (employee) => {
    if (confirm(i18n.t('confirmDelete', { name: employee.name }))) {
      // Remove from local array
      this.dispatchEvent(new CustomEvent('employee-deleted', {
        bubbles: true,
        composed: true,
        detail: { employee }
      }));
    }
  }

  // Helper method to get employee initials
  getEmployeeInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  // Pure render method (like React functional components)
  render() {
    const filteredEmployees = this.filters.applyFilters(this.employees, {
      search: this.searchTerm,
      department: this.departmentFilter
    });

    return html`
      <div class="header">
        <h1 class="title">Employee Management</h1>
      </div>

      <div class="filters">
        <input
          type="text"
          class="filter-input"
          placeholder=${i18n.t('searchPlaceholder')}
          .value=${this.searchTerm}
          @input=${this.handleSearchChange}
        />
        
        <select
          class="filter-select"
          .value=${this.departmentFilter}
          @change=${this.handleDepartmentChange}
        >
          <option value="">${i18n.t('allDepartments')}</option>
          ${this.departments.map(dept => html`
            <option value=${dept.value}>${dept.label}</option>
          `)}
        </select>

        <button
          class="add-button"
          @click=${this.handleAddEmployee}
        >
          + ${i18n.t('addEmployee')}
        </button>
      </div>

      ${filteredEmployees.length > 0 ? html`
        <div class="employee-grid">
          ${filteredEmployees.map(employee => html`
            <div class="employee-card">
              <div class="employee-avatar">
                ${this.getEmployeeInitials(employee.name)}
              </div>
              
              <div class="employee-name">${employee.name}</div>
              <div class="employee-position">${employee.position}</div>
              
              <div class="employee-details">
                <span class="detail-label">${i18n.t('departmentLabel')}</span>
                <span class="detail-value">${i18n.getDepartments().find(d => d.value === employee.department)?.label || employee.department}</span>
                
                <span class="detail-label">${i18n.t('emailLabel')}</span>
                <span class="detail-value">${employee.email}</span>
                
                <span class="detail-label">${i18n.t('salaryLabel')}</span>
                <span class="detail-value">${formatSalary(employee.salary)}</span>
                
                <span class="detail-label">${i18n.t('startDateLabel')}</span>
                <span class="detail-value">${formatDate(employee.startDate)}</span>
              </div>
              
              <div class="employee-actions">
                <button
                  class="action-button edit"
                  @click=${() => this.handleEditEmployee(employee)}
                >
                  ${i18n.t('editButton')}
                </button>
                <button
                  class="action-button delete"
                  @click=${() => this.handleDeleteEmployee(employee)}
                >
                  ${i18n.t('deleteButton')}
                </button>
              </div>
            </div>
          `)}
        </div>
      ` : html`
        <div class="empty-state">
          <div class="empty-state-icon">👥</div>
          <h3>${i18n.t('noEmployeesFound')}</h3>
          <p>${i18n.t('noEmployeesMessage')}</p>
        </div>
      `}
    `;
  }

  // Lifecycle method (like useEffect)
  updated(changedProperties) {
    if (changedProperties.has('employees')) {
      console.log(`Employee count updated to: ${this.employees.length}`);
    }
  }
}

window.customElements.define('employee-list', EmployeeList);
