let imageURL;

function submitHandler() {
    const uploadBtn = document.getElementById('uploadBtn');
    const spinner = document.getElementById('spinner');
    const fileInput = document.getElementById('fileInput');

    // Show spinner and disable button when upload starts
    spinner.style.display = 'inline-block';
    uploadBtn.disabled = true;

    const image = fileInput.files[0];

    // Check if an image is selected
    if (!image) {
        alert("Please select an image to upload.");
        spinner.style.display = 'none'; // Hide spinner if no file is selected
        uploadBtn.disabled = false; // Re-enable the button
        return; // Exit the function
    }

    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    const apiKey = '6ixxHmvWCW66jn9unk29HWXP';

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
    .then(function (response) {
        return response.blob();
    })
    .then(function (blob) {
        const url = URL.createObjectURL(blob);
        imageURL = url;
        const img = document.createElement('img');
        img.src = url;

        const previewContainer = document.querySelector('.preview-container');
        previewContainer.innerHTML = ''; // Clear previous images
        previewContainer.appendChild(img);

        // Hide spinner and enable button after upload
        spinner.style.display = 'none';
        uploadBtn.disabled = false;
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('Failed to upload image. Please try again.');

        // Hide spinner and enable button in case of error
        spinner.style.display = 'none';
        uploadBtn.disabled = false;
    });
}

function downloadFile() {
    if (imageURL) {
        const anchorElement = document.createElement('a');
        anchorElement.href = imageURL;
        anchorElement.download = 'processed_image.png';
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
    } else {
        alert('No image available to download. Please upload and process an image first.');
    }
}
