/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { deleteSuggestion } from '../../services/auth';
import ModalComponent from '../Modal';

import './styles.css';

export interface User {
  name: string;
  avatar: string;
  id: string;
}
export interface Comments {
  id: String;
  text: string;
  _created_at: string;
  suggestion_id: Int16Array;
  user_id: Int16Array;
  user: User;
}

export interface Suggestions {
  id: Int16Array;
  text: string;
  likes: Int16Array;
  shares: Int16Array;
  views: Int16Array;
  comments: [];
  user_id: Int16Array;
  _created_at: string;
  name: string;
  avatar: string;
}
export interface SuggestionsItemProps {
  data: Suggestions;
  comments: Comments[];
  avatar: string;
  name: string;
}

const SuggestionsComponent: React.FC<SuggestionsItemProps> = ({ data, avatar, name, comments }) => {
  const [openModal, setOpenModal] = useState(false);
  //   console.log(comments[0].user.avatar);
  function HandleReportDelete(id: Int16Array) {
    console.log(id);

    deleteSuggestion({ id: id }).then((sug) => {
      console.log(sug);
    });
  }

  return (
    <div className="container bootstrap snippets bootdey">
      <ModalComponent isOpen={openModal} title="asdasd" onClose={() => setOpenModal(false)} />
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="blog-comment">
            <ul className="comments">
              <li className="clearfix">
                <img src={avatar} className="avatar" alt="" />
                <div className="post-comments">
                  <p className="meta">
                    {data._created_at} <a href="#">{name}</a> sugeriu:{' '}
                    <i className="pull-right" style={{ marginLeft: '15px' }}>
                      <a href="#">
                        <small onClick={() => setOpenModal(!openModal)}>Reply</small>
                      </a>
                    </i>{' '}
                    <i className="pull-right">
                      <a href="#">
                        <small onClick={() => HandleReportDelete(data.id)}>Delete</small>
                      </a>
                    </i>
                  </p>
                  <p>{data.text}</p>
                </div>

                <ul className="comments">
                  {comments.map((prods: Comments) => {
                    return (
                      <div>
                        {' '}
                        <li className="clearfix">
                          <img src={prods.user.avatar} className="avatar" alt="" />
                          <div className="post-comments">
                            <div>
                              <p className="meta">
                                {prods._created_at} <a href="#">{prods.user.name}</a> comentou :{' '}
                                <i className="pull-right">
                                  <a href="#">
                                    <small>Reply</small>
                                  </a>
                                </i>
                              </p>
                              <p>{prods.text}</p>
                            </div>
                          </div>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsComponent;
