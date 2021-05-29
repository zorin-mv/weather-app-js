import DOMManipulator from "./dom-manipulator"

export default class SelectHtmlComponent extends DOMManipulator{

    constructor({container, selectItems}) {
        super();
        this.selectContainer = this.find(container);
        this.selectInput = this.find('.select__input')
        this.selectListContainer = this.find('.select-list')
        this.selectItems = selectItems;
        this.render()
    }

    render() {
        let selectListItems = this.selectItems.map((e) => `<li class="select-list__item">${e}</li>`).join('')
        this.selectListContainer.innerHTML = selectListItems;
    }

    setup(event) {
        let selectedItem = event.target.innerHTML;
        
        if(this.selectInput.textContent === 'Select location') {
            event.target.remove();
        } else {
            event.target.innerHTML = this.selectInput.innerHTML;
        }
        this.selectInput.innerHTML = selectedItem;
        this.toggle();
    }

    toggle() {
        this.selectContainer.classList.toggle('open');
    }
}
