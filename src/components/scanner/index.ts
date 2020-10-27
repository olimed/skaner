import PopupComponent from '../popup/index';

export interface IScannerComponent<T> {
    
}

function renderElement(tagName, className?: String, attributes?: Object, childs?: Array<HTMLElement>): HTMLElement{
    const element = document.createElement(tagName);
    const elemAttributes = attributes || {};
    const elemChilds = childs || [];
    element.className = className || "";

    Object.keys(elemAttributes).forEach((attribute) => {
        element.setAttribute(attribute, elemAttributes[attribute]);
    });
  
    elemChilds.forEach(child => {
        element.appendChild(child);
    });

    return element;
}


export default class ScannerComponent<T> implements IScannerComponent<T> {
    private _scannerElement: HTMLElement;
    private popup: PopupComponent<T>;
    private renderComponent(parent: HTMLElement){
        const icon = renderElement("icon", "mdi mdi-camera");
        const iconButton = renderElement("button", "icon-button", {}, [icon]);
        const label = renderElement("label");
        label.textContent = "Scanner barcodes";



        const wrapper = document.createElement("div");
        const input = document.createElement("input");
        

        
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(iconButton);
        parent.appendChild(wrapper);
        this.scannerElement = wrapper;
        iconButton.onclick = this.openCamera.bind(this);
        // icon.onclick = this.openCamera.bind(this);
    }
    private get scannerElement() {
        return this._scannerElement || document.createElement("div");
    }
    private set scannerElement(element: HTMLElement) {
        this._scannerElement = element;
    }
    private openCamera(){
        this.popup.openModal();
    }
    constructor( private readonly parent: HTMLElement ) { // = document.body
        this.renderComponent(parent);
        this.popup = new PopupComponent();
    }
}