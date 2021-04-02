import React from 'react';
import Carousel from 'react-elastic-carousel';
import './styles.css';
import Face2 from '../../Assets/images/face2.jpg';
//@ts-ignore
import Face3 from '../../Assets/images/face3.jpg';
//@ts-ignore
import Face20 from '../../Assets/images/face20.jpg';
//@ts-ignore
import Face15 from '../../Assets/images/face15.jpg';
//@ts-ignore
import Face16 from '../../Assets/images/face16.jpg';
//@ts-ignore
import Face1 from '../../Assets/images/face1.jpg';

export default function CarouselComponent({ children }: any) {
  return (
    <div>
      <Carousel
        isRTL
        // itemsToShow={3}
        autoPlaySpeed={3000}
        enableAutoPlay
        focusOnSelect
        showArrows={false}
        // children={children}
      >
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face2} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Tony Martinez</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face3} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Sophia Armstrong</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face20} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Cody Lambert</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face15} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Cody Lambert</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face16} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Cody Lambert</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face1} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Tony Martinez</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face2} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Tony Martinez</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face3} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Sophia Armstrong</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
        <div className="card customer-cards">
          <div className="card-body">
            <div className="text-center">
              <img src={Face20} width="89" height="89" alt="" className="img-customer" />
              <p className="m-0 py-3 text-muted">
                Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis,
                suspendisse.
              </p>
              <div className="content-divider m-auto"></div>
              <h6 className="card-title pt-3">Cody Lambert</h6>
              <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
