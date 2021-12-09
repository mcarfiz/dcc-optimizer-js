const fileSelector = document.getElementById('file-selector')
const downloadButton = document.getElementById('download')
const qrCanvas = document.getElementById('qrcode-canvas')
const errorMsg = document.getElementById('error-msg')
const resMsg = document.getElementById('result-msg')
const verifyButton = document.getElementById('verify')

const TRUST_LIST_URL = 'https://raw.githubusercontent.com/lovasoa/sanipasse/master/src/assets/Digital_Green_Certificate_Signing_Keys.json'

import QrScanner from './lib/qr-scanner.js';
QrScanner.WORKER_PATH = './lib/qr-scanner-worker.min.js';

var qrCode;
var dcc;
var qrEngine;

$(document).ready(function(){
    qrEngine = QrScanner.createQrEngine();
});

// file scanning listener
fileSelector.addEventListener('change', event => {
    resetPage();
    const file = fileSelector.files[0];
    if (!file) return;
    document.getElementById('upload-file-info').innerHTML = file.name;
    // scan qr from file
    QrScanner.scanImage(file, null, qrEngine)
        .then(result => optimize(/*fileQrResult, */result))
        .catch(e => error(e || 'No QR code found.'));
});


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
        // append qr rectangle to page and show download and signature verification buttons
        qrCode.append(qrCanvas);
        downloadButton.style.display = "flex";
        verifyButton.style.display = "flex";
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

// fetch the key list and send it to the verify function
verifyButton.addEventListener('click', function () {
    fetch(TRUST_LIST_URL)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error('Fetching error');
        })
        .then(data => verifyFromList(data))
        .catch(error => {
            errorMsg.className = "alert alert-danger";
            errorMsg.innerHTML = "An error occurred during verification step.";
        });

}, false);

// perform signature verification from a list of public keys
async function verifyFromList(keyList) {
    // if the key is not found the verification must fail
    try{
        var verified = await dcc.checkSignatureWithKeysList(keyList);
    }catch{
        resMsg.className = "alert alert-danger";
        resMsg.innerHTML = "Signature CANNOT be verified.";
    }
    
    // if the key is found, then we check if the signature is ok or not
    if (verified) {
        resMsg.className = "alert alert-info";
        resMsg.innerHTML = "Signature has been correctly verified.";
    } else {
        resMsg.className = "alert alert-danger";
        resMsg.innerHTML = "Signature CANNOT be verified.";
    }
}

// flush errors and previous prints
function resetPage() {
    errorMsg.innerHTML = "";
    errorMsg.className = "";
    resMsg.innerHTML = "";
    resMsg.className = "";
    verifyButton.style.display = "none";
    downloadButton.style.display = "none";
    qrCanvas.innerHTML = "";
}

// error print
function error(msg) {
    errorMsg.className = "alert alert-danger";
    errorMsg.innerHTML = msg;
}