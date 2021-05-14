import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import './styles.css';

interface User {
  name: string;
  avatar: string;
  id: string;
}

interface Suggestions {
  id: Int16Array;
  text: string;
  likes: Int16Array;
  shares: Int16Array;
  views: Int16Array;
  comments: Int16Array;
  user_id: Int16Array;
  _created_at: string;
  user: User;
}
interface SuggestionsItemProps {
  data: Suggestions[];
  itemsToShow: number;
}

const CarouselComponent: React.FC<SuggestionsItemProps> = ({ data, itemsToShow }) => {
  return (
    <div>
      <Carousel
        isRTL
        itemsToShow={itemsToShow}
        autoPlaySpeed={3000}
        enableAutoPlay
        focusOnSelect
        // itemPadding={"0"}
        showArrows={false}
        // children={data}
      >
        {data.map((prods: Suggestions) => {
          return (
            <div className="card customer-cards">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src={prods.user.avatar}
                    width="89"
                    height="89"
                    alt=""
                    className="img-customer"
                  />
                  <p className="m-0 py-3 text-muted">{prods.text}</p>
                  <div className="content-divider m-auto"></div>
                  <h6 className="card-title pt-3">{prods.user.name}</h6>
                  <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
