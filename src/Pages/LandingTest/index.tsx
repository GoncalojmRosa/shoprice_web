import React, { FormEvent, useContext, useEffect, useState } from 'react';
import Aos from 'aos';

import 'mdi/css/materialdesignicons.min.css';
import 'aos/dist/aos.css';
import '../../Assets/Styles/style.min.css';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
//@ts-ignore
import Group171 from '../../Assets/images/Group171.svg';
import Group12 from '../../Assets/images/Group12.svg';
//@ts-ignore
import Group7 from '../../Assets/images/Group7.svg';
//@ts-ignore
import Group5 from '../../Assets/images/Group5.svg';
//@ts-ignore
import Group1 from '../../Assets/images/Group1.png';
//@ts-ignore
import Group2Png from '../../Assets/images/Group2.png';
//@ts-ignore
import Group95 from '../../Assets/images/Group95.svg';
//@ts-ignore
import Group108 from '../../Assets/images/Group108.svg';
//@ts-ignore
import Group126 from '../../Assets/images/Group126.svg';
//@ts-ignore
import Group115 from '../../Assets/images/Group115.svg';

import CarouselComponent from '../../Components/Carousel/Carousel';
import { AuthContext } from '../../contexts/auth';
import 'intro.js/introjs.css';
import { indexSuggestions, newReport } from '../../services/auth';
import TopBarContainer from '../../Components/TopBarContainer';
// import 'intro.js/themes/introjs-modern.css';
import { useNavigate } from 'react-router-dom';

