let ita = {
    "home": {
        "nav-title": "Ottimizzatore QR Green Pass",
        "main-title": "Indica l'immagine con il codice QR del Green Pass:",
        "sub-title": "Formati supportati: ",
        "file-selector": "Scegli immagine",
        "qrcamera-btn": "Scansiona QR Code",
        "stop-scanner": "Annulla scansione",
        "adv-options": "Impostazioni avanzate",
        "radio-eu": "Supporto app di verifica sia italiana che EU. (Default)",
        "radio-it": "Supporto app di verifica solo italiana. (Pi\xF9 leggero, <a id='setting-faq-btn' href='#'>leggi FAQ</a>)",
        "success-msg": "QR Code generato con successo.",
        "download-btn": "Download codice QR"
    },
    "faq": {
        "nav-title": "Domande frequenti",
        "question": "DOMANDA:",
        "answer": "RISPOSTA:",
        "adv-detail": "Dettagli avanzati",
        "question1": "Cosa posso fare con questa applicazione?",
        "answer1": " Questa applicazione permette di rigenerare il QR Code contenente il Green Pass in modo tale che sia meno denso e di conseguenza pi\xF9 leggibile dalle app di verifica.",
        "question2": "Cosa devo fare per generare il nuovo QR Code?",
        "answer2": " Ci sono due modi per fornire il QR Code originale: premendo il pulsante \"Scegli file\" e selezionando l'immagine del QR Code valido dall'archivio del dispositivo, oppure avviando la scansione tramite fotocamera premendo il pulsante \"Scansiona QR\" e inquadrando il QR Code. Entrambe le procedure generano automaticamente un nuovo QR Code, che potr\xE0 essere salvato premendo il pulsante \"Download\".",
        "question3": "L'applicazione \xE8 sicura? Cosa succede al mio Green Pass?",
        "answer3": "L'applicazione \xE8 sviluppata puramente in JavaScript, una tecnologia che permette di elaborare il Green Pass nel browser senza inviare dati sulla rete. L'applicazione non invia o salva il contenuto del Green Pass in nessun modo e il certificato non viene modificato.",
        "adv-ans3": "Al momento del caricamento della home page, tutte le componenti necessarie vengono caricate in modo tale che rimangano statiche e non ci siano comunicazioni di rete durante il caricamento e l'elaborazione del QR Code dell'utente. Di seguito vengono riportati alcuni dettagli implementativi e le librerie usate nei processi di manipolazione dei dati sensibili:",
        "adv-ans3-file-sel1": "Selezione file:",
        "adv-ans3-file-sel2": `Per caricare l'immagine del QR Code dal file system viene usata la libreria <a href="https://github.com/nimiq/qr-scanner" target="_blank">Qr-Scanner</a>. Nel caso del caricamento manuale di un file, JavaScript necessita la creazione di un oggetto URL per poter accedere all'immagine fornita dall'utente; questo processo \xE8 considerato da alcuni browser una richiesta di rete, come riportato nella seguente immagine di esempio:`,
        "adv-ans3-file-sel3": "Ci\xF2nonostante, questa richiesta non viene inviata effettivamente sulla rete e ne \xE8 prova il fatto che la generazione pu\xF2 essere effettuata offline e che la richiesta non presenta un indirizzo remoto come nella seguente immagine di esempio:",
        "adv-ans3-qr-scan1": "Scansione QR:",
        "adv-ans3-qr-scan2": `Per scansionare il QR Code viene usata la libreria <a href="https://www.npmjs.com/package/html5-qrcode" target="_blank">Html5-QRCode</a>. A differenza della libreria precedente, questa permette a JavaScript di leggere il contenuto dell'immagine direttamente dallo stream MediaStream, evitando la creazione di un oggetto blob e il conseguente URL che in alcuni casi viene considerato come richiesta di rete.`,
        "adv-ans3-qr-gen1": "Generazione codice QR:",
        "adv-ans3-qr-gen2": `Per decodificare il contenuto del QR Code originale viene usata la libreria <a href="https://github.com/ministero-salute/dcc-utils" target="_blank">DCC-Utils</a>, mentre per la generazione del nuovo QR Code viene usata la libreria <a href="https://github.com/kozakdenys/qr-code-styling" target="_blank">QR-Code-Styling</a>. Una volta effettuata la decodifica, il contenuto viene passato senza alcuna modifica al generatore di QR, che lo trasforma nel nuovo QR Code usando come parametro di correzione dell'errore il valore \"L\", risultante in una minore densit\xE0 del QR Code rispetto al valore originale \"M\".`,
        "question4": "Il Green Pass qui fornito \xE8 valido come quello originale? Quali app di verifica europee sono compatibili?",
        "answer4": "Non vengono effettuate manipolazioni al contenuto della certificazione: se il tuo Green Pass originale viene accettato dalle app di verifica, allora anche quello qui fornito sar\xE0 valido. Abbiamo testato con le app dei seguenti paesi: Italia, Belgio, Repubblica Ceca, Irlanda.",
        "question5": "Cosa si intende per \"Supporto app di verifica sia italiana che EU\" e \"Supporto app di verifica solo italiana\"?",
        "answer5": "Attualmente l'app di verifica italiana VerificaC19 non controlla una sequenza di caratteri posta all'inizio del contenuto del QR Code, per cui la nostra applicazione offre la possibilit\xE0 di rimuovere questo prefisso per minimizzare la densit\xE0 del nuovo QR Code nel caso la seconda opzione venga manualmente selezionata dall'utente, mentre l'opzione di default lascia intatta questa sequenza che viene invece controllata da altre app di verifica europee.",
        "adv-ans5": `In particolare, la stringa che viene ignorata dalla verifica dell'app italiana VerificaC19 \xE8 la dicitura \"HC1:\" che identifica la versione del certificato digitale e di conseguenza la codifica e il processo di generazione effettuati su di esso, come definito dalle <a target="_blank" href="https://ec.europa.eu/health/sites/default/files/ehealth/docs/digital-green-certificates_v1_en.pdf#page=7">specifiche europee</a>. Rimuovendo questa corta stringa, \xE8 possibile ridurre le dimensioni del file di output di una quantit\xE0 nell'ordine di ~1KB.`,
        "question6": "Posso controllare il codice sorgente? Chi sono gli autori?",
        "answer6": `Il codice sorgente \xE8 disponibile <a href='https://github.com/mcarfiz/dgcc-optimizer-js' target="_blank">attraverso questo link</a>. Questo progetto fa parte della tesi di Laurea Magistrale in Computer Science di Marco Carfizzi e Giacomo Arrigo, sotto la supervisione del <a href= 'https://www.unive.it/data/persone/5590470/curriculum' target='_blank'>Prof. Riccardo Focardi</a>.`,
        "question7": "Quali formati sono compatibili?",
        "answer7": "\xC8 possibile caricare un qualsiasi formato immagine, come ad esempio jpg, png, gif, ma non file pdf. Se hai la necessità di convertire il QR di un file pdf puoi usare la funzione di scannerizzazione da videocamera!"
    }
}

