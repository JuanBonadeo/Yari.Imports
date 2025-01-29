import React from 'react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import './cart.css'
import { CartContext } from '../../context/CartContext'
import { Button } from '../../ui/'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2';
import { QuantityControl } from '../../components/'


export const Cart = () => {
  const useCart = () => {
    return useContext(CartContext)
  }
  const { cart, addItem, totalQuantity, removeItem, isInCart, total, clearCart, updateQuantity, updateQuantitySelect, formatearMoneda, calcularDescuento } = useCart();
  const handleOnAdd = (id, x) => {
    updateQuantity(id, x)
  }
  const handleOnChange = (id, x) => {
    ;
    updateQuantitySelect(id, x);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <div className='cartContainer'>
        <h1>Carrito</h1>
        <h2>No hay productos en el carrito</h2>
        <Button to='/productos' label='Volver' />
      </div>
    )
  }
  return (

    <div className='cartContainer'>
      <motion.h1
        initial={{ scale: 0, x: '-100vw' }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5, type: "spring" }}
      >Carrito</motion.h1>
      <div className='cartItems'>
        {
          cart.map(prod => {
            return (
              <motion.div
                initial={{ scale: 0, x: '-100vw' }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5, type: "spring" }}


                className='productInCart' key={prod.id}>
                <div className="imgName">
                  <Link to={`/producto/${prod.id}`}><img className="" src={prod.img}></img>  </Link>
                  <Link to={`/producto/${prod.id}`}><h4 className='title'>{prod.nombre}</h4></Link>
                </div>
                <div className="controls">
                  <div className="quantityControl">
                    <button onClick={() => updateQuantity(prod.id, -1, prod.sabor)}>-</button>
                    <p>{prod.quantity}</p>
                    <button onClick={() => updateQuantity(prod.id, +1, prod.sabor)}>+</button>
                  </div>
                  { prod.descuento !== 0 && 
                  <>
                  <p className='price2'>{formatearMoneda(prod.precio * prod.quantity)}</p>
                  <span className='discountedPrice'>{calcularDescuento(prod.precio * prod.quantity, prod.descuento)}</span></>
                  }
                  <p className='price'>{formatearMoneda(prod.precio * prod.quantity)}</p>
                  
                  <DeleteOutlineIcon className='delete' onClick={() => removeItem(prod.id, prod.sabor)}></DeleteOutlineIcon>
                </div>
              </motion.div>
            )
          })
        }
      </div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1, type: "spring" }}
        className="btnTotal">
        <h5>Total de la compra: {formatearMoneda(total)}</h5>
        <Button action={() => clearCart()} label="Vaciar" />
        <Button to={'/codigodescuento/'} label="Iniciar Compra" />
      </motion.div>


    </div>
  )
}



