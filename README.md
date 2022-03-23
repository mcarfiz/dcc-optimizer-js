# dcc-optimizer-js
 A simple web app to optimize the QR code of the Digital COVID-19 Certificate.
 
 The DCC QR code is quite dense: this could cause issues during the scanning in the verification process (especially when printed).
 
 This application takes a QR code as an image file or by directly scanning it with a camera and returns a new one that is easier to read."

 Nothing in the content is touched and stored in the server, this application only re-encodes the QR code with a lower error correction.

# Usage (Desktop/Electron)
 Install `npm`
 
 Install dependencies with
 >npm install

 Run with
 >npm start

# Alternative (Browser):
 [Use http-server](https://www.npmjs.com/package/http-server) to launch in browser.

# Live demo
Live demo is available [at this link](https://mcarfiz.github.io/dcc-optimizer-js) thanks to GitHub pages.


