export const uploadToCloudinary = async (file, category, productName) => {
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
