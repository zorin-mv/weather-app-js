export default class DOMManipulator {
    find(selector, container = document) {
        let found = container.querySelectorAll(selector);
        return found.length === 1 ? found[0] : found;
    }
}