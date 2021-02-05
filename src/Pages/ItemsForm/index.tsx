import React, { FormEvent, useState } from 'react';
import Input from '../../Components/Input';
import PageHeader from '../../Components/PageHeader';
import { Product } from '../../Components/ProductItem';

import { getProducts, ProductsResponse } from '../../services/auth';
//CSS
import './styles.css';

export default function ItemsForm() {
  const [isModalOpen, setModalState] = useState(false);
  const [product, setProduct] = useState('');
  const [result, setResult] = useState([]);

  const toggleModal = () => setModalState(!isModalOpen);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    getProducts({ product })
      .then((res) => {
        // console.log(res.data.Data[0].Continente.name);
        // console.log(res.data.Data.length);
        setResult(res.Data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      {/* <TopBarContainer */}
      <PageHeader
        page={'Comparar'}
        title={'Ainda bem que você decidiu poupar dinheiro'}
        description={'O primeiro passo é criar a sua lista de compras'}
      >
        <form id="search-container" onSubmit={(e) => handleSearch(e)}>
          {/* <input type="text" className="search-box" placeholder="Search For a Product.." /> */}
          <div className="input-div">
            <Input
              name=""
              label="asdas"
              className="search-box"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="search-button">
            Go
          </button>
        </form>
        <div>
          {result.map((prods: ProductsResponse) => {
            return <div key="a">{}</div>;
          })}
        </div>
      </PageHeader>
      {/* <main></main> */}
    </div>
  );
}
