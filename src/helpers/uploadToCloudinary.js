import imageCompression from 'browser-image-compression';

const compressImage = async (file) => {
    const options = {
        maxSizeMB: 1, // Tamaño máximo en MB
        maxWidthOrHeight: 1024, // Redimensionar la imagen si es necesario
        useWebWorker: true,
    };
    return await imageCompression(file, options);
};

export const uploadToCloudinary = async (file, category, productName) => {
    const compressedFile = await compressImage(file);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'yarisImport');
    formData.append('folder', `yarisImport/products/${category}/${productName}`);

    const response = await fetch('https://api.cloudinary.com/v1_1/do36rxfoe/image/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir la imagen a Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
};
