import React from 'react'
import { useEffect, useState, useContext } from 'react'
import './productInfo.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { motion } from 'framer-motion';
import { CartContext } from '../../context/CartContext';
import { AddToCartIcon } from '../AddtoCartIcon/AddToCartIcon';
import { Button } from '../../ui/';




export const ProductInfo = ({ id, nombre, precio, img1, img2, img3, descripcion, descuento = 0, marca, sabores }) => {
  const [index, setIndex] = useState(0);
  const [sabor, setSabor] = useState(sabores[0].sabor);
  const [img, setImg] = useState(sabores[0].imagen);
  const [stock, setStock] = useState(sabores[0].stock);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const useCart = () => {
    return useContext(CartContext)
  }

  const { addItem, quantity, formatearMoneda, calcularDescuento } = useCart();

  const handleOnSaborChange = (saborNombre) => {
    const saborSeleccionado = sabores.find((s) => s.sabor === saborNombre);
    if (saborSeleccionado) {
      setSabor(saborSeleccionado.sabor); 
      setImg(saborSeleccionado.imagen); 
      setStock(saborSeleccionado.stock)
    }
  };

  const handleOnAdd = (quantity) => {
    const productToAdd = {
      id, nombre, precio, quantity, img, descuento, sabor
    }
    addItem(productToAdd)
  }
  const nuevoPrecio = calcularDescuento(precio, descuento)
  return (
    <>
      <div className='productInfoContainer'>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: .7, ease: "easeInOut", type: "spring", delay: .6 }}
          className="information">
          <h2>{nombre}</h2>
          {descuento !== 0 && (
            <div className="priceAddto">
              <h5>
                <span className="discountedPrice">{nuevoPrecio}</span>
                &nbsp;
                <span className="price2">{formatearMoneda(precio)}</span>

              </h5>
            </div>
          )}
          {descuento === 0 && (
            <div className="priceAddto">
              <h5 className='priceInfo'>Precio: {formatearMoneda(precio)}</h5>

            </div>
          )}
          <div className="sizeSelector">
            <h5>Seleccione un sabor:</h5>
            <select className='select' value={sabor} onChange={(e) => handleOnSaborChange(e.target.value)}>
              {sabores.map((t, index) => (
                <option key={index} value={t.sabor}>
                  {t.sabor} {stock ? '(en stock)' : '(sin stock)'}
                </option>
              ))}
            </select>
          </div>

          <p>{descripcion}</p>


          <AddToCartIcon onAdd={handleOnAdd} />
          <h5>marca: {marca.charAt(0).toUpperCase() + marca.slice(1)}</h5>
          <div className="envios"><h5>Envios por Rosario y Funes </h5><LocalShippingIcon /></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6, type: "tween" }}>
          <img className="infoImg" src={img} alt="Product" />

        </motion.div>

      </div>

    </>

  )
}
