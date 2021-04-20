import React, { FormEvent, useState } from 'react';
import Input from '../../Components/Input';
import PageHeader from '../../Components/PageHeader';
import ProductItem from '../../Components/ProductItem';
import TopBarContainer from '../../Components/TopBarContainer';
// import { Product } from '../../Components/ProductItem';

import { getProducts, Product } from '../../services/auth';
//CSS
import './styles.css';

export default function ItemsForm() {
  const [isModalOpen, setModalState] = useState(false);
  const [product, setProduct] = useState('');
  const [result, setResult] = useState<Product[]>([]);
  const [isClicked, setClicked] = useState(false);
  const [style, setStyle] = useState('active');
  const [defaultOption, setDefaultOption] = useState('All');

  const toggleModal = () => setModalState(!isModalOpen);

  function handleSearch(e: FormEvent) {
    console.log(product);
    e.preventDefault();
    getProducts({ product })
      .then((res) => {
        console.log(res.data);
        // setResult(res.data.Data[0].);
        console.log(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function DropDownList(e: any) {
    e.preventDefault();

    setClicked(!isClicked);

    // $('.dropdown ul li').click(function () {
    //   var text = $(this).text();
    //   $('.default_option').text(text);
    //   $('.dropdown ul').removeClass('active');
    // });
  }

  return (
    <div>
      <TopBarContainer />
      <div className="wrapper">
        <form onSubmit={handleSearch}>
          <div className="search_box">
            <div className="dropdown" onClick={DropDownList}>
              <div className="default_option">{defaultOption}</div>
              <ul className={isClicked ? style : ''}>
                <li onClick={() => setDefaultOption('All')}>All</li>
                <li onClick={() => setDefaultOption('Recent')}>Recent</li>
                <li onClick={() => setDefaultOption('Popular')}>Popular</li>
              </ul>
            </div>
            <div className="search_field">
              <input
                type="text"
                className="input"
                value={product}
                placeholder="Search"
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              />
              <i className="fas fa-search" onClick={handleSearch}></i>
            </div>
          </div>
        </form>
      </div>
      <div className="wrapper-random">
        {result.map((prods: Product) => {
          return <ProductItem key={prods.title} product={prods} />;
        })}
      </div>
    </div>
  );
}
