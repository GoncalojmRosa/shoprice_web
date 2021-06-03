import React from 'react';

import './styles.css';

import WebAssetIcon from '@material-ui/icons/WebAsset';
import { Box, Grid, Container } from '@material-ui/core';

export interface Product {
  title: string;
  name: string;
  price: number;
  img: string;
  url: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Grid item lg={4} md={6} xs={12}>
      <div className="outer" style={{ borderRadius: 20 }}>
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
            <a href={product.url}>{product.price} €</a>
            <a href={product.url} style={{ maxHeight: 38 }}>
              <WebAssetIcon fontSize="small" /> Site
            </a>
          </div>
        </div>
        <img src={product.img} width="300px" className="animated fadeInRight image-item" />
      </div>
    </Grid>
  );
};

export default ProductItem;
