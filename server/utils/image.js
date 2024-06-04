const SUPPORTED_IMAGE_FORMATS = [
    'image/jpg',
    'image/JPG',
    'image/jpeg',
    'image/JPEG',
    'image/png',
    'image/PNG',
];

// checks if file type is one of the supported image formats
const checkImageType = (uploaded_file) => {
    if (uploaded_file) {
        return SUPPORTED_IMAGE_FORMATS.includes(uploaded_file.mimetype)
    }
}

export { checkImageType }