function copyLink() {
  const link = window.location.href;
  navigator.clipboard.writeText(link)
    .then(() => alert("Link copied to clipboard!"))
    .catch(err => console.error("Failed to copy: ", err));
}



        // Get the current page's URL
        const qrCodeValue = window.location.href; 
        
        // Generate the QR Code
        const qrCode = new QRCode(document.getElementById('qrCodeContainer'), {
            text: qrCodeValue,
            width: 160,
            height: 160,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Make the QR Code downloadable after it's generated
        setTimeout(() => {
            const downloadBtn = document.getElementById('downloadBtn');
            const canvas = document.querySelector('#qrCodeContainer canvas');
            downloadBtn.href = canvas.toDataURL('image/png');
        }, 500);


