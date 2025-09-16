/**
 * Localization System
 * Provides internationalization support for English and Turkish
 */

// Language definitions
const languages = {
  en: {
    // Header
    employees: 'Employees',
    addNew: "Add New",

    // Employee List
    listTitle: 'Employee List',
    searchPlaceholder: 'Search employees...',
    allDepartments: 'All Departments',
    addEmployee: 'Add Employee',
    noEmployeesFound: 'No employees found',
    noEmployeesMessage: 'Try adjusting your search criteria or add a new employee.',
    editButton: 'Edit',
    deleteButton: 'Delete',
    
    // Employee Form
    addNewEmployee: 'Add Employee',
    editEmployee: 'Edit Employee',
    youAreEditing: 'You are editing',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    position: 'Position',
    department: 'Department',
    phone: 'Phone',
    startDate: 'Date of Employment',
    birthDate: 'Date of Birth',
    actions: "Actions",
    selectDepartment: 'Select Department',
    selectPosition: 'Select Position',
    cancel: 'Cancel',
    save: 'Save',

    // Validation Messages
    firstNameRequired: 'First Name is required',
    lastNameRequired: 'Last Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    positionRequired: 'Position is required',
    departmentRequired: 'Department is required',
    phoneRequired: 'Phone is required',
    phoneInvalid: 'Please enter a valid phone number',
    startDateRequired: 'Start date is required',
    birthDateRequired: 'Birth date is required',

    // Form Placeholders
    enterFirstName: 'Enter first name',
    enterLastName: 'Enter last name',
    enterEmail: 'Enter email address',
    enterPosition: 'Enter position',
    phonePlaceholder: '+90 5xx xxx xxxx',
    
    // Notifications
    employeeAdded: '{name} has been added successfully!',
    employeeUpdated: '{name} has been updated successfully!',
    employeeDeleted: '{name} has been removed successfully!',
        
    // Departments
    tech: 'Tech',
    analytics: 'Analytics',

    // Positions
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior',

    // Employee Details
    departmentLabel: 'Department:',
    emailLabel: 'Email:',
    startDateLabel: 'Start Date:',
    
    // Loading
    loading: 'Loading Employee Management System...',
            
    // Demo Page
    demoTitle: 'Employee Management System',
    demoSubtitle: 'Component Demo & Documentation',
    liveApplication: 'Live Application',
    liveAppDescription: 'Experience the full employee management application with all features integrated.',
    launchApp: 'Launch Full Application',
    keyFeatures: 'Key Features',
    technicalImplementation: 'Technical Implementation',
    componentArchitecture: 'Component Architecture',
    designSystem: 'Design System',
    gettingStarted: 'Getting Started',
    startUsingApp: 'Start Using the App',

    // Modal translations
    areYouSure: 'Are you sure?',
    confirmDeleteMessage: 'Selected Employee record of',
    confirmEditMessage: 'Do you want to edit',
    willBeDeleted: 'will be deleted',
    thisRecord: 'this record',
    proceed: 'Proceed',
    confirmDelete: 'Confirm deletion',
    confirmEdit: 'Confirm edit',
    close: 'Close'

  },
  
  tr: {
    // Header
    employees: 'Çalışanlar',
    addNew: "Yeni Ekle",

    // Employee List
    listTitle: 'Çalışan Listesi',
    searchPlaceholder: 'Çalışan ara...',
    allDepartments: 'Tüm Departmanlar',
    addEmployee: 'Çalışan Ekle',
    noEmployeesFound: 'Çalışan bulunamadı',
    noEmployeesMessage: 'Arama kriterlerinizi ayarlayın veya yeni bir çalışan ekleyin.',
    editButton: 'Düzenle',
    deleteButton: 'Sil',
    
    // Employee Form
    addNewEmployee: 'Çalışan Ekle',
    editEmployee: 'Çalışanı Düzenle',
    youAreEditing: 'Düzenliyorsunuz',
    firstName: 'Ad',
    lastName: 'Soyad',
    email: 'E-posta',
    position: 'Pozisyon',
    department: 'Departman',
    phone: 'Telefon',
    birthDate: 'Doğum Tarihi',
    startDate: 'İşe Başlama Tarihi',
    actions: "İşlemler",
    selectDepartment: 'Departman Seçin',
    selectPosition: 'Pozisyon Seçin',
    cancel: 'İptal',
    save: 'Kaydet',
    
    // Validation Messages
    firstNameRequired: 'Ad gereklidir',
    lastNameRequired: 'Soyad gereklidir',
    emailRequired: 'E-posta gereklidir',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
    positionRequired: 'Pozisyon gereklidir',
    departmentRequired: 'Departman gereklidir',
    phoneRequired: 'Telefon gereklidir',
    phoneInvalid: 'Lütfen geçerli bir telefon numarası girin',
    startDateRequired: 'İşe başlama tarihi gereklidir',
    birthDateRequired: 'Doğum tarihi gereklidir',

    // Form Placeholders
    enterFirstName: 'Ad girin',
    enterLastName: 'Soyad girin',
    enterEmail: 'E-posta adresi girin',
    enterPosition: 'Pozisyon girin',
    phonePlaceholder: '+90 5xx xxx xxxx',
    
    // Notifications
    employeeAdded: '{name} başarıyla eklendi!',
    employeeUpdated: '{name} başarıyla güncellendi!',
    employeeDeleted: '{name} başarıyla kaldırıldı!',
        
    // Departments
    tech: 'Teknoloji',
    analytics: 'Analitik',

    // Positions
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior',
    
    // Employee Details
    departmentLabel: 'Departman:',
    emailLabel: 'Email:',
    startDateLabel: 'İşe Başlama:',
    
    // Loading
    loading: 'Çalışan Yönetim Sistemi Yükleniyor...',
    
    // Demo Page
    demoTitle: 'Çalışan Yönetim Sistemi',
    demoSubtitle: 'Bileşen Demosu & Dokümantasyon',
    liveApplication: 'Canlı Uygulama',
    liveAppDescription: 'Tüm özelliklerle entegre edilmiş tam çalışan yönetim uygulamasını deneyimleyin.',
    launchApp: 'Tam Uygulamayı Başlat',
    keyFeatures: 'Temel Özellikler',
    technicalImplementation: 'Teknik Uygulama',
    componentArchitecture: 'Bileşen Mimarisi',
    designSystem: 'Tasarım Sistemi',
    gettingStarted: 'Başlarken',
    startUsingApp: 'Uygulamayı Kullanmaya Başla',

    // Modal translations
    areYouSure: 'Emin misiniz?',
    confirmDeleteMessage: 'Seçilen çalışan kaydı',
    confirmEditMessage: 'Düzenlemek istediğiniz kayıt:',
    willBeDeleted: 'silinecektir',
    thisRecord: 'bu kayıt',
    proceed: 'Devam Et',
    confirmDelete: 'Silmeyi onayla',
    confirmEdit: 'Düzenlemeyi onayla',
    close: 'Kapat'

  }
};

