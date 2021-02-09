import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

//HOOKS
import Theme from '../../Hooks';

//CSS
import './styles.css';

//IMAGES
import shopping from '../../Assets/shopping_app.svg';
import shopcart from '../../Assets/grocery-cart.svg';
import OnlineShop from '../../Assets/Online_shopping.svg';
import undrawLocation from '../../Assets/undraw_Location.svg';
import TopBarContainer from '../../Components/TopBarContainer';
import { AuthContext } from '../../contexts/auth';

export default function Landing() {
  return (
    <div>
      {useContext(AuthContext).signed ? (
        <TopBarContainer profile={true} linkToHome={false} />
      ) : (
        <Theme />
      )}

      <div id="page-landing">
        <div id="page-landing-content" className="container">
          <div className="info-container">
            <h1>Shoprice</h1>
            <h2>
              A sua plataforma de comparação <br /> de preços online
            </h2>
          </div>

          <img src={undrawLocation} alt="family" className="hero-image" />

          <div className="buttons-container">
            <Link to="/compare" className="study">
              Comparar
            </Link>

            <Link to="" className="give-classes">
              Contactar
            </Link>
          </div>
          <span className="total-connections">
            Total de 2 comparações já realizadas <img src={shopcart} alt="Carrinho de Compras" />
          </span>
        </div>
      </div>
    </div>
  );
}
