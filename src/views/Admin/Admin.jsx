import React, { useState } from 'react';
import './Admin.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { uploadToCloudinary } from '../../helpers/uploadToCloudinary';


export const Admin = () => {

    const [marca, setMarca] = useState('ignite');
    const [nombre, setNombre] = useState('');
    const [sabores, setSabores] = useState([
        {
            sabor: '',
            stock: true,
            imagen: null
        }]);
    const [conTamanios, setConTamanios] = useState(false);

    const handleNombre = (e) => {
        setNombre(e.target.value);
    };

    const handleMarca = (e) => {
        setMarca(e.target.value);
    };



    const handleSaborChange = (index, field, value) => {
        const updatedSabores = [...sabores];
        updatedSabores[index][field] = value;
        setSabores(updatedSabores);
    };

    const addSaborField = () => {
        setSabores([...sabores, { sabor: '', stock: true, imagen: null}]);
    };

    const removeSaborField = (index) => {
        const updatedSabores = sabores.filter((_, i) => i !== index);
        setSabores(updatedSabores);
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const updatedSabores = [...sabores];
                updatedSabores[index].imagen = file; // Guarda el archivo de imagen
                updatedSabores[index].preview = reader.result; // Guarda la vista previa
                setSabores(updatedSabores);
            };
            reader.readAsDataURL(file);
        }
    };
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const precio = parseInt(document.getElementById('precio').value);
            const descuento = parseInt(document.getElementById('descuento').value);
            const destacados = document.getElementById('destacados').checked;
            const descripcion = document.getElementById('descripcion').value;
            const nombreProducto = nombre.toUpperCase().replace(/\s+/g, '-');
    
            // Subir imágenes de cada sabor a Cloudinary
            const saboresConImagenes = await Promise.all(
                sabores.map(async (sabor) => {
                    if (sabor.imagen) {
                        const imagenUrl = await uploadToCloudinary(sabor.imagen, marca, nombreProducto);
                        return { ...sabor, imagen: imagenUrl, preview: undefined }; 
                    }
                    return { ...sabor, preview: undefined }; 
                })
            );
    
            const nuevoProducto = {
                nombre,
                precio,
                descuento,
                destacados,
                descripcion,
                marca,
                sabores: saboresConImagenes,
            };
    
            console.log(nuevoProducto); // Depura el objeto antes de guardar
            await setDoc(doc(db, 'products', nombreProducto), nuevoProducto);
    
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error al agregar producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar producto',
                text: error.message,
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="adminContainer">
            <form className="adminForm" onSubmit={addProduct}>
                <h1>Administrar Productos</h1>
                <div className="info1">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required value={nombre} onChange={handleNombre} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destacados">Destacados:</label>
                        <input type="checkbox" id="destacados" name="destacados" className="destacados" />
                    </div>

                </div>
                <div className="info1">
                    <div className="form-group">
                        <label htmlFor="price">Precio:</label>
                        <input type="number" id="precio" name="precio" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descuento">Descuento:</label>
                        <select name="descuento" id="descuento" required>
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                            <option value="15">15%</option>
                            <option value="20">20%</option>
                            <option value="25">25%</option>
                            <option value="30">30%</option>
                            <option value="35">35%</option>
                            <option value="40">40%</option>
                            <option value="45">45%</option>
                            <option value="50">50%</option>
                            <option value="60">60%</option>
                        </select>
                    </div>
                </div>
                <div className="info1">
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <input type="text" id="descripcion" name="descripcion" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="marca">Marca:</label>
                        <select name="marca" id="marca" required value={marca} onChange={handleMarca}>
                            <option value="ignite">Ignite</option> 
                            <option value="elfbar">Elfbar</option> 
                            <option value="lostmary">Lost Mary</option> 
                        </select>
                    </div>

                </div>
                <div>
                    <h3>Sabores</h3><hr />
                    {sabores.map((sabor, index) => (
                        <>
                        <div key={index} className="info-1">
                            <div className="form-group">
                                <label>Nombre Sabor:</label>
                                <input
                                    type="text"
                                    placeholder="sabor"
                                    value={sabor.sabor}
                                    onChange={(e) => handleSaborChange(index, 'sabor', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Imagen:</label>
                                <input
                                    type="file"
                                    id={`img-${index}`}
                                    name={`imagen-${index}`}
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                {sabor.preview && (
                                    <img src={sabor.preview} alt={`Preview ${index}`} style={{ maxWidth: '100px' }} />
                                )}
                            </div>
                            <button className="Button" onClick={() => removeSaborField(index)}>
                                Eliminar
                            </button>
                            
                        </div><hr /></>
                    ))}
                    <button className="Button" onClick={addSaborField}> +Sabor</button>
                </div>

                <button className="Button" type="submit">
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default Admin;
