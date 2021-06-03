import { Container, Box, Grid, Button, Fab } from '@material-ui/core';
import React, { FormEvent, useEffect, useState } from 'react';
import ProductItem from '../../Components/ProductItem';
import TopBarContainer from '../../Components/TopBarContainer';
// import { Product } from '../../Components/ProductItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import { Categories, getCategories, getProducts, Product } from '../../services/auth';
//CSS
import './styles.css';

export default function ItemsForm() {
  const [isModalOpen, setModalState] = useState(false);
  const [product, setProduct] = useState('');
  const [result, setResult] = useState<Product[]>([]);
  const [resultReady, setResultReady] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isClicked, setClicked] = useState(false);
  const [OpenDialogAdd, setOpenDialogAdd] = useState(false);
  const [style, setStyle] = useState('active');
  const [defaultOption, setDefaultOption] = useState<String>('All');

  const [showInitialResults, setShowInitialResults] = useState(true);

  /********************DIALOG DATA******************* */
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [url, setUrl] = useState<string>();
  const [img, setImg] = useState<string>();
  const [title, setTitle] = useState<string>();

  /************************************************** */

  const [initialResults, setInitialResults] = useState<Product[]>([
    {
      title: 'Continente',
      name: 'Alface Frisada',
      price: 1.49,
      img: 'https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dw5a1fb5b0/images/col/264/2647366-frente.jpg?sw=280&sh=280',
      url: 'https://www.continente.pt/pesquisa/?q=Alface',
    },
    {
      title: 'Pingo Doce',
      name: 'Alface da Madeira - Unidade 0.42 Kg',
      price: 1.99,
      img: 'https://res.cloudinary.com/fonte-online/image/upload/c_fill,h_300,q_auto,w_300/v1/PDO_PROD/610477_1',
      url: 'https://mercadao.pt/store/pingo-doce/search?queries=Alface',
    },
    {
      title: 'Auchan',
      name: 'alface roxa kg',
      price: 1.29,
      img: 'https://www.auchan.pt/dw/image/v2/BFRC_PRD/on/demandware.static/-/Sites-auchan-pt-master-catalog/default/dw83c8a56f/images/hi-res/000233982.jpg?sw=250&sh=250&sm=fit&bgcolor=FFFFFFFF',
      url: 'https://www.auchan.pt/Frontoffice/search/Alface',
    },
  ]);

  const toggleModal = () => setModalState(!isModalOpen);

  function comparePrices() {
    setOpenDialogAdd(true);
    if (result[0].price > result[1].price && result[0].price > result[2].price) {
      setImg(result[0].img);
      setPrice(result[0].price);
      setUrl(result[0].url);
      setName(result[0].name);
      setTitle(result[0].title);
      console.log('preço 0 maior');
    } else if (result[1].price > result[0].price && result[1].price > result[2].price) {
      setImg(result[1].img);
      setPrice(result[1].price);
      setUrl(result[1].url);
      setName(result[1].name);
      setTitle(result[1].title);
      console.log('preço 1 maior');
    } else if (result[2].price > result[0].price && result[2].price > result[1].price) {
      setImg(result[2].img);
      setPrice(result[2].price);
      setUrl(result[2].url);
      setName(result[2].name);
      setTitle(result[2].title);
      console.log('preço 2 maior');
    }
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    let Category: String = '';

    defaultOption === 'All' ? (Category = '') : (Category = defaultOption);

    getProducts({ product, Category })
      .then((res) => {
        console.log(res.data);
        // setResult(res.data.Data[0].);
        setResult(res.data);
        setResultReady(true);
        setShowInitialResults(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories({ id: 1 }).then((a) => {
      setCategories(a.data);
    });
  }, []);

  function DropDownList(e: any) {
    e.preventDefault();

    setClicked(!isClicked);

    // $('.dropdown ul li').click(function () {
    //   var text = $(this).text();
    //   $('.default_option').text(text);
    //   $('.dropdown ul').removeClass('active');
    // });
  }

  const handleClose = () => {
    setOpenDialogAdd(false);
  };

  return (
    <div>
      <TopBarContainer profile={true} />
      {OpenDialogAdd ? (
        <Dialog open={OpenDialogAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Produto com Melhor Preço!</DialogTitle>
          <DialogContent>
            <DialogContentText>{title}</DialogContentText>
            <img src={img} alt="" />
            <a href={url}></a>
            <p>{name}</p>

            <p>{price} $</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button color="primary" onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
      <div className="wrapper" style={{ zIndex: 10 }}>
        <form onSubmit={handleSearch}>
          <div className="search_box">
            {resultReady ? (
              <Box>
                <Container maxWidth="xl">
                  <Grid container>
                    <Grid item>
                      <Fab size="small" onClick={comparePrices}>
                        <CompareArrowsIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            ) : (
              ''
            )}

            <div className="dropdown-categories" onClick={DropDownList}>
              <div className="default_option">{defaultOption}</div>
              <ul className={isClicked ? style : ''}>
                <li onClick={() => setDefaultOption('All')}>All</li>
                {categories.map((cat) => {
                  return <li onClick={() => setDefaultOption(cat.name)}>{cat.name}</li>;
                })}
                {/* <li onClick={() => setDefaultOption('All')}>All</li>
                <li onClick={() => setDefaultOption('Recent')}>Recent</li>
                <li onClick={() => setDefaultOption('Popular')}>Popular</li> */}
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
      {/* <div className="wrapper-random"> */}
      <Box sx={{ paddingTop: 20 }}>
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            {showInitialResults
              ? initialResults.map((prods: Product) => {
                  return <ProductItem key={prods.title} product={prods} />;
                })
              : ''}
            {result.map((prods: Product) => {
              return <ProductItem key={prods.title} product={prods} />;
            })}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
