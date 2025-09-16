import { LitElement, html, css } from 'lit';
import { i18n } from './i18n.js';

export class ActionModal extends LitElement {
    static properties = {
        open: { type: Boolean, state: true },
        action: { type: String }, // 'edit' or 'delete'
        recordName: { type: String },
        language: { type: String, state: true }
    };

    static styles = css`
        :host {
            display: block;
            font-family: 'ING Me Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(2px);
        }

        .modal {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            padding: 0;
            min-width: 400px;
            max-width: 90vw;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
            overflow: hidden;
        }

        .modal-header {
            padding: 24px 24px 16px 24px;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
        }

        .modal-title {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: #ff6a00; /* ING Orange */
            text-align: left;
        }

        .close-button {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 24px;
            color: #ff6a00;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
        }

        .close-button:hover {
            background: rgba(255, 106, 0, 0.1);
            transform: rotate(90deg);
        }

        .modal-body {
            padding: 24px;
            text-align: left;
        }

        .modal-message {
            margin: 0;
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }

        .record-name {
            font-weight: 600;
            color: #ff6a00;
        }

        .modal-actions {
            padding: 16px 24px 24px 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .action-button {
            padding: 14px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            min-height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .proceed-button {
            background: #ff6a00; /* ING Orange */
            color: #ffffff;
            order: 1;
        }

        .proceed-button:hover {
            background: #e55a00;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 106, 0, 0.3);
        }

        .proceed-button:active {
            transform: translateY(0);
        }

        .cancel-button {
            background: transparent;
            color: #6b7280;
            border: 2px solid #e5e7eb;
            order: 2;
        }

        .cancel-button:hover {
            background: #f9fafb;
            border-color: #d1d5db;
            color: #374151;
        }


        .delete-mode .proceed-button:hover {
            background: #b91c1c;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @media (max-width: 480px) {
            .modal {
                min-width: 340px;
                margin: 20px;
            }

            .modal-header {
                padding: 20px 20px 12px 20px;
            }

            .modal-body {
                padding: 20px;
            }

            .modal-actions {
                padding: 12px 20px 20px 20px;
            }

            .modal-title {
                font-size: 18px;
                padding-right: 40px;
            }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
            .modal {
                animation: none;
            }
            
            .action-button:hover {
                transform: none;
            }
        }
    `;

    constructor() {
        super();
        this.open = false;
        this.action = '';
        this.recordName = '';
        this.language = i18n.getLanguage();

        // Listen for language changes
        this.languageChangeHandler = (newLanguage) => {
            this.language = newLanguage;
            this.requestUpdate();
        };
        i18n.addListener(this.languageChangeHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Clean up language listener
        i18n.removeListener(this.languageChangeHandler);
        document.removeEventListener('keydown', this._handleEscape);
    }

    connectedCallback() {
        super.connectedCallback();
        // Add escape key listener when modal opens
        this._handleEscape = this._handleEscape.bind(this);
    }

    updated(changedProperties) {
        if (changedProperties.has('open')) {
            if (this.open) {
                document.addEventListener('keydown', this._handleEscape);
                // Focus management for accessibility
                this.updateComplete.then(() => {
                    const firstButton = this.shadowRoot.querySelector('.action-button');
                    firstButton?.focus();
                });
            } else {
                document.removeEventListener('keydown', this._handleEscape);
            }
        }
    }

    _handleEscape(event) {
        if (event.key === 'Escape' && this.open) {
            this._close();
        }
    }

    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('modal-close', { 
            bubbles: true, 
            composed: true 
        }));
    }

    _confirm() {
        this.dispatchEvent(new CustomEvent('modal-confirm', {
            detail: { 
                action: this.action, 
                recordName: this.recordName 
            },
            bubbles: true,
            composed: true
        }));
        this.open = false;
    }

    render() {
        if (!this.open) return html``;

        const t = i18n.t.bind(i18n);
        const isDelete = this.action === 'delete';
        
        return html`
            <div class="modal-backdrop" @click="${this._close}">
                <div class="modal ${isDelete ? 'delete-mode' : ''}" @click="${e => e.stopPropagation()}">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            ${t('areYouSure')}
                        </h2>
                        <button 
                            class="close-button" 
                            @click="${this._close}"
                            aria-label="${t('close')}"
                        >
                            ×
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <p class="modal-message">
                            ${isDelete 
                                ? html`${t('confirmDeleteMessage')} <span class="record-name">${this.recordName || t('thisRecord')}</span> ${t('willBeDeleted')}`
                                : html`${t('confirmEditMessage')} <span class="record-name">${this.recordName || t('thisRecord')}</span>?`
                            }
                        </p>
                    </div>

                    <div class="modal-actions">
                        <button 
                            class="action-button proceed-button" 
                            @click="${this._confirm}"
                            aria-label="${isDelete ? t('confirmDelete') : t('confirmEdit')}"
                        >
                            ${isDelete ? t('proceed') : t('edit')}
                        </button>
                        <button 
                            class="action-button cancel-button" 
                            @click="${this._close}"
                            aria-label="${t('cancel')}"
                        >
                            ${t('cancel')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('action-modal', ActionModal);