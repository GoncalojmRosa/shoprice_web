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
    <div className="wrapper-random">
      <div className="outer">
        <div className="content-item animated fadeInLeft">
          <span className="bg animated fadeInDown">{product.title}</span>
          <h1>
            {product.name}
            <br />
          </h1>
          <p className="paragraph">
            Shadow your real allegiance to New York's Pirate radio with this cool cap featuring the
            Graphic Know Wave logo.
          </p>

          <div className="button">
            <a href="#">{product.price}</a>
            <a className="cart-btn" href="#">
              <i className="cart-icon ion-bag"></i>ADD TO CART
            </a>
          </div>
        </div>
        <img src={product.img} width="300px" className="animated fadeInRight image-item" />
      </div>
    </div>
  );
};

export default ProductItem;
