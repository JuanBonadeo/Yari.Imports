import './category.css'
import { Link } from 'react-router-dom';
const categoriasImg = [
    {
        name: 'Hombre',
        url: 'marcas1.png',
        to: 'categoria/ignite'
    },
    {
        name: 'Mujer',
        url: 'marcas2.png',
        to: 'categoria/elfbar'
    },
    {
        name: 'Unisex',
        url: 'marcas3.png',
        to: 'categoria/lostmary'
    },

]
export const Categorias = () => {
    return (
        <>
            <div className="categoriasContiner">
                {categoriasImg.map(category => {
                    return (
                        <Link className='category' to={category.to}>
                            <img src={category.url} alt={category.name} className="categoryImg">
                            </img>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
