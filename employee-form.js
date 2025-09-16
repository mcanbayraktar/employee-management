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

// Form validation hook-like functionality
const useFormValidation = () => {
  return {
    validateField: (field, value) => {
      switch (field) {
        case 'firstName':
          return validateRequired(value) ? null : i18n.t('firstNameRequired');
        case 'lastName':
          return validateRequired(value) ? null : i18n.t('lastNameRequired');
        case 'startDate':
          return validateRequired(value) ? null : i18n.t('startDateRequired');
        case 'birthDate':
          return validateRequired(value) ? null : i18n.t('birthDateRequired');
        case 'phone':
          if (!validateRequired(value)) return i18n.t('phoneRequired');
          return validatePhone(value) ? null : i18n.t('phoneInvalid');
        case 'email':
          if (!validateRequired(value)) return i18n.t('emailRequired');
          return validateEmail(value) ? null : i18n.t('emailInvalid');
        case 'department':
          return validateRequired(value) ? null : i18n.t('departmentRequired');
        case 'position':
          return validateRequired(value) ? null : i18n.t('positionRequired');
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

// Styles - matching employee-list styling
const employeeFormStyles = css`
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

  .title {
    color: #ff6200;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .form-container {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
    max-height: 75vh;
    overflow-y: auto;
  }

  .editing-info {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 25px;
    font-size: 14px;
    color: #666;
    border-left: 4px solid #ff6200;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin-bottom: 30px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-label {
    font-size: 12px;
    color: #ACA7A7;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .form-input,
  .form-select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
    background: white;
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
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
  }

  .error-message {
    color: #dc3545;
    font-size: 11px;
    margin-top: 4px;
    font-weight: 500;
  }

  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    padding-top: 25px;
    margin-top: 25px;
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    min-width: 120px;
  }

  .action-button.cancel {
    background: white;
    color: #525194;
    border: 2px solid #525194;
  }

  .action-button.cancel:hover {
    background: #f8f9fa;
    border-color: #404080;
  }

  .action-button.submit {
    background: #ff6200;
    color: white;
    border: 2px solid #ff6200;
  }

  .action-button.submit:hover {
    background: #e55a00;
    border-color: #e55a00;
  }

  .action-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #ff6200;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .close-button:hover {
    background: rgba(255, 98, 0, 0.1);
    transform: rotate(90deg);
  }

  /* Responsive design */
  @media (max-width: 1024px) {
    .form-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    :host {
      padding: 15px;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .form-container {
      padding: 20px;
      max-height: 80vh;
    }

    .header {
      margin-bottom: 20px;
    }

    .title {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    .form-actions {
      flex-direction: column;
    }

    .action-button {
      width: 100%;
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
    this.positions = i18n.getPositions();
    this.formData = this.getInitialFormData();
    this.errors = {};
    this.currentLanguage = i18n.getLanguage();
    
    // Initialize validation
    this.validator = useFormValidation();
    
    // Listen for language changes
    this.languageChangeHandler = (newLanguage) => {
      this.currentLanguage = newLanguage;
      this.departments = i18n.getDepartments();
      this.positions = i18n.getPositions();
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
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    startDate: '',
    birthDate: ''
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

  // Public method to open form
  open(employee = null) {
    this.employee = employee;
    this.isEdit = !!employee;
    this.isOpen = true;
    
    if (employee) {
      this.formData = {
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        phone: employee.phone || '',
        startDate: employee.startDate || '',
        birthDate: employee.birthDate || ''
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
      <div class="header">
        <h1 class="title">
          ${this.isEdit ? i18n.t('editEmployee') : i18n.t('addNewEmployee')}
        </h1>
      </div>

      <div class="form-container">
        ${this.isEdit ? html`
          <div class="editing-info">
            ${i18n.t('youAreEditing')} ${this.formData.firstName} ${this.formData.lastName}
          </div>
        ` : ''}

        <form @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">${i18n.t('firstName')} *</label>
              <input
                type="text"
                class="form-input ${this.errors.firstName ? 'error' : ''}"
                .value=${this.formData.firstName}
                @input=${this.handleInputChange('firstName')}
                placeholder=${i18n.t('enterFirstName')}
              />
              ${this.errors.firstName ? html`
                <div class="error-message">${this.errors.firstName}</div>
              ` : ''}
            </div>

            <div class="form-group">
              <label class="form-label">${i18n.t('lastName')} *</label>
              <input
                type="text"
                class="form-input ${this.errors.lastName ? 'error' : ''}"
                .value=${this.formData.lastName}
                @input=${this.handleInputChange('lastName')}
                placeholder=${i18n.t('enterLastName')}
              />
              ${this.errors.lastName ? html`
                <div class="error-message">${this.errors.lastName}</div>
              ` : ''}
            </div>

            <div class="form-group">
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

            <div class="form-group">
              <label class="form-label">${i18n.t('birthDate')} *</label>
              <input
                type="date"
                class="form-input ${this.errors.birthDate ? 'error' : ''}"
                .value=${this.formData.birthDate}
                @input=${this.handleInputChange('birthDate')}
              />
              ${this.errors.birthDate ? html`
                <div class="error-message">${this.errors.birthDate}</div>
              ` : ''}
            </div>

            <div class="form-group">
              <label class="form-label">${i18n.t('phone')} *</label>
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

            <div class="form-group">
              <label class="form-label">${i18n.t('email')} *</label>
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
              <label class="form-label">${i18n.t('position')} *</label>
              <select
                class="form-select ${this.errors.position ? 'error' : ''}"
                .value=${this.formData.position}
                @change=${this.handleInputChange('position')}
              >
                <option value="">${i18n.t('selectPosition')}</option>
                ${this.positions.map(pos => html`
                  <option value=${pos.value}>${pos.label}</option>
                `)}
              </select>
              ${this.errors.position ? html`
                <div class="error-message">${this.errors.position}</div>
              ` : ''}
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="action-button submit"
            >
              ${i18n.t('save')}
            </button>
            <button
              type="button"
              class="action-button cancel"
              @click=${this.handleClose}
            >
              ${i18n.t('cancel')}
            </button>
          </div>
        </form>
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
