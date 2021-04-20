import React, { useContext, useEffect } from 'react';
import Aos from 'aos';

import 'mdi/css/materialdesignicons.min.css';
import 'aos/dist/aos.css';
import '../../Assets/Styles/style.min.css';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
//@ts-ignore
import Group2 from '../../Assets/images/Group2.svg';
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
import { Link } from 'react-router-dom';
import Theme from '../../Hooks';
import { AuthContext } from '../../contexts/auth';

function LandingTest() {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <header id="header-section">
        <nav className="navbar navbar-expand-lg pl-3 pl-sm-0" id="navbar">
          <div className="container">
            <div className="navbar-brand-wrapper d-flex w-100">
              <img src={Group2} alt="" />
              <button
                className="navbar-toggler ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="mdi mdi-menu navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse navbar-menu-wrapper"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav align-items-lg-center align-items-start ml-auto">
                <li className="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                  <div className="navbar-collapse-logo">
                    <img src={Group2} alt="" />
                  </div>
                  <button
                    className="navbar-toggler close-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="mdi mdi-close navbar-toggler-icon pl-5"></span>
                  </button>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link" href="#header-section">
                    Home <span className="sr-only">(current)</span>
                  </a> */}
                  <Link to="/Test" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#features-section">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#digital-marketing-section">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#feedback-section">
                    Testimonials
                  </a>
                </li>
                <li className="nav-item btn-contact-us pl-4 pl-lg-0">
                  <button className="btn btn-info" data-toggle="modal" data-target="#exampleModal">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="banner">
        <div className="container">
          <h1 className="font-weight-semibold">
            Search engine optimisation &<br />
            Marketing.
          </h1>
          <h6 className="font-weight-normal text-muted pb-3">
            Simple is a simple template with a creative design that solves all your marketing and
            SEO queries.
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
              <h2>How does it works</h2>
              <h6 className="section-subtitle text-muted">
                One theme that serves as an easy-to-use operational toolkit
                <br />
                that meets customer's needs.
              </h6>
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="grid-margin d-flex justify-content-start">
                <div className="features-width">
                  <img src={Group12} alt="" className="img-icons" />
                  <h5 className="py-3">
                    Speed
                    <br />
                    Optimisation
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
              <div className="grid-margin d-flex justify-content-center">
                <div className="features-width">
                  <img src={Group7} alt="" className="img-icons" />
                  <h5 className="py-3">
                    SEO and
                    <br />
                    Backlinks
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
                    Content
                    <br />
                    Marketing
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
                  We Offer a Full Range
                  <br />
                  of Digital Marketing Services!
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
                  Leading Digital Agency
                  <br />
                  for Business Solution.
                </h3>
                <div className="col-lg-9 col-xl-8 p-0">
                  <p className="py-4 m-0 text-muted">
                    Power-packed with impressive features and well-optimized, this template is
                    designed to provide the best performance in all circumstances.
                  </p>
                  <p className="pb-2 font-weight-medium text-muted">
                    Its smart features make it a powerful stand-alone website building tool.
                  </p>
                </div>
                <button className="btn btn-info">Readmore</button>
              </div>
            </div>
          </section>
          <section className="case-studies" id="case-studies-section">
            <div className="row grid-margin">
              <div className="col-12 text-center pb-5">
                <h2>Our case studies</h2>
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
                      <h6 className="m-0 pb-1">Online Marketing</h6>
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
                      <h6 className="m-0 pb-1">Web Development</h6>
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
                      <h6 className="m-0 pb-1">Web Designing</h6>
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
                      <h6 className="m-0 pb-1">Software Development</h6>
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
                <h2>What our customers have to say</h2>
                <h6 className="section-subtitle text-muted m-0">
                  Lorem ipsum dolor sit amet, tincidunt vestibulum.
                </h6>
              </div>
              {/* <OwlCarousel options={options} events={events}> */}
              <div className="grid-margin">
                <CarouselComponent />
              </div>
              {/* </OwlCarousel> */}
            </div>
          </section>
          <section className="contact-us" id="contact-section">
            <div className="contact-us-bgimage grid-margin">
              <div className="pb-4">
                <h4 className="px-3 px-md-0 m-0" data-aos="fade-down">
                  Do you have any projects?
                </h4>
                <h4 className="pt-1" data-aos="fade-down">
                  Contact us
                </h4>
              </div>
              <div data-aos="fade-up">
                <button className="btn btn-rounded btn-outline-danger">Contact us</button>
              </div>
            </div>
          </section>
          <section className="contact-details" id="contact-details-section">
            <div className="row text-center text-md-left">
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <img src={Group2} alt="" className="pb-2" />
                <div className="pt-2">
                  <p className="text-muted m-0">mikayla_beer@feil.name</p>
                  <p className="text-muted m-0">906-179-8309</p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <h5 className="pb-2">Get in Touch</h5>
                <p className="text-muted">
                  Don’t miss any updates of our new templates and extensions.!
                </p>
                <form>
                  <input type="text" className="form-control" id="Email" placeholder="Email id" />
                </form>
                <div className="pt-3">
                  <button className="btn btn-dark">Subscribe</button>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <h5 className="pb-2">Our Guidelines</h5>
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
                <h5 className="pb-2">Our address</h5>
                <p className="text-muted">
                  518 Schmeler Neck
                  <br />
                  Bartlett. Illinois
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
              Copyright © 2019
              <a href="https://www.bootstrapdash.com/" className="px-1">
                Bootstrapdash.
              </a>
              All rights reserved.
            </p>
          </footer>
          <div
            className="modal fade"
            id="exampleModal"
            // tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="exampleModalLabel">
                    Contact Us
                  </h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label about="Name">Name</label>
                      <input type="text" className="form-control" id="Name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <label about="Email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email-1"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <label about="Message">Message</label>
                      <textarea
                        className="form-control"
                        id="Message"
                        placeholder="Enter your Message"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingTest;
