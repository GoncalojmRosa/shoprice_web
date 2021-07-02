import React, { useState } from 'react';

import './styles.css';

import WebAssetIcon from '@material-ui/icons/WebAsset';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export interface Product {
  title?: string;
  name: string;
  price?: number;
  img?: string;
  url?: string;
}

interface ProductItemProps {
  error?: boolean;
  errorMessage?: string | undefined;
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, errorMessage, error }) => {
  // let s = product.name.split(/(?<=^\S+)\s/);
  // second = second.join(" ")

  return (
    <Grid item lg={4} md={6} xs={12}>
      {error ? (
        <div className="outer" style={{ borderRadius: 20 }}>
          <div className="content-item animated fadeInLeft">
            <h1>
              <Alert severity="error">{errorMessage}</Alert>
              <br />
            </h1>
          </div>
        </div>
      ) : (
        <div className="outer" style={{ borderRadius: 20 }}>
          <div className="content-item animated fadeInLeft">
            <span className="bg animated fadeInDown">{product.title}</span>
            {/* <h2>
              {product.name}
              <br />
            </h2> */}
            <p className="paragraph" style={{ fontSize: '20px' }}>
              {product.name}
            </p>

            <div className="button">
              <a href={product.url} style={{ marginTop: '20px', fontSize: '15px' }}>
                {product.price} €
              </a>
              <a href={product.url} style={{ fontSize: '14px' }}>
                <WebAssetIcon fontSize="small" /> Site
              </a>
            </div>
          </div>
          <img src={product.img} width="300px" className="animated fadeInRight image-item" />
        </div>
      )}
    </Grid>
  );
};

export default ProductItem;
