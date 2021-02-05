import React from 'react';

import './styles.css';

export interface Product {
  Data: {
    name: string;
    price: string;
    img: string;
  };
}

interface ProductItemProps {
  product: Product;
}

const TeacherItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div>
      <article className="teacher-item">
        <header>
          <img src={product.Data.img} alt={product.Data.name} />
          <div>
            <strong>{product.Data.name}</strong>
          </div>
        </header>
        {/* <p>{teacher.bio}</p> */}
        <footer>
          <p>
            Preço/hora
            <strong>{product.Data.price}€</strong>
          </p>

          <a
            // onClick={createNewConnection}
            href={`https://mercadao.pt/store/pingo-doce/search`}
          >
            Ver na Loja Online
          </a>
        </footer>
      </article>
    </div>
  );
};

export default TeacherItem;
