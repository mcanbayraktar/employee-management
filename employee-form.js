/**
 * Employee Form Component
 * A functional-style Lit element for adding/editing employees
 */

import { LitElement, html, css } from 'lit';
import { i18n } from './i18n.js';

// Validation utilities (pure functions)
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone);
};

const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

const validateSalary = (salary) => {
  const num = parseFloat(salary);
  return !isNaN(num) && num > 0;
};

// Form validation hook-like functionality
const useFormValidation = () => {
  return {
    validateField: (field, value) => {
      switch (field) {
        case 'name':
          return validateRequired(value) ? null : i18n.t('nameRequired');
        case 'email':
          if (!validateRequired(value)) return i18n.t('emailRequired');
          return validateEmail(value) ? null : i18n.t('emailInvalid');
        case 'position':
          return validateRequired(value) ? null : i18n.t('positionRequired');
        case 'department':
          return validateRequired(value) ? null : i18n.t('departmentRequired');
        case 'salary':
          if (!validateRequired(value)) return i18n.t('salaryRequired');
          return validateSalary(value) ? null : i18n.t('salaryInvalid');
        case 'phone':
          if (!validateRequired(value)) return i18n.t('phoneRequired');
          return validatePhone(value) ? null : i18n.t('phoneInvalid');
        case 'startDate':
          return validateRequired(value) ? null : i18n.t('startDateRequired');
        default:
          return null;
      }
    },
    
    validateForm: (formData) => {
      const errors = {};
      Object.keys(formData).forEach(field => {
        const error = useFormValidation().validateField(field, formData[field]);
        if (error) errors[field] = error;
      });
      return errors;
    }
  };
};

// Styles
const employeeFormStyles = css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-header {
    padding: 24px 24px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 24px;
  }

  .modal-title {
    color: #ff6200;
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 16px 0;
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button:hover {
    background: #f5f5f5;
  }

  .form-container {
    padding: 0 24px 24px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-label {
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .form-input,
  .form-select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }

  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: #ff6200;
    box-shadow: 0 0 0 2px rgba(255, 98, 0, 0.1);
  }

  .form-input.error,
  .form-select.error {
    border-color: #dc3545;
  }

  .error-message {
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }

  .action-button {
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-size: 14px;
  }

  .action-button.cancel {
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
  }

  .action-button.cancel:hover {
    background: #e9ecef;
  }

  .action-button.submit {
    background: #ff6200;
    color: white;
  }

  .action-button.submit:hover {
    background: #e55a00;
  }

  .action-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .modal-overlay {
      padding: 10px;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
    }
  }