import {
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Spinner from '../../Components/spinner/index';

interface User {
  name: string;
  avatar: string;
  id: string;
}
interface Comments {
  id: String;
  text: string;
  _created_at: string;
  suggestion_id: Int16Array;
  user_id: Int16Array;
  user: User;
}

interface Suggestions {
  id: Int16Array;
  text: string;
  likes: Int16Array;
  shares: Int16Array;
  views: Int16Array;
  comments: Comments[];
  user_id: Int16Array;
  _created_at: string;
  user: User;
}

function LandingTest() {
  const { user, emitMessage } = useContext(AuthContext);

  const [listSuggestions, setListSuggestions] = useState<Suggestions[]>([]);
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [OpenDialogAdd, setOpenDialogAdd] = useState(false);

  const [itemsShow, setItemsShow] = useState(4);

  window.onresize = ChangeCarouselItems;

  const handleClose = () => {
    setOpenDialogAdd(false);
  };

  function ChangeCarouselItems() {
    if (window.innerWidth <= 768) {
      setItemsShow(2);
    } else if (window.innerWidth > 768 && window.innerWidth < 993) {
      setItemsShow(3);
    } else if (window.innerWidth > 993) {
      setItemsShow(4);
    }
  }

  useEffect(() => {
    Aos.init({ duration: 3000 });
    ChangeCarouselItems();
    indexSuggestions().then((sug) => {
      setListSuggestions(sug.data);
    });
    // setLoading(false);
  }, []);

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      {showSpinner ? <Spinner /> : ''}
      <TopBarContainer profile={true}>
        <li className="nav-item btn-contact-us pl-4 pl-lg-0">
          <button onClick={() => setOpenDialogAdd(true)} className="btn btn-info">
            Contacte nos
          </button>
        </li>
      </TopBarContainer>
      {/* <Steps
        enabled={enableIntro}
        steps={steps}
        options={options}
        initialStep={0}
        onBeforeExit={onBeforeChange}
        onChange={(a: any) => setNextStepIndex(a + 1)}
      /> */}
      <div className="banner">
        <div className="container">
          <h1 className="font-weight-semibold">
            Compare preços entre <br />
            Supermercados Portugueses.
          </h1>
          <h6 className="font-weight-normal text-muted pb-3">
            Shoprice é uma plataforma totalmente segura e inovadora no mercado português.
          </h6>
          {/* <div>
            <button className="btn btn-opacity-light mr-1">Get started</button>
            <button className="btn btn-opacity-success ml-1">Learn more</button>
          </div> */}
          <img src={Group171} alt="" className="img-fluid" />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container">
          <section className="features-overview" id="features-section">
            <div className="content-header">
              <h2>Como funciona?</h2>
              <h6 className="section-subtitle text-muted">
                Basta pesquisar pelo produto que pretende e nós fazemos o resto.
              </h6>
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="grid-margin d-flex justify-content-start">
                <div className="features-width">
                  <img src={Group12} alt="" className="img-icons" />
                  <h5 className="py-3">
                    Experiência
                    <br />
                    incrível
                  </h5>
                  <p className="text-muted">
                    Aquilo que oferecemos é algo nunca antes visto em Portugal, desde comparar
                    preços até receber NewsLetter's com informações daquele produto que pretende
                    comprar
                  </p>
                </div>
              </div>
              <div className="grid-margin d-flex justify-content-center">
                <div className="features-width">
                  <img src={Group7} alt="" className="img-icons" />
                  <h5 className="py-3">
                    Preços
                    <br />
                    100% reais
                  </h5>
                  <p className="text-muted">
                    Caso esteja com algumas dúvidas em relação à informação pode consultar os
                    Supermercados para verificar a mesma.
                  </p>
                </div>
              </div>
              <div className="grid-margin d-flex justify-content-end">
                <div className="features-width">
                  <img src={Group5} alt="" className="img-icons" />
                  <h5 className="py-3">
                    Filtre por
                    <br />
                    categorias
                  </h5>
                  <p className="text-muted">
                    Caso não encontre o produto que pretende pesquisar pode sempre tentar alterar a
                    categoria e verificar se obtem alguma informação.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="digital-marketing-service" id="digital-marketing-section">
            <div className="row align-items-center">
              <div className="col-12 col-lg-7 grid-margin grid-margin-lg-0" data-aos="fade-right">
                <h3 className="m-0">
                  Oferecemos uma Grande gama
                  <br />
                  de supermercados Portugueses
                </h3>
                <div className="col-lg-7 col-xl-6 p-0">
                  <p className="py-4 m-0 text-muted">
                    A Shoprice oferece a capacidade de comparar preços entre Mini Preço, Pingo Doce
                    e Auchan.
                  </p>
                  <p className="font-weight-medium text-muted">
                    Disponibilizamos ainda da Global Data, Mbit e Chip7
                  </p>
                </div>
              </div>
              <div
                className="col-12 col-lg-5 p-0 img-digital grid-margin grid-margin-lg-0"
                data-aos="fade-left"
              >
                <img src={Group1} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 text-center flex-item grid-margin"
                data-aos="fade-right"
              >
                <img src={Group2Png} alt="" className="img-fluid" />
              </div>
              <div className="col-12 col-lg-5 flex-item grid-margin" data-aos="fade-left">
                <h3 className="m-0">
                  Lideramos as
                  <br />
                  comparações em Portugal.
                </h3>
                <div className="col-lg-9 col-xl-8 p-0">
                  <p className="py-4 m-0 text-muted">
                    Temos funcionalidades impressionantes e bem optimizadas prontas para serem
                    usadas estando desenhadas com o intuito de o ajudar.
                  </p>
                  <p className="pb-2 font-weight-medium text-muted">
                    Garantimos uma ferramenta autônoma e inteligente.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="case-studies" id="case-studies-section">
            <div className="row grid-margin">
              <div className="col-12 text-center pb-5">
                <h2>Aquilo que realmente importa</h2>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                data-aos="zoom-in"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-primary text-center card-contents">
                      <div className="card-image">
                        <img src={Group95} className="case-studies-card-img" alt="" />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">Know more about Online marketing</h6>
                          <button className="btn btn-white">Read More</button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">Proteger os seus dados</h6>
                      <p>Ceo, Marketing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-warning text-center card-contents">
                      <div className="card-image">
                        <img src={Group108} className="case-studies-card-img" alt="" />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">Know more about Web Development</h6>
                          <button className="btn btn-white">Read More</button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">Mostrar Preços reais</h6>
                      <p>Developing, Designing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-violet text-center card-contents">
                      <div className="card-image">
                        <img src={Group126} className="case-studies-card-img" alt="" />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">Know more about Web Designing</h6>
                          <button className="btn btn-white">Read More</button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">Design apelativo e moderno</h6>
                      <p>Designing, Developing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-success text-center card-contents">
                      <div className="card-image">
                        <img src={Group115} className="case-studies-card-img" alt="" />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">
                            Know more about Software Development
                          </h6>
                          <button className="btn btn-white">Read More</button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">Multiplataforma</h6>
                      <p>Developing, Designing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {listSuggestions !== null ? (
            <section className="customer-feedback" id="feedback-section" data-aos="fade-right">
              <div>
                <div className="col-12 text-center pb-5">
                  <h2>O que os nosso clientes têm a dizer</h2>
                  <h6 className="section-subtitle text-muted m-0">
                    Algumas Sugestões feitas pelos nossos Clientes.
                  </h6>
                </div>
                {/* <OwlCarousel options={options} events={events}> */}
                <div className="grid-margin">
                  <CarouselComponent data={listSuggestions} itemsToShow={itemsShow} />
                </div>
                {/* </OwlCarousel> */}
              </div>
            </section>
          ) : (
            ''
          )}

          <section className="contact-us" id="contact-section">
            <div className="contact-us-bgimage grid-margin">
              <div className="pb-4">
                <h4 className="px-3 px-md-0 m-0" data-aos="fade-down">
                  Tem alguma Sugestão?
                </h4>
                <h4 className="pt-1" data-aos="fade-down">
                  Envie-nos
                </h4>
              </div>
              <div data-aos="fade-up">
                <button
                  className="btn btn-rounded btn-outline-danger"
                  onClick={(e) => navigate('/app/suggestions')}
                >
                  Sugerir
                </button>
              </div>
            </div>
          </section>
          <footer className="border-top">
            <p className="text-center text-muted pt-4">
              Copyright © 2021
              <a href="https://github.com/GoncalojmRosa/" className="px-1">
                Gonçalo Rosa.
              </a>
              Direitos Reservados.
            </p>
          </footer>
          {OpenDialogAdd ? (
            <Dialog open={OpenDialogAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
              <Formik
                initialValues={{
                  Title: '',
                  Summary: '',
                }}
                validationSchema={Yup.object().shape({
                  Title: Yup.string().max(255).required('Preencha o campo Nome'),
                  Summary: Yup.string().max(255).required('Preencha o campo Password'),
                })}
                onSubmit={async (values, e) => {
                  setShowSpinner(true);

                  console.log(values);
                  newReport({
                    Title: values.Title,
                    Summary: values.Summary,
                    user_id: user.id,
                  }).then(() => {
                    setTimeout(function () {
                      setShowSpinner(false);
                    }, 1500);
                    emitMessage('Obrigado por enviar o report');
                    setOpenDialogAdd(false);
                  });
                  // register({
                  //   name: values.username,
                  //   email: values.email,
                  //   password: values.password,
                  // })
                  //   .then((a) => {
                  //     setOpenDialogAdd(false);
                  //     listUsers()
                  //       .then((res) => {
                  //         setCustomers(res.data.users);
                  //         setTimeout(function () {
                  //           setShowSpinner(false);
                  //         }, 1500);
                  //       })
                  //       .catch((error) => {
                  //         setTimeout(function () {
                  //           setShowSpinner(false);
                  //         }, 1000);

                  //         console.log(error);
                  //       });
                  //   })
                  //   .catch((error) => {
                  //     setTimeout(function () {
                  //       setShowSpinner(false);
                  //     }, 1000);

                  //     emitMessage(error.response.data.error, 'error');
                  //     // console.log(error)
                  //   });
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <DialogTitle id="form-dialog-title">Contactar</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Aqui poderá descrever aquilo que aconteceu em relação ao Bug, Obrigado por
                        nos ajudar!
                      </DialogContentText>
                      <TextField
                        autoFocus
                        error={Boolean(touched.Title && errors.Title)}
                        helperText={touched.Title && errors.Title}
                        value={values.Title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        margin="dense"
                        id="Title"
                        label="Título"
                        type="text"
                        fullWidth
                      />
                      <TextField
                        autoFocus
                        error={Boolean(touched.Summary && errors.Summary)}
                        helperText={touched.Summary && errors.Summary}
                        value={values.Summary}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        margin="dense"
                        id="Summary"
                        label="Descreva o Bug"
                        type="text"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancelar
                      </Button>
                      <Button color="primary" type="submit">
                        Enviar
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </Formik>
            </Dialog>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingTest;
