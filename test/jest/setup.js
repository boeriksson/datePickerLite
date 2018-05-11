import {JSDOM} from 'jsdom';
import XMLHttpRequest from 'xhr2';

const {window} = new JSDOM(`<!DOCTYPE html><html><body>Hello world</body></html>`);
const document = window.document;
const parent = window;
const self = window;

// Combine both jest and chai matchers on expect
const jestExpect = global.expect;

// Setup mocked global objects.
Object.assign(global, {
    window,
    parent,
    self,
    document,
    XMLHttpRequest
});
