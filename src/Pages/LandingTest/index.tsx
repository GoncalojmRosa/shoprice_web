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

import logo from '../../Assets/icons/Vector.svg';
import { indexSuggestions, newReport } from '../../services/auth';
import TopBarContainer from '../../Components/TopBarContainer';
import ModalComponent from '../../Components/Modal';
// import 'intro.js/themes/introjs-modern.css';

const { Steps, Hints } = require('intro.js-react');

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
  const { user } = useContext(AuthContext);
  const [enableIntro, setEnableIntro] = useState(true);
  const [enableModal, setEnableModal] = useState(false);
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [listSuggestions, setListSuggestions] = useState<Suggestions[]>([]);

  const [itemsShow, setItemsShow] = useState(4);

  const steps = [
    {
      element: '.selector1',
      intro: 'test 1',
      // position: 'right',
      // tooltipClass: 'myTooltipClass',
      // highlightClass: 'myHighlightClass',
    },
    {
      element: '.nav-link',
      intro: 'test 2',
    },
    {
      element: '.selector3',
      intro: 'test 3',
    },
  ];
  const hints = [
    {
      element: '.nav-link',
      hint: 'test 1',
      hintPosition: 'middle-middle',
      doneLabel: 'Ok',
    },
    {
      element: '.selector2',
      hint: 'test 2',
    },
  ];

  const options = {
    // doneLabel: 'Skip',
    nextLabel: 'Next',
    // skipLabel: 'Skip',
    showBullets: false,
    showStepNumbers: true,
  };
  window.onresize = ChangeCarouselItems;

  function ChangeCarouselItems() {
    if (window.innerWidth <= 768) {
      setItemsShow(2);
    } else if (window.innerWidth > 768 && window.innerWidth < 993) {
      setItemsShow(3);
    } else if (window.innerWidth > 993) {
      setItemsShow(4);
    }
  }

  function HandleReportSubmit(e: FormEvent) {
    e.preventDefault();
    newReport({ Title: assunto, Summary: mensagem, user_id: user.id }).then(() => {
      setEnableModal(false);
    });
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
      <TopBarContainer profile={true}>
        <li className="nav-item btn-contact-us pl-4 pl-lg-0">
          <button onClick={() => setEnableModal(true)} className="btn btn-info">
            Contact Us
          </button>
        </li>
      </TopBarContainer>
      <div className="banner">
        <div className="container">
          <h1 className="font-weight-semibold">
            Compare preços entre <br />
            supermercados portugueses.
          </h1>
          <h6 className="font-weight-normal text-muted pb-3">
            Shoprice é uma plataforma totalmente segura e inovadora no mercado português.
          </h6>
          <div>
            <button className="btn btn-opacity-light mr-1">Get started</button>
            <button className="btn btn-opacity-success ml-1">Learn more</button>
          </div>
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
                    Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer
                    turpis, suspendisse.
                  </p>
                  <a href="#">
                    <p className="readmore-link">Ler Mais</p>
                  </a>
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
                    Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer
                    turpis, suspendisse.
                  </p>
                  <a href="#">
                    <p className="readmore-link">Readmore</p>
                  </a>
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
                    Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer
                    turpis, suspendisse.
                  </p>
                  <a href="#">
                    <p className="readmore-link">Readmore</p>
                  </a>
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
                    Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer
                    turpis, suspendisse.
                  </p>
                  <p className="font-weight-medium text-muted">
                    Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer
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
                    usadas estando desenhadas com o intuito de o ajuda.
                  </p>
                  <p className="pb-2 font-weight-medium text-muted">
                    Garantimos uma ferramenta autônoma e inteligente.
                  </p>
                </div>
                <button className="btn btn-info">Readmore</button>
              </div>
            </div>
          </section>
          <section className="case-studies" id="case-studies-section">
            <div className="row grid-margin">
              <div className="col-12 text-center pb-5">
                <h2>Aquilo que realmente importa</h2>
                <h6 className="section-subtitle text-muted">
                  Lorem ipsum dolor sit amet, tincidunt vestibulum.
                </h6>
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
                      <p>Seo, Marketing</p>
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
          <section className="customer-feedback" id="feedback-section" data-aos="fade-right">
            <div>
              <div className="col-12 text-center pb-5">
                <h2>O que os nosso clientes têm a dizer</h2>
                <h6 className="section-subtitle text-muted m-0">
                  Lorem ipsum dolor sit amet, tincidunt vestibulum.
                </h6>
              </div>
              {/* <OwlCarousel options={options} events={events}> */}
              <div className="grid-margin">
                <CarouselComponent data={listSuggestions} itemsToShow={itemsShow} />
              </div>
              {/* </OwlCarousel> */}
            </div>
          </section>
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
                <button className="btn btn-rounded btn-outline-danger">Sugerir</button>
              </div>
            </div>
          </section>
          <section className="contact-details" id="contact-details-section">
            <div className="row text-center text-md-left">
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                {/* <img src={Group2} alt="" className="pb-2" /> */}
                Shoprice
                <div className="pt-2">
                  <p className="text-muted m-0">shoprice@gmail.com</p>
                  <p className="text-muted m-0">-------------</p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <h5 className="pb-2">Entre em Contacto</h5>
                <p className="text-muted">Não perca nenhuma atualização na nossa App.!</p>
                <form>
                  <input type="text" className="form-control" id="Email" placeholder="Email id" />
                </form>
                <div className="pt-3">
                  <button className="btn btn-dark">Subscrever</button>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <h5 className="pb-2">Diretrizes</h5>
                <a href="#">
                  <p className="m-0 pb-2">Terms</p>
                </a>
                <a href="#">
                  <p className="m-0 pt-1 pb-2">Privacy policy</p>
                </a>
                <a href="#">
                  <p className="m-0 pt-1 pb-2">Cookie Policy</p>
                </a>
                <a href="#">
                  <p className="m-0 pt-1">Discover</p>
                </a>
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <h5 className="pb-2">Onde nos situamos</h5>
                <p className="text-muted">
                  Portugal
                  <br />
                  Castelo Branco
                </p>
                <div className="d-flex justify-content-center justify-content-md-start">
                  <a href="#">
                    <span className="mdi mdi-facebook"></span>
                  </a>
                  <a href="#">
                    <span className="mdi mdi-twitter"></span>
                  </a>
                  <a href="#">
                    <span className="mdi mdi-instagram"></span>
                  </a>
                  <a href="#">
                    <span className="mdi mdi-linkedin"></span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <footer className="border-top">
            <p className="text-center text-muted pt-4">
              Copyright © 2021
              <a href="#" className="px-1">
                Gonçalo Rosa.
              </a>
              Direitos Reservados.
            </p>
          </footer>
          <ModalComponent isOpen={enableModal} title="aaaaa" onClose={() => setEnableModal(false)}>
            <p style={{ fontSize: '24px' }}>Pedimos desculpa pelo Bug</p>
            <br />
            <form onSubmit={HandleReportSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form4Example1"
                  className="form-control"
                  onChange={(e) => {
                    setAssunto(e.target.value);
                  }}
                />
                <label className="form-label" form="form4Example1" style={{ fontSize: '16px' }}>
                  Assunto
                </label>
              </div>

              <div className="form-outline mb-4">
                <textarea
                  className="form-control"
                  id="form4Example3"
                  rows={4}
                  onChange={(e) => {
                    setMensagem(e.target.value);
                  }}
                ></textarea>
                <label className="form-label" form="form4Example3" style={{ fontSize: '16px' }}>
                  Mensagem
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Enviar
              </button>
            </form>
          </ModalComponent>
        </div>
      </div>
    </div>
  );
}

export default LandingTest;
