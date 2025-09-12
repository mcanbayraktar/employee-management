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
    cancel: 'Cancel',
    updateEmployee: 'Update Employee',
    
    // Validation Messages
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    positionRequired: 'Position is required',
    departmentRequired: 'Department is required',
    phoneRequired: 'Phone is required',
    phoneInvalid: 'Please enter a valid phone number',
    startDateRequired: 'Start date is required',
    
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
    
    // Confirmation
    confirmDelete: 'Are you sure you want to delete {name}?',
    
    // Departments
    engineering: 'Engineering',
    design: 'Design',
    product: 'Product',
    marketing: 'Marketing',
    sales: 'Sales',
    hr: 'HR',
    
    // Employee Details
    departmentLabel: 'Department:',
    emailLabel: 'Email:',
    startDateLabel: 'Start Date:',
    
    // Loading
    loading: 'Loading Employee Management System...',
    
    // Pagination
    itemsPerPage: 'Items per page:',
    showingItems: 'Showing {start}-{end} of {total}',
    page: 'Page',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
        
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
    startUsingApp: 'Start Using the App'
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
    cancel: 'İptal',
    updateEmployee: 'Çalışanı Güncelle',
    
    // Validation Messages
    nameRequired: 'Ad soyad gereklidir',
    emailRequired: 'E-posta gereklidir',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
    positionRequired: 'Pozisyon gereklidir',
    departmentRequired: 'Departman gereklidir',
    phoneRequired: 'Telefon gereklidir',
    phoneInvalid: 'Lütfen geçerli bir telefon numarası girin',
    startDateRequired: 'İşe başlama tarihi gereklidir',
    
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
    
    // Confirmation
    confirmDelete: '{name} adlı çalışanı silmek istediğinizden emin misiniz?',
    
    // Departments
    engineering: 'Mühendislik',
    design: 'Tasarım',
    product: 'Ürün',
    marketing: 'Pazarlama',
    sales: 'Satış',
    hr: 'İnsan Kaynakları',
    
    // Employee Details
    departmentLabel: 'Departman:',
    emailLabel: 'Email:',
    startDateLabel: 'İşe Başlama:',
    
    // Loading
    loading: 'Çalışan Yönetim Sistemi Yükleniyor...',
    
    // Pagination
    itemsPerPage: 'Sayfa başına öğe:',
    showingItems: '{total} öğeden {start}-{end} gösteriliyor',
    page: 'Sayfa',
    of: '/',
    previous: 'Önceki',
    next: 'Sonraki',
        
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
    startUsingApp: 'Uygulamayı Kullanmaya Başla'
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
      { key: 'engineering', value: 'Engineering', label: this.t('engineering') },
      { key: 'design', value: 'Design', label: this.t('design') },
      { key: 'product', value: 'Product', label: this.t('product') },
      { key: 'marketing', value: 'Marketing', label: this.t('marketing') },
      { key: 'sales', value: 'Sales', label: this.t('sales') },
      { key: 'hr', value: 'HR', label: this.t('hr') }
    ];
  }

  // Format currency based on language
  formatCurrency(amount) {
    const locale = this.currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(amount);
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
