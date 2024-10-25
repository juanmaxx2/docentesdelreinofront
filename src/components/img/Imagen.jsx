// ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // Maneja el cambio de archivo
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Mostrar vista previa
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Por favor selecciona una imagen primero');
            return;
        }

        const formData = new FormData();
        formData.append('image', image); // El nombre 'image' debe coincidir con el backend
        try {
            const response = await axios.post('http://localhost:3001/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imagen cargada:', response.data);
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && <img src={preview} alt="Vista previa" style={{ width: '100px', height: '100px' }} />}
                <button type="submit">Subir Imagen</button>
            </form>
        </div>
    );
};

export default ImageUpload;