let eng = {
    "home": {
        "nav-title": "DGCC QR Optimizer",
        "main-title": "Provide your QR Covid Certificate:",
        "file-selector": "Choose image",
        "qrcamera-btn": "Scan QR Code",
        "stop-scanner": "Stop scanning",
        "adv-options": "Advanced settings",
        "radio-eu": "Support both EU and Italian app. (Default)",
        "radio-it": "Support only VerificaC19 Italian app. (Lighter, <a id='setting-faq-btn' href='#'>read FAQ</a>)",
        "success-msg": "QR has been correctly generated.",
        "download-btn": "Download QR code"
    },
    "faq": {
        "nav-title": "Frequently Asked Questions",
        "question": "QUESTION:",
        "answer": "ANSWER:",
        "adv-detail": "Advanced details",
        "question1": "What can I do with this app?",
        "answer1": " This app allows you to regenerate the QR Code containing the Digital Green Covid-19 Certification (DGCC) so that it is less dense and consequently more readable by verification apps.",
        "question2": "What do I have to do to generate the new QR Code?",
        "answer2": " There are two ways to provide the original QR Code: by pressing the \"Choose file\" button and selecting the valid QR Code image from the device archive, or by starting the scanning through the camera by pressing the \"Scan QR with camera\" button and framing the QR Code. Both procedures automatically generate a new QR Code, which can be saved by pressing the \"Download\" button.",
        "question3": " Is this application safe? What happens to my Covid-19 Certification?",
        "answer3": " The application is developed purely in JavaScript, a technology that allows the DGCC to be processed in the browser without sending data over the network. The application does not send or save the content of the Green Pass in any way, and the certificate is not modified.",
        "adv-ans3": "Upon loading the home page, all necessary components are loaded in such a way that they remain static and there is no network communication during the loading and processing of the user's QR Code. Some implementation details and libraries used in the sensitive data manipulation processes are given below:",
        "adv-ans3-file-sel1": "File selection:",
        "adv-ans3-file-sel2": `To load the QR Code image from the file system, the <a href="https://github.com/nimiq/qr-scanner" target="_blank">Qr-Scanner</a> library is used. In the case of manually loading a file, JavaScript requires the creation of a URL object in order to access the user-supplied image; this process is considered a network request by some browsers, as shown in the following example image:`,
        "adv-ans3-file-sel3": "Nevertheless, this request is not actually sent over the network and proof of this is the fact that generation can be done offline and the request does not have a remote address as in the following example image:",
        "adv-ans3-qr-scan1": "QR scan:",
        "adv-ans3-qr-scan2": `To scan the QR Code the <a href="https://www.npmjs.com/package/html5-qrcode" target='_blank'>Html5-QRCode</a> library is used. Unlike the previous library, this one allows JavaScript to read the content of the image directly from the MediaStream stream, avoiding the creation of a blob object and the resulting URL which in some cases is considered as a network request.`,
        "adv-ans3-qr-gen1": "QR code generation:",
        "adv-ans3-qr-gen2": `To decode the content of the original QR Code the <a href="https://github.com/ministero-salute/dcc-utils" target="_blank">DCC-Utils</a> library is used, while for the generation of the new QR Code the <a href="https://github.com/kozakdenys/qr-code-styling" target="_blank">QR-Code-Styling</a> library is used. Once the decoding is done, the content is passed without any changes to the QR generator, which transforms it into the new QR Code using the value \"L\" as an error correction parameter, resulting in a lower density of the QR Code compared to the original value \"M\".`,
        "question4": "Is the DGCC provided here as good as the original one? What european verification apps are compatible?",
        "answer4": "No manipulations are made to the certification content: if your original Green Pass is accepted by the verification apps, then the one provided here will be valid as well. We tested with apps from the following countries: Italy, Belgium, Czech Republic, Ireland.",
        "question5": "What is the meaning of \"Support both EU and Italian app\" and \"Support only VerificaC19 Italian app\"?",
        "answer5": "Attualmente l'app di verifica italiana VerificaC19 non controlla una sequenza di caratteri posta all'inizio del contenuto del QR Code, per cui la nostra applicazione offre la possibilit\xE0 di rimuovere questo prefisso per minimizzare la densit\xE0 del nuovo QR Code nel caso la seconda opzione venga manualmente selezionata dall'utente, mentre l'opzione di default lascia intatta questa sequenza che viene invece controllata da altre app di verifica europee.",

        "answer5": " Currently the Italian verification app VerificaC19 does not check a sequence of characters placed at the beginning of the QR Code content, so our app offers the possibility to remove this prefix to minimize the density of the new QR Code in case the second option is manually selected by the user, while the default option keeps intact this sequence that is conversely checked by other european verification apps.",
        "adv-ans5": `In particular, the prefix string that is ignored by the verification of the Italian VerifyC19 app is the wording \"HC1:\", which identifies the version of the digital certificate and consequently the encoding and generation process carried out on it, as defined by the <a target="_blank" href="https://ec.europa.eu/health/sites/default/files/ehealth/docs/digital-green-certificates_v1_en.pdf#page=7">European specifications</a>. By removing this short string, it is possible to reduce the output file dimension by a quantity in the order of ~1KB.`,
        "question6": "Can I check the source code? Who are the authors?",
        "answer6": `Source code is available <a href='https://github.com/mcarfiz/dgcc-optimizer-js' target='_blank'>at this link</a>. This project is part of the Master thesis in Computer Science of Marco Carfizzi and Giacomo Arrigo, supervised by <a href='https://www.unive.it/data/persone/5590470/curriculum' target='_blank'>Prof. Riccardo Focardi</a>.`,
        "question7": "What formats are supported?",
        "answer7": "You can upload any image format, such as jpg, png, gif, but not pdf files. If you need to convert the QR of a pdf file you can use the camera scanning feature!"
    }
}