/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

// Utility functions (pure functions like React utils)
const createGreeting = (name) => `Hello, ${name}`;

// Custom hook-like functionality
const useCounter = () => {
  return {
    increment: (element) => {
      element.count = element.count + 1;
      element.dispatchEvent(new CustomEvent('count-changed', {
        detail: { count: element.count }
      }));
    }
  };
};

// Styles as a separate concern (like styled-components)
const elementStyles = css`
  :host {
    display: block;
    border: solid 1px gray;
    padding: 16px;
    max-width: 800px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  h1 {
    color: #333;
    margin-top: 0;
  }
  
  button {
    background: #0066cc;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background: #0052a3;
  }
  
  button:active {
    background: #003d7a;
  }
`;

/**
 * A functional-style Lit element - more React-like approach
 * 
 * @fires count-changed - Emitted when count changes
 * @slot - Default slot for child content
 * @csspart button - The button element
 */
export class MyElement extends LitElement {
  static styles = elementStyles;

  // React-like prop definitions
  static properties = {
    name: { type: String },
    count: { type: Number, state: true }
  };

  constructor() {
    super();
    // Initialize state (like useState initial values)
    this.name = 'World';
    this.count = 0;
    
    // Initialize "hooks"
    this.counter = useCounter();
  }

  // Event handlers as arrow functions (like React)
  handleClick = () => {
    this.counter.increment(this);
  }

  // Pure render function (like React functional components)
  render() {
    const greeting = createGreeting(this.name);
    
    return html`
      <h1>${greeting}!</h1>
      <button 
        @click=${this.handleClick} 
        part="button"
        aria-label="Increment counter"
      >
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  // Lifecycle method (like useEffect)
  updated(changedProperties) {
    if (changedProperties.has('count')) {
      console.log(`Count updated to: ${this.count}`);
    }
  }
}

window.customElements.define('my-element', MyElement);