`;

/**
 * Employee Form component with functional React-like patterns
 */
export class EmployeeForm extends LitElement {
  static styles = employeeFormStyles;

  static properties = {
    isOpen: { type: Boolean },
    employee: { type: Object },
    isEdit: { type: Boolean },
    formData: { type: Object, state: true },
    errors: { type: Object, state: true },
    departments: { type: Array },
    currentLanguage: { type: String, state: true }
  };

  constructor() {
    super();
    // Initialize state
    this.isOpen = false;
    this.employee = null;
    this.isEdit = false;
    this.departments = i18n.getDepartments();
    this.formData = this.getInitialFormData();
    this.errors = {};
    this.currentLanguage = i18n.getLanguage();
    
    // Initialize validation
    this.validator = useFormValidation();
    
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

  // Pure helper methods
  getInitialFormData = () => ({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    phone: '',
    startDate: ''
  });

  // Event handlers as arrow functions
  handleInputChange = (field) => (event) => {
    this.formData = {
      ...this.formData,
      [field]: event.target.value
    };
    
    // Clear error when user starts typing
    if (this.errors[field]) {
      this.errors = {
        ...this.errors,
        [field]: null
      };
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form
    const validationErrors = this.validator.validateForm(this.formData);
    this.errors = validationErrors;
    
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, emit event
      const eventName = this.isEdit ? 'employee-updated' : 'employee-created';
      const employeeData = {
        ...this.formData,
        id: this.isEdit ? this.employee.id : Date.now(),
        salary: parseFloat(this.formData.salary)
      };
      
      this.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        detail: { employee: employeeData }
      }));
      
      this.handleClose();
    }
  }

  handleClose = () => {
    this.isOpen = false;
    this.formData = this.getInitialFormData();
    this.errors = {};
    
    this.dispatchEvent(new CustomEvent('form-closed', {
      bubbles: true
    }));
  }

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  }

  // Public method to open form
  open(employee = null) {
    this.employee = employee;
    this.isEdit = !!employee;
    this.isOpen = true;
    
    if (employee) {
      this.formData = {
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        salary: employee.salary?.toString() || '',
        phone: employee.phone || '',
        startDate: employee.startDate || ''
      };
    } else {
      this.formData = this.getInitialFormData();
    }
    
    this.errors = {};
  }

  // Pure render method
  render() {
    if (!this.isOpen) return html``;

    return html`
      <div class="modal-overlay" @click=${this.handleOverlayClick}>
        <div class="modal-content">
          <button class="close-button" @click=${this.handleClose}>
            ×
          </button>
          
          <div class="modal-header">
            <h2 class="modal-title">
              ${this.isEdit ? i18n.t('editEmployee') : i18n.t('addNewEmployee')}
            </h2>
          </div>
          
          <div class="form-container">
            <form @submit=${this.handleSubmit}>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">${i18n.t('fullName')} *</label>
                  <input
                    type="text"
                    class="form-input ${this.errors.name ? 'error' : ''}"
                    .value=${this.formData.name}
                    @input=${this.handleInputChange('name')}
                    placeholder=${i18n.t('enterFullName')}
                  />
                  ${this.errors.name ? html`
                    <div class="error-message">${this.errors.name}</div>
                  ` : ''}
                </div>

                <div class="form-group">
                  <label class="form-label">${i18n.t('emailAddress')} *</label>
                  <input
                    type="email"
                    class="form-input ${this.errors.email ? 'error' : ''}"
                    .value=${this.formData.email}
                    @input=${this.handleInputChange('email')}
                    placeholder=${i18n.t('enterEmail')}
                  />
                  ${this.errors.email ? html`
                    <div class="error-message">${this.errors.email}</div>
                  ` : ''}
                </div>

                <div class="form-group">
                  <label class="form-label">${i18n.t('position')} *</label>
                  <input
                    type="text"
                    class="form-input ${this.errors.position ? 'error' : ''}"
                    .value=${this.formData.position}
                    @input=${this.handleInputChange('position')}
                    placeholder=${i18n.t('enterPosition')}
                  />
                  ${this.errors.position ? html`
                    <div class="error-message">${this.errors.position}</div>
                  ` : ''}
                </div>

                <div class="form-group">
                  <label class="form-label">${i18n.t('department')} *</label>
                  <select
                    class="form-select ${this.errors.department ? 'error' : ''}"
                    .value=${this.formData.department}
                    @change=${this.handleInputChange('department')}
                  >
                    <option value="">${i18n.t('selectDepartment')}</option>
                    ${this.departments.map(dept => html`
                      <option value=${dept.value}>${dept.label}</option>
                    `)}
                  </select>
                  ${this.errors.department ? html`
                    <div class="error-message">${this.errors.department}</div>
                  ` : ''}
                </div>

                <div class="form-group">
                  <label class="form-label">${i18n.t('salary')} *</label>
                  <input
                    type="number"
                    class="form-input ${this.errors.salary ? 'error' : ''}"
                    .value=${this.formData.salary}
                    @input=${this.handleInputChange('salary')}
                    placeholder=${i18n.t('enterSalary')}
                    min="0"
                    step="1000"
                  />
                  ${this.errors.salary ? html`
                    <div class="error-message">${this.errors.salary}</div>
                  ` : ''}
                </div>

                <div class="form-group">
                  <label class="form-label">${i18n.t('phoneNumber')} *</label>
                  <input
                    type="tel"
                    class="form-input ${this.errors.phone ? 'error' : ''}"
                    .value=${this.formData.phone}
                    @input=${this.handleInputChange('phone')}
                    placeholder=${i18n.t('phonePlaceholder')}
                  />
                  ${this.errors.phone ? html`
                    <div class="error-message">${this.errors.phone}</div>
                  ` : ''}
                </div>

                <div class="form-group full-width">
                  <label class="form-label">${i18n.t('startDate')} *</label>
                  <input
                    type="date"
                    class="form-input ${this.errors.startDate ? 'error' : ''}"
                    .value=${this.formData.startDate}
                    @input=${this.handleInputChange('startDate')}
                  />
                  ${this.errors.startDate ? html`
                    <div class="error-message">${this.errors.startDate}</div>
                  ` : ''}
                </div>
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  class="action-button cancel"
                  @click=${this.handleClose}
                >
                  ${i18n.t('cancel')}
                </button>
                <button
                  type="submit"
                  class="action-button submit"
                >
                  ${this.isEdit ? i18n.t('updateEmployee') : i18n.t('addEmployee')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // Lifecycle method
  updated(changedProperties) {
    if (changedProperties.has('isOpen') && this.isOpen) {
      // Focus first input when form opens
      setTimeout(() => {
        const firstInput = this.shadowRoot?.querySelector('.form-input');
        firstInput?.focus();
      }, 100);
    }
  }
}

window.customElements.define('employee-form', EmployeeForm);
