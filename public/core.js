const fileSelector = document.getElementById('file-selector')
const downloadButton = document.getElementById('download')
const qrCanvas = document.getElementById('qrcode-canvas')
const errorMsg = document.getElementById('error-msg')
const resMsg = document.getElementById('result-msg')
const radios = document.getElementById('radios')
const cameraBtn = document.getElementById('qrcamera-btn')

import QrScanner from './lib/qr-scanner.js';
QrScanner.WORKER_PATH = './lib/qr-scanner-worker.min.js';

// camera scan setup
var html5QrcodeScanner = new Html5Qrcode(/* element id */ "reader");
var config = { fps: 10, qrbox: { width: document.getElementById('reader').clientWidth * 0.75, height: document.getElementById('reader').clientHeigth * 0.75 } };

var qrCode;
var dcc;
var qrEngine;
var text;
var show_faq = false;

$(document).ready(function () {
    qrEngine = QrScanner.createQrEngine();
});

fileSelector.addEventListener('change', event => {
    var file = fileSelector.files[0];
    if (!file) return;
    resetPage();
    // scan qr from image
    QrScanner.scanImage(file, null, qrEngine)
        .then(result => {
            text = result;
            optimize(/*fileQrResult, */text)
        })
        .catch(e => error(e || 'No QR code found.'));
});

radios.addEventListener('change', event => {
    resetPage();
    if (!text) return;
    // scan qr from image
    optimize(/*fileQrResult, */text);
});

fileSelector.addEventListener("click", event =>{
    revertScan();
});

// camera button listener to activate the camera scanner
cameraBtn.addEventListener("click", function (element) {
    if (cameraBtn.className == "btn btn-success"){
        html5QrcodeScanner.start({ facingMode: "environment" }, config, onScanSuccess)
        .then(success => {
            cameraBtn.className = "btn btn-danger";
            cameraBtn.value = "Stop scanning";
        })
        .catch(err => {
            error("No camera was found.");
        });
    }
    else
        revertScan();
});

// when a qr is successfully scanned
async function onScanSuccess(decodedText) {
    revertScan();
    resetPage();
    text = decodedText;
    optimize(text);
}

function revertScan(){
    cameraBtn.className = "btn btn-success";
    cameraBtn.value = "Scan QR with camera";
    try{html5QrcodeScanner.stop();}
    catch(error){}
}

// optimize function called if the file scan was ok
async function optimize(/*label,*/ result) {
    var qrString = String(result);
    // decode of cose content into dcc constant
    dcc = await DCC.fromRaw(qrString);
    if (dcc) {
        // remove health certificate version
        if (document.getElementById('radio-it').checked)
            qrString = qrString.replace("HC1:", "");

        // generate new qr code
        // documentation: https://github.com/kozakdenys/qr-code-styling
        // can be improved to make options be selected by user
        qrCode = new QRCodeStyling({
            /*width: 512,
            height: 512,*/
            type: "jpeg",
            data: qrString,
            dotsOptions: {
                color: "#000000",
                type: "square"
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 20
            },
            qrOptions: { // these two are crucial to get a small QR code
                mode: "Alphanumeric",
                errorCorrectionLevel: 'L'
            }
        });

        // show success message
        resMsg.className = "alert alert-success";
        resMsg.innerHTML = "QR has been correctly generated.";
        // append qr rectangle to page and show download button
        qrCode.append(qrCanvas);
        downloadButton.style.display = "table";
    }
    else {
        // show error message
        error("Internal problems reading the QR code occurred.");
    }
}

// on-click listener for the download button
downloadButton.addEventListener('click', function () {
    // download generated image as jpg with a random name
    qrCode.download({ name: "QR-Optimized", extension: "jpeg" });
}, false);

// faq sidenav click
document.getElementById("faq").addEventListener("click", function(){  
        document.getElementById("close-btn").click();
        document.getElementById("main-container").style.display = "none";
        document.getElementById("faq-card").style.display= "none";
        document.getElementById("navLabel").innerHTML = "Frequently Asked Questions"
}, false);

// advanced faq toggle
$("#advanced-faq-btn").click(function(){
    $("#advanced-faq-1").toggle("slow");
    $("#advanced-faq-2").toggle("slow");
    if (show_faq){
        $("#advanced-faq-btn").text("Mostra dettagli avanzati");
        show_faq = false;
    }
    else{
        $("#advanced-faq-btn").text("Nascondi dettagli avanzati");
        show_faq = true;
    }
});

// flush errors and previous prints
function resetPage() {
    errorMsg.innerHTML = "";
    errorMsg.className = "";
    resMsg.innerHTML = "";
    resMsg.className = "";
    downloadButton.style.display = "none";
    qrCanvas.innerHTML = "";
}

// error print
function error(msg) {
    errorMsg.className = "alert alert-danger";
    errorMsg.innerHTML = msg;
}