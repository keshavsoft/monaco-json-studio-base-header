import { bindEvents } from 'https://keshavsoft.github.io/dom-primitive-bindings/dist/v7/min.js';
import bindings from './bindings.json' with { type: 'json' };
import actions from './actions.js';

const shell = document.querySelector('.header-preview-shell');
bindEvents(shell, bindings, actions);
