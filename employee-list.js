/**
 * Employee List Component
 * A functional-style Lit element for displaying and managing employees
 */

import { LitElement, html, css } from 'lit';
import './action-modal.js';
import { i18n } from './i18n.js';

// Utility functions (pure functions like React utils)
const formatDate = (dateString) => {
  return i18n.formatDate(dateString);
};

const filterEmployees = (employees, searchTerm, departmentFilter) => {
  return employees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  /* Universal font inheritance for form elements */
  button, input, select, textarea {
    font-family: inherit;
  }

  :host {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    font-family: 'ING Me Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    gap: 20px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    color: #ff6200;
    font-size: 1.5rem;
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

  .filter-input {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    transition: border-color 0.2s;
  }

  .filter-input:focus {
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
    justify-content: center;
    align-items: start;
    grid-template-columns: repeat(auto-fill, 500px);
    column-gap: 150px;
    row-gap: 50px;
    height: 580px;
    overflow-y: auto;
  }

  .employee-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #eee;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    box-sizing: border-box; 
    max-width: 100%;
    word-wrap: break-word;
  }

  .employee-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .employee-info {
    display: flex;
    flex-direction: column;
  }

  .detail-label {
    font-size: 10px;
    color: #ACA7A7;
  }

  .detail-value {
    font-weight: 500;
  }

  .employee-actions {
    margin-top: 12px; 
    display: flex;
    gap: 8px;
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    transition: all 0.2s;
    gap: 6px;
  }

  .action-button.edit {
    border: none;
    color: white;
    background-color: #525194;
  }

  .action-button.edit:hover {
    background: #007bff;
    color: white;
  }

  .action-button.delete {
    border: none;
    color: white;
    background-color: #ED6C2D;
  }

  .action-button.delete:hover {
    background: #dc3545;
    color: white;
  }

  .action-icon {
    width: 14px;
    height: 14px;
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
  }

  .view-toggle-button {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 5px;
    opacity: 0.2;
    background: none;
    border: none;
  }

  .view-toggle-button.active {
    opacity: 1;
  }

  .view-icon {
    width: 16px;
    height: 16px;
  }

  /* Table View Styles */
  .employee-table {
    flex: 1;
    background: white;
    border-radius: 12px;
    overflow: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
    max-height: 75vh;
  }

  .table-header {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(5, minmax(0, 1fr)) 1.5fr repeat(3, minmax(0, 1fr));
    padding: 15px 20px;
    color: #ED6C2D;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 12px;
  }

  .table-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr)) 1.5fr repeat(3, minmax(0, 1fr));
    padding: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    transition: background-color 0.2s;
    text-align: center;
    font-size: 12px;
    color: #595959;
    word-wrap: break-word;
    white-space: normal;
  }

  .table-row:hover {
    background: #f8f9fa;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .table-action-btn {
    padding: 4px 8px;
    background: none;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .table-action-btn.edit:hover {
    border-radius: 4px;
    background: #007bff;
    color: white;
  }

  .table-action-btn.delete:hover {
    border-radius: 4px;
    background: #dc3545;
    color: white;
  }

  /* Pagination Styles */
  .pagination-container {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    margin-top: 1vh;
  }

  .pagination-info {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    color: #666;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pagination-button {
    padding: 8px 12px;
    border: none;
    background: none;
    color: #333;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
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
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    .filters {
      grid-template-columns: 1fr;
    }
    
    .employee-grid {
      max-height: 60vh;
      grid-template-columns: 1fr;
      overflow-y: auto;
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
    viewMode: { type: String, state: true }, // 'list' or 'table'
    openModal: { type: Boolean, state: true },
    modalAction: { type: String, state: true },
    modalRecordName: { type: String, state: true },
    currentEmployee: { type: Object, state: true }
  };

  constructor() {
    super();
    // Initialize state (like useState initial values)
    this.employees = [];
    this.searchTerm = '';
    this.departmentFilter = '';
    this.departments = i18n.getDepartments();
    this.currentLanguage = i18n.getLanguage();
    this.openModal = false;
    this.modalAction = '';
    this.modalRecordName = '';
    this.currentEmployee = null;

    // Initialize pagination and view state
    this.currentPage = 1;
    this.viewMode = 'table'; // 'list' or 'table'
    this.itemsPerPage = 9;

    // Initialize "hooks"
    this.filters = useEmployeeFilters();
    
    // Listen for language changes
    this.languageChangeHandler = (newLanguage) => {
      this.currentLanguage = newLanguage;
      this.departments = i18n.getDepartments();
      this.requestUpdate();
    };
    i18n.addListener(this.languageChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up language listener
    i18n.removeListener(this.languageChangeHandler);
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

  handleViewModeChange = (mode) => {
    this.viewMode = mode;
    this.itemsPerPage = this.viewMode === 'table' ? 9 : 4;
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
    this.modalAction = 'delete';
    this.modalRecordName = `${employee.firstName} ${employee.lastName}`;
    this.currentEmployee = employee;
    this.openModal = true;
  }

  handleModalConfirm = (detail) => {
    if (detail.action === 'delete' && this.currentEmployee) {
      this.dispatchEvent(new CustomEvent('employee-deleted', {
        bubbles: true,
        composed: true,
        detail: { employee: this.currentEmployee }
      }));
    }
    this.openModal = false;
    this.currentEmployee = null;
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

  // Pure render method (like React functional components)
  render() {
    const filteredEmployees = this.filters.applyFilters(this.employees, {
      search: this.searchTerm,
      department: this.departmentFilter
    });

    const paginatedEmployees = this.getPaginatedEmployees(filteredEmployees);
    const totalPages = this.getTotalPages(filteredEmployees.length);

    return html`
      <div class="header">
        <h1 class="title">${i18n.t('listTitle')}</h1>

        <div class="header-actions">
          <input
          type="text"
          class="filter-input"
          placeholder=${i18n.t('searchPlaceholder')}
          .value=${this.searchTerm}
          @input=${this.handleSearchChange}
          />
    
          <!-- View Toggle -->
            <div class="view-toggle">
              <button
                class="view-toggle-button ${this.viewMode === 'table' ? 'active' : ''}"
                @click=${() => this.handleViewModeChange('table')}
              >
                <img class="view-icon" src="./src/table.svg" alt="Table View">
              </button>
              <button
                class="view-toggle-button ${this.viewMode === 'list' ? 'active' : ''}"
                @click=${() => this.handleViewModeChange('list')}
              >
                <img class="view-icon" src="./src/list.svg" alt="list View">
              </button>
            </div>
        </div>
      </div>

      ${paginatedEmployees.length > 0 ? html`
        ${this.viewMode === 'list' ? this.renderListView(paginatedEmployees) : this.renderTableView(paginatedEmployees)}
        ${this.renderPagination(filteredEmployees.length, totalPages)}
      ` : html`
        <div class="empty-state">
          <div class="empty-state-icon">👥</div>
          <h3>${i18n.t('noEmployeesFound')}</h3>
          <p>${i18n.t('noEmployeesMessage')}</p>
        </div>
      `}

      ${this.openModal ? html`
        <action-modal
          .open=${this.openModal}
          .action=${this.modalAction}
          .recordName=${this.modalRecordName}
          @modal-close=${() => this.openModal = false}
          @modal-confirm=${(e) => this.handleModalConfirm(e.detail)}
        ></action-modal>
      ` : ''} 
    `
  }

  // Render list view
  renderListView(employees) {
    return html`
      <div class="employee-grid">
        ${employees.map(employee => html`
          <div class="employee-card">

            <div class="employee-info">
              <span class="detail-label">${i18n.t('firstName')}</span>
              <div class="employee-name">${employee.firstName}</div>
            </div>

            <div class="employee-info">
              <span class="detail-label">${i18n.t('lastName')}</span>
              <div class="employee-last-name">${employee.lastName}</div>
            </div>

            <div class="employee-info">
              <span class="detail-label">${i18n.t('startDate')}</span>
              <span class="detail-value">${formatDate(employee.startDate)}</span>
            </div>


            <div class="employee-info">
              <span class="detail-label">${i18n.t('birthDate')}</span>
              <span class="detail-value">${formatDate(employee.birthDate)}</span>
            </div>

            <div class="employee-info">
              <span class="detail-label">${i18n.t('phone')}</span>
              <span class="detail-value">${employee.phone}</span>
            </div>

            <div class="employee-info">
              <span class="detail-label">${i18n.t('email')}</span>
              <span class="detail-value">${employee.email}</span>
            </div>

            <div class="employee-info">
              <span class="detail-label">${i18n.t('department')}</span>
              <span class="detail-value">${i18n.getDepartments().find(d => d.value === employee.department)?.label || employee.department}</span>
            </div>

            <div class="employee-info">
              <span class="detail-label">${i18n.t('position')}</span>
              <span class="detail-value">${employee.position}</span>
            </div>

            <div class="employee-actions">
              <button
                class="action-button edit"
                @click=${() => this.handleEditEmployee(employee)}
              >
                <img class="action-icon" src="./src/edit.svg" alt="Edit">
                ${i18n.t('editButton')}
              </button>
              <button
                class="action-button delete"
                @click=${() => this.handleDeleteEmployee(employee)}
              >
                <img class="action-icon" src="./src/delete.svg" alt="Delete">
                ${i18n.t('deleteButton')}
              </button>
            </div>

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
          <div>${i18n.t('firstName')}</div>
          <div>${i18n.t('lastName')}</div>
          <div>${i18n.t('startDate')}</div>
          <div>${i18n.t('birthDate')}</div>
          <div>${i18n.t('phone')}</div>
          <div>${i18n.t('email')}</div>
          <div>${i18n.t('department')}</div>
          <div>${i18n.t('position')}</div> 
          <div>${i18n.t('actions')}</div> 
        </div>
        ${employees.map(employee => html`
          <div class="table-row">
            <div>${employee.firstName}</div>
            <div>${employee.lastName}</div>
            <div>${employee.startDate}</div>
            <div>${employee.birthDate}</div>
            <div>${employee.phone}</div>
            <div>${employee.email}</div>
            <div>${i18n.getDepartments().find(d => d.value === employee.department)?.label || employee.department}</div>
            <div >${employee.position}</div>
            <div class="table-actions">
              <button
                class="table-action-btn edit"
                @click=${() => this.handleEditEmployee(employee)}
              >
                <img class="action-icon" src="./src/edit.svg" alt="Edit">
              </button>
              <button
                class="table-action-btn delete"
                @click=${() => this.handleDeleteEmployee(employee)}
              >
                <img class="action-icon" src="./src/delete.svg" alt="Delete">
              </button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  // Render pagination controls
  renderPagination(totalItems, totalPages) {
    if (totalItems <= this.itemsPerPage) {
      return html``;
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return html`
      <div class="pagination-container">        
        <div class="pagination-controls">
          <button
            class="pagination-button"
            @click=${() => this.handlePageChange(this.currentPage - 1)}
            ?disabled=${this.currentPage === 1}
          >
            <
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
            >
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
