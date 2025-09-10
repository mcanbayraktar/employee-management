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

  /* View Toggle Styles */
  .view-toggle {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }

  .view-toggle-button {
    padding: 8px 16px;
    border: 2px solid #ff6200;
    background: white;
    color: #ff6200;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .view-toggle-button:hover {
    background: #fff3e6;
  }

  .view-toggle-button.active {
    background: #ff6200;
    color: white;
  }

  /* Table View Styles */
  .employee-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
  }

  .table-header {
    background: #f8f9fa;
    display: grid;
    grid-template-columns: 60px 2fr 1.5fr 1fr 1fr 100px;
    gap: 15px;
    padding: 15px 20px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid #eee;
  }

  .table-row {
    display: grid;
    grid-template-columns: 60px 2fr 1.5fr 1fr 1fr 100px;
    gap: 15px;
    padding: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    transition: background-color 0.2s;
  }

  .table-row:hover {
    background: #f8f9fa;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .table-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6200, #ff8533);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
  }

  .table-actions {
    display: flex;
    gap: 5px;
  }

  .table-action-btn {
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
  }

  .table-action-btn.edit {
    border-color: #007bff;
    color: #007bff;
  }

  .table-action-btn.edit:hover {
    background: #007bff;
    color: white;
  }

  .table-action-btn.delete {
    border-color: #dc3545;
    color: #dc3545;
  }

  .table-action-btn.delete:hover {
    background: #dc3545;
    color: white;
  }

  /* Pagination Styles */
  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 15px 0;
    border-top: 1px solid #eee;
  }

  .pagination-info {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    color: #666;
  }

  .items-per-page {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .items-per-page select {
    padding: 5px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pagination-button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    min-width: 40px;
    text-align: center;
  }

  .pagination-button:hover:not(:disabled) {
    background: #f0f0f0;
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-button.active {
    background: #ff6200;
    color: white;
    border-color: #ff6200;
  }

  .pagination-text {
    font-size: 14px;
    color: #666;
  }

  @media (max-width: 768px) {
    .filters {
      grid-template-columns: 1fr;
    }
    
    .employee-grid {
      grid-template-columns: 1fr;
    }

    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      text-align: left;
    }

    .pagination-container {
      flex-direction: column;
      gap: 15px;
      align-items: stretch;
    }

    .pagination-info {
      justify-content: center;
    }

    .pagination-controls {
      justify-content: center;
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
    currentLanguage: { type: String, state: true },
    currentPage: { type: Number, state: true },
    itemsPerPage: { type: Number, state: true },
    viewMode: { type: String, state: true } // 'list' or 'table'
  };

  constructor() {
    super();
    // Initialize state (like useState initial values)
    this.employees = [];
    this.searchTerm = '';
    this.departmentFilter = '';
    this.departments = i18n.getDepartments();
    this.currentLanguage = i18n.getLanguage();
    
    // Initialize pagination and view state
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.viewMode = 'list'; // 'list' or 'table'
    
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
        name: 'Can Türk',
        email: 'can.turk@company.com',
        position: 'Backend Developer',
        department: 'Engineering',
        startDate: '2022-09-12',
        phone: '+90 536 234 5678'
      },
      {
        id: 6,
        name: 'Zeynep Şahin',
        email: 'zeynep.sahin@company.com',
        position: 'Sales Manager',
        department: 'Sales',
        startDate: '2023-02-28',
        phone: '+90 537 345 6789'
      },
      {
        id: 7,
        name: 'Emre Koç',
        email: 'emre.koc@company.com',
        position: 'DevOps Engineer',
        department: 'Engineering',
        startDate: '2022-07-18',
        phone: '+90 538 456 7890'
      },
      {
        id: 8,
        name: 'Selin Arslan',
        email: 'selin.arslan@company.com',
        position: 'HR Specialist',
        department: 'HR',
        startDate: '2023-04-15',
        phone: '+90 539 567 8901'
      },
      {
        id: 9,
        name: 'Burak Çelik',
        email: 'burak.celik@company.com',
        position: 'UI Designer',
        department: 'Design',
        startDate: '2022-12-05',
        phone: '+90 531 678 9012'
      },
      {
        id: 10,
        name: 'Fatma Yıldız',
        email: 'fatma.yildiz@company.com',
        position: 'Data Analyst',
        department: 'Product',
        startDate: '2023-03-22',
        phone: '+90 532 789 0123'
      },
      {
        id: 11,
        name: 'Murat Aydın',
        email: 'murat.aydin@company.com',
        position: 'QA Engineer',
        department: 'Engineering',
        startDate: '2022-11-08',
        phone: '+90 533 890 1234'
      },
      {
        id: 12,
        name: 'Deniz Polat',
        email: 'deniz.polat@company.com',
        position: 'Content Marketing Manager',
        department: 'Marketing',
        startDate: '2023-05-10',
        phone: '+90 534 901 2345'
      }
    ];
  }

  // Event handlers as arrow functions (like React)
  handleSearchChange = (event) => {
    this.searchTerm = event.target.value;
    this.currentPage = 1; // Reset to first page when searching
  }

  handleDepartmentChange = (event) => {
    this.departmentFilter = event.target.value;
    this.currentPage = 1; // Reset to first page when filtering
  }

  handlePageChange = (newPage) => {
    this.currentPage = newPage;
  }

  handleItemsPerPageChange = (event) => {
    this.itemsPerPage = parseInt(event.target.value);
    this.currentPage = 1; // Reset to first page
  }

  handleViewModeChange = (mode) => {
    this.viewMode = mode;
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

  // Pagination utility functions
  getPaginatedEmployees = (employees) => {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return employees.slice(startIndex, endIndex);
  }

  getTotalPages = (totalItems) => {
    return Math.ceil(totalItems / this.itemsPerPage);
  }

  getPaginationInfo = (totalItems) => {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.currentPage * this.itemsPerPage, totalItems);
    return { startIndex, endIndex, totalItems };
  }

  // Pure render method (like React functional components)
  render() {
    const filteredEmployees = this.filters.applyFilters(this.employees, {
      search: this.searchTerm,
      department: this.departmentFilter
    });

    const paginatedEmployees = this.getPaginatedEmployees(filteredEmployees);
    const totalPages = this.getTotalPages(filteredEmployees.length);
    const paginationInfo = this.getPaginationInfo(filteredEmployees.length);

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

      <!-- View Toggle -->
      <div class="view-toggle">
        <button
          class="view-toggle-button ${this.viewMode === 'list' ? 'active' : ''}"
          @click=${() => this.handleViewModeChange('list')}
        >
          📋 ${i18n.t('listView')}
        </button>
        <button
          class="view-toggle-button ${this.viewMode === 'table' ? 'active' : ''}"
          @click=${() => this.handleViewModeChange('table')}
        >
          📊 ${i18n.t('tableView')}
        </button>
      </div>

      ${paginatedEmployees.length > 0 ? html`
        ${this.viewMode === 'list' ? this.renderListView(paginatedEmployees) : this.renderTableView(paginatedEmployees)}
        ${this.renderPagination(filteredEmployees.length, totalPages, paginationInfo)}
      ` : html`
        <div class="empty-state">
          <div class="empty-state-icon">👥</div>
          <h3>${i18n.t('noEmployeesFound')}</h3>
          <p>${i18n.t('noEmployeesMessage')}</p>
        </div>
      `}
    `;
  }

  // Render list view
  renderListView(employees) {
    return html`
      <div class="employee-grid">
        ${employees.map(employee => html`
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
    `;
  }

  // Render table view
  renderTableView(employees) {
    return html`
      <div class="employee-table">
        <div class="table-header">
          <div></div>
          <div>${i18n.t('fullName')}</div>
          <div>${i18n.t('emailAddress')}</div>
          <div>${i18n.t('department')}</div>
          <div>${i18n.t('editButton')}</div>
        </div>
        ${employees.map(employee => html`
          <div class="table-row">
            <div class="table-avatar">
              ${this.getEmployeeInitials(employee.name)}
            </div>
            <div>
              <div style="font-weight: 600;">${employee.name}</div>
              <div style="font-size: 13px; color: #666;">${employee.position}</div>
            </div>
            <div>${employee.email}</div>
            <div>${i18n.getDepartments().find(d => d.value === employee.department)?.label || employee.department}</div>
            <div class="table-actions">
              <button
                class="table-action-btn edit"
                @click=${() => this.handleEditEmployee(employee)}
              >
                ${i18n.t('editButton')}
              </button>
              <button
                class="table-action-btn delete"
                @click=${() => this.handleDeleteEmployee(employee)}
              >
                ${i18n.t('deleteButton')}
              </button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  // Render pagination controls
  renderPagination(totalItems, totalPages, paginationInfo) {
    if (totalItems <= this.itemsPerPage) {
      return html``;
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return html`
      <div class="pagination-container">
        <div class="pagination-info">
          <div class="items-per-page">
            <span>${i18n.t('itemsPerPage')}</span>
            <select @change=${this.handleItemsPerPageChange} .value=${String(this.itemsPerPage)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <span class="pagination-text">
            ${i18n.t('showingItems', { 
              start: paginationInfo.startIndex, 
              end: paginationInfo.endIndex, 
              total: totalItems 
            })}
          </span>
        </div>
        
        <div class="pagination-controls">
          <button
            class="pagination-button"
            @click=${() => this.handlePageChange(this.currentPage - 1)}
            ?disabled=${this.currentPage === 1}
          >
            ${i18n.t('previous')}
          </button>
          
          ${pages.map(page => html`
            <button
              class="pagination-button ${page === this.currentPage ? 'active' : ''}"
              @click=${() => this.handlePageChange(page)}
            >
              ${page}
            </button>
          `)}
          
          <button
            class="pagination-button"
            @click=${() => this.handlePageChange(this.currentPage + 1)}
            ?disabled=${this.currentPage === totalPages}
          >
            ${i18n.t('next')}
          </button>
        </div>
      </div>
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
