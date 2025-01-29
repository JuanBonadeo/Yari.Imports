import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'
import { CartContext } from '../../context/CartContext';

import {AddToCartIcon} from '../AddtoCartIcon/AddToCartIcon';
import { Button } from '../../ui/';



export const ProductCard = ({ nombre, precio, id, descuento = 0 , sabores }) => {
  const useCart = () => {
    return useContext(CartContext)
  }
  const img = sabores[0].imagen
  const sabor = sabores[0].sabor
  const { addItem, quantity, formatearMoneda, calcularDescuento } = useCart();
  const handleOnAdd = (quantity) => {
    const productToAdd = {
      id, nombre, precio, quantity, descuento, sabor, sabores, img
    }
    addItem(productToAdd)
  }
  if (descuento !== 0) {
    const nuevoPrecio = calcularDescuento(precio, descuento)
    return (
      <div className='productCardContainer'>
        <Link to={`/producto/${id}`} className='img'>
          <div className='discountBadge'> {descuento}% OFF</div>
          <img src={img} alt={`${nombre}`} loading='lazy' className='imgProduct' />
        </Link>
        <div className="cardInfo">
          <div className="namePrice">
            <h4>{nombre}</h4>
            <div className="prices">
              <span className='discountedPrice'>{nuevoPrecio}</span>
              &nbsp;
              |
              &nbsp;
              <span className='price2'>{formatearMoneda(precio)}</span>
            </div>
          </div>
          <AddToCartIcon onAdd={handleOnAdd} /> 
        </div>
        {/* {!stock && <span className='outOfStockBadge'>Sin Stock</span>} */}
      </div>
    )
  }

  return (
    <div className='productCardContainer'>
      <Link to={`/producto/${id}`} className='img'>
        <img src={img} alt={`${nombre}`} loading='lazy' className={`imgProduct`} />
      </Link>
      <div className="cardInfo">
        <div className="namePrice">
          <h4>{nombre}</h4>
          <span>{formatearMoneda(precio)}</span>
        </div>
        <AddToCartIcon onAdd={handleOnAdd} /> 
      </div>
    </div>
  )

}