// Localization class
class LocalizationManager {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || this.detectBrowserLanguage();
    this.listeners = [];
  }

  // Detect browser language
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    console.log('Detected browser language:', browserLang);
    if (browserLang.startsWith('tr')) {
      return 'tr';
    }
    return 'en'; // Default to English
  }

  // Get stored language from localStorage
  getStoredLanguage() {
    return localStorage.getItem('employee-app-language');
  }

  // Store language preference
  storeLanguage(language) {
    localStorage.setItem('employee-app-language', language);
  }

  // Set current language
  setLanguage(language) {
    if (languages[language]) {
      this.currentLanguage = language;
      this.storeLanguage(language);
      this.notifyListeners();
    }
  }

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  }

  // Get translated text
  t(key, replacements = {}) {
    const translation = languages[this.currentLanguage]?.[key] || languages.en[key] || key;
    
    // Replace placeholders like {name} with actual values
    return Object.keys(replacements).reduce((text, placeholder) => {
      return text.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
    }, translation);
  }

  // Add listener for language changes
  addListener(callback) {
    if (!this.listeners.includes(callback)) {
      this.listeners.push(callback);
    }
  }

  // Remove listener
  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Notify all listeners about language change
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLanguage));
  }

  // Get available languages
  getAvailableLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' }
    ];
  }

  // Get localized department list
  getDepartments() {
    return [
      { key: 'tech', value: 'Tech', label: this.t('tech') },
      { key: 'analytics', value: 'Analytics', label: this.t('analytics') }
    ];
  }

  // Get localized position list
  getPositions() {
    return [
      { key: 'junior', value: 'Junior', label: this.t('junior') },
      { key: 'mid', value: 'Mid', label: this.t('mid') },
      { key: 'senior', value: 'Senior', label: this.t('senior') }
    ];
  }

  // Format date based on language
  formatDate(dateString) {
    const locale = this.currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale);
  }
}

// Create global instance
const i18n = new LocalizationManager();

// Export for use in other modules
export { i18n, LocalizationManager };
