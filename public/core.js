const fileSelector = document.getElementById('file-selector')
const downloadButton = document.getElementById('download')
const qrCanvas = document.getElementById('qrcode-canvas')
const errorMsg = document.getElementById('error-msg')
const succMsg = document.getElementById('succ-msg')
const verifyButton = document.getElementById('verify')

const TRUST_LIST_URL = 'https://raw.githubusercontent.com/lovasoa/sanipasse/master/src/assets/Digital_Green_Certificate_Signing_Keys.json'

import QrScanner from './lib/qr-scanner.min.js';
QrScanner.WORKER_PATH = './lib/qr-scanner-worker.min.js';

var qrCode;
var dcc;

// file scanning listener
fileSelector.addEventListener('change', event => {
    resetPage();
    // https://blog.minhazav.dev/research/html5-qrcode.html#scan-using-file better library to read everything?
    const file = fileSelector.files[0];
    if (!file) return;
    document.getElementById('upload-file-info').innerHTML = file.name;
    // scan qr from file
    QrScanner.scanImage(file)
        .then(result => optimize(/*fileQrResult, */result))
        .catch(e => error(e || 'No QR code found.'));
});


// optimize function called if the file scan was ok
async function optimize(/*label,*/ result) {
    var qrString = String(result);
    // decode of cose content into dcc constant
    // we also support signature verification
    // could be used to check rules validity TO-DO
    dcc = await DCC.fromRaw(qrString);
    if (dcc) {
        // remove health certificate version
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
        succMsg.className = "alert alert-success";
        succMsg.innerHTML = "QR has been correctly generated.";
        // append qr rectangle to page and show download and signature verification buttons
        qrCode.append(qrCanvas);
        downloadButton.style.display = "flex";
        verifyButton.style.display = "flex";
    }
    else {
        // show error message
        errorMsg.className = "alert alert-danger";
        errorMsg.innerHTML = "Internal problems reading the QR code occurred.";
    }
}

// on-click listener for the download button
downloadButton.addEventListener('click', function () {
    // download generated image as jpg with a random name
    qrCode.download({ name: randomName(), extension: "jpeg" });
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
            errorMsg.innerHTML = "Cannot fetch keys list.";
        });

}, false);

// perform signature verification from a list of public keys
async function verifyFromList(keyList) {
    var verified = await dcc.checkSignatureWithKeysList(keyList);

    if (verified) {
        succMsg.className = "alert alert-info";
        succMsg.innerHTML = "Signature has been correctly verified.";
    } else {
        succMsg.className = "alert alert-danger";
        succMsg.innerHTML = "Signature CANNOT be verified.";
    }
}

// generate random filename
function randomName() {
    return "QR-" + Math.round(Math.random() * 10000 + Math.random() * 1000);
}

// flush errors and previous prints
function resetPage() {
    errorMsg.innerHTML = "";
    errorMsg.className = "";
    succMsg.innerHTML = "";
    succMsg.className = "";
    verifyButton.style.display = "none";
    downloadButton.style.display = "none";
    qrCanvas.innerHTML = "";
}

// error print
function error(msg) {
    errorMsg.className = "alert alert-danger";
    errorMsg.innerHTML = msg;
}