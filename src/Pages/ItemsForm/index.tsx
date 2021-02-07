import React, { FormEvent, useState } from 'react';
import Input from '../../Components/Input';
import PageHeader from '../../Components/PageHeader';
import ProductItem from '../../Components/ProductItem';
// import { Product } from '../../Components/ProductItem';

import { getProducts, Product } from '../../services/auth';
//CSS
import './styles.css';

export default function ItemsForm() {
  const [isModalOpen, setModalState] = useState(false);
  const [product, setProduct] = useState('');
  const [result, setResult] = useState<Product[]>([]);

  const toggleModal = () => setModalState(!isModalOpen);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    getProducts({ product })
      .then((res) => {
        console.log(res.data);
        // setResult(res.data.Data[0].);
        // console.log(res.data);
        setResult(res.data);
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
      </PageHeader>
      <div>
        {result.map((prods: Product) => {
          return <ProductItem key={prods.title} product={prods} />;
        })}
      </div>
      {/* <main></main> */}
    </div>
  );
}
