import React from 'react';

import './styles.css';

export interface Product {
  title: string;
  name: string;
  price: string;
  img: string;
  url: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div>
      <article className="teacher-item">
        <header>
          <img src={product.img} alt={product.name} />
          <div>
            <strong>{product.name}</strong>
          </div>
        </header>
        {/* <p>{teacher.bio}</p> */}
        <footer>
          <p>
            Preço
            <strong>{product.price}</strong>
          </p>

          <a
            // onClick={createNewConnection}
            href={product.url}
          >
            Ver na Loja Online
          </a>
        </footer>
      </article>
    </div>
  );
};

export default ProductItem;
