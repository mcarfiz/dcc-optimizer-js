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
var tab;
var lang = ita;

// on load: load localization and set up qrscanner engine
$(document).ready(function () {
    tab = "home";
    load_text();
    qrEngine = QrScanner.createQrEngine();
});

// listener for change on file selector, when a new qr is inserted try to decode it
fileSelector.addEventListener('change', event => {
    var file = fileSelector.files[0];
    if (!file) return;
    resetPage();
    // scan qr from image
    QrScanner.scanImage(file, null, qrEngine)
        .then(result => {
            text = result;
            optimize(text)
        })
        .catch(e => error(e || 'No QR code found.'));
});

// when a radio is changed re-encode the qr (if it's there)
radios.addEventListener('change', event => {
    resetPage();
    if (!text) return;
    // scan qr from image
    optimize(text);
});

fileSelector.addEventListener("click", event => {
    revertScan();
});

// camera button listener to activate the camera scanner
cameraBtn.addEventListener("click", function (element) {
    if (cameraBtn.className == "btn btn-success") {
        html5QrcodeScanner.start({ facingMode: "environment" }, config, onScanSuccess)
            .then(success => {
                cameraBtn.className = "btn btn-danger";
                cameraBtn.value = lang["home"]["stop-scanner"];
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

// stop camera scanning
function revertScan() {
    cameraBtn.className = "btn btn-success";
    cameraBtn.value = lang["home"]["qrcamera-btn"]
    try { html5QrcodeScanner.stop(); }
    catch (error) { }
}

// optimize function called if the file scan was ok
async function optimize(/*label,*/ result) {
    var qrString = String(result);
    // decode of cose content into dcc variable
    dcc = await DCC.fromRaw(qrString);
    if (dcc) {
        // remove health certificate version, if italian case
        if (document.getElementById('radio-it').checked)
            qrString = qrString.replace("HC1:", "");

        // generate new qr code
        // documentation: https://github.com/kozakdenys/qr-code-styling
        qrCode = new QRCodeStyling({
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
        resMsg.innerHTML = lang["home"]["success-msg"]
        // append qr rectangle to page and show download button
        qrCode.append(qrCanvas);
        downloadButton.style.display = "table";
    }
    else
        // show error message
        error("Internal problems reading the QR code occurred.");
}

// on-click listener for the download button
downloadButton.addEventListener('click', function () {
    // download generated image as jpg with a random name
    qrCode.download({ name: "QR-Optimized", extension: "jpeg" });
}, false);

document.getElementById("home-side-btn").addEventListener('click', function () {
    document.getElementById("close-btn").click();
    if (tab === "faq") {
        document.getElementById("faq").click();
        document.getElementById("main-container").style.display = "table";
        document.getElementById("faq-card").style.display = "flex";
    }
}, false);

// faq sidenav click
document.getElementById("faq").addEventListener("click", function () {
    tab = "faq";
    // close sidenav and show faq
    document.getElementById("close-btn").click();
    document.getElementById("main-container").style.display = "none";
    document.getElementById("faq-card").style.display = "none";
    document.getElementById("nav-title").innerHTML = lang["faq"]["nav-title"];
    // stop camera scanning if active
    revertScan();
}, false);

// advanced faq toggle
$("#advanced-faq-btn").click(function () {
    $("#advanced-faq-1").toggle("slow");
    $("#advanced-faq-2").toggle("slow");
    // is it showing advanced faqs?
    if (show_faq) {
        $("#advanced-faq-btn").text(lang["faq"]["adv-btn-show"]);
        $("#advanced-faq-btn").attr("class", "btn btn-success");
        show_faq = false;
    }
    else {
        $("#advanced-faq-btn").text(lang["faq"]["adv-btn-hide"]);
        $("#advanced-faq-btn").attr("class", "btn btn-danger");
        show_faq = true;
    }
});

// load text strings from json of the selected language
function load_text() {
    // home
    if (tab === "home")
        $('#nav-title').text(lang["home"]["nav-title"]);
    else
        $('#nav-title').text(lang["faq"]["nav-title"]);
    $('#main-title').html(lang["home"]["main-title"]);
    $('#file-selector-label').html(lang["home"]["file-selector"]);
    $("#qrcamera-btn").val(lang["home"]["qrcamera-btn"]);
    $("#radio-label-eu").html(lang["home"]["radio-eu"]);
    $("#radio-label-it").html(lang["home"]["radio-it"]);
    if (resMsg.innerHTML)
        resMsg.innerHTML = lang["home"]["success-msg"];
    // faq
    $('.question').text(lang["faq"]["question"]);
    $('.answer').text(lang["faq"]["answer"]);
    $('.adv-detail').text(lang["faq"]["adv-detail"]);
    $('#question1').html(lang["faq"]["question1"]);
    $('#answer1').html(lang["faq"]["answer1"]);
    $('#question2').html(lang["faq"]["question2"]);
    $('#answer2').html(lang["faq"]["answer2"]);
    $('#question3').html(lang["faq"]["question3"]);
    $('#answer3').html(lang["faq"]["answer3"]);
    $('#question4').html(lang["faq"]["question4"]);
    $('#answer4').html(lang["faq"]["answer4"]);
    $('#question5').html(lang["faq"]["question5"]);
    $('#answer5').html(lang["faq"]["answer5"]);
    $('#adv-ans3').html(lang["faq"]["adv-ans3"]);
    $('#adv-ans3-file-sel1').html(lang["faq"]["adv-ans3-file-sel1"]);
    $('#adv-ans3-file-sel2').html(lang["faq"]["adv-ans3-file-sel2"]);
    $('#adv-ans3-file-sel3').html(lang["faq"]["adv-ans3-file-sel3"]);
    $('#adv-ans3-qr-scan1').html(lang["faq"]["adv-ans3-qr-scan1"]);
    $('#adv-ans3-qr-scan2').html(lang["faq"]["adv-ans3-qr-scan2"]);
    $('#adv-ans3-qr-gen1').html(lang["faq"]["adv-ans3-qr-gen1"]);
    $('#adv-ans3-qr-gen2').html(lang["faq"]["adv-ans3-qr-gen2"]);
    $('#adv-ans4').html(lang["faq"]["adv-ans4"]);
    if (show_faq)
        $('#advanced-faq-btn').text(lang["faq"]["adv-btn-hide"]);
    else
        $('#advanced-faq-btn').text(lang["faq"]["adv-btn-show"]);
}

// italian language on click
$('#ita').click(function () {
    // change language to italian
    lang = ita;
    load_text();
    $('#ita').removeAttr("href");
    $('#eng').attr('href', '#');
});

// english language on click
$('#eng').click(function () {
    // change language to english
    lang = eng;
    load_text();
    $('#eng').removeAttr("href");
    $('#ita').attr('href', '#');
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