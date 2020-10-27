import * as Quagga from 'quagga'; 

export interface IPopupComponent<T> {
    
}

export default class PopupComponent<T> implements IPopupComponent<T> {
    private modalView: HTMLElement;
    private scannerView: HTMLElement;
    private state: Boolean = false;
    private scannerIsRunning: Boolean = false;
    private renderComponent(){
        const modal = document.createElement("div");
        modal.className = 'modal';
        const header = document.createElement("div");
        header.className = 'modal-header'
        const closeButton = document.createElement("button");
        closeButton.className = "close-button";
        closeButton.textContent = 'X';
        closeButton.onclick = this.closeModal.bind(this);
        const body = document.createElement("div");
        body.className = 'modal-body';
        this.scannerView = document.createElement("div");

        body.appendChild(this.scannerView);
        header.appendChild(closeButton);

        modal.appendChild(header);
        modal.appendChild(body);
        // const icon = document.createElement("icon");
        this.modalView = modal;
        document.body.appendChild(modal)
    }
    private initQuagga(){
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: this.scannerView,
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: "environment"
                },
            },
            decoder: {
                readers: [
                    // "ean_reader",
                    // "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                ],
                debug: {
                    showCanvas: true,
                    showPatches: true,
                    showFoundPatches: true,
                    showSkeleton: true,
                    showLabels: true,
                    showPatchLabels: true,
                    showRemainingPatchLabels: true,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true
                    }
                }
            },

        }, (err) => {
            if (err) {
                console.log(err);
                return
            }

            console.log("Initialization finished. Ready to start");
            Quagga.start();

            // Set flag to is running
            this.scannerIsRunning = true;
        });
        
        Quagga.onProcessed((result) => {
            const drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter((box) => {
                        return box !== result.box;
                    }).forEach((box) => {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });


        Quagga.onDetected((result) => {
            debugger
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        });
    
    }
    private openCamera(){
    }
    private startScanner(){
        if (!this.scannerIsRunning) {
            Quagga.start();

            // Set flag to is running
            this.scannerIsRunning = true;
        }        
    }
    private stopScanner() {
        if (this.scannerIsRunning) {
            Quagga.stop();

            // Set flag to is running
            this.scannerIsRunning = false;
        }
    }
    constructor() {
        this.renderComponent();
        this.initQuagga();
    }
    openModal(){
        this.modalView.classList.add('active');
        this.initQuagga();
    }
    closeModal(){
        this.modalView.classList.remove('active');
        this.stopScanner();
    }
}