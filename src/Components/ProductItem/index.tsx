import React from 'react';

import './styles.css';

interface Teacher {
  name: string;
  price: string;
  photo: string;
}

const TeacherItem: React.FC<Teacher> = (props) => {
  return (
    <div>
      <article className="teacher-item">
        <header>
          <img src={props.photo} alt={props.name} />
          <div>
            <strong>{props.name}</strong>
          </div>
        </header>
        {/* <p>{teacher.bio}</p> */}
        <footer>
          <p>
            Preço/hora
            <strong>{props.price}€</strong>
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
