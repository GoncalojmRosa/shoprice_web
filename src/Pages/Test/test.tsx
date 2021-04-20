import React, { FormEvent, useContext, useEffect, useState } from 'react';
import './styles.css';
import cameraIcon from '../../Assets/icons/camera.svg';
import shopping from '../../Assets/add_cart.svg';
import logo from '../../Assets/logo.svg';
import { getProfile, getSuggestions, Suggestions, updateProfile } from '../../services/auth';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import SuggestionsComponent from '../../Components/Suggestions';

function Test() {
  const { setLocalUser, emitMessage, user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [suggestions, setSuggestion] = useState<Suggestions[]>([]);

  async function handleUpdateProfile(e: FormEvent) {
    e.preventDefault();
    await updateProfile({ name, email, id: user.id }).then(() => {
      emitMessage('Seu perfil foi atualizado!');
    });
  }

  function handleUploadAvatar() {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'image/*');
    el.click();
    el.addEventListener('change', async () => {
      if (el.files && el.files[0]) {
        let reader = new FileReader();

        reader.onload = imageIsLoaded;
        reader.readAsDataURL(el.files[0]);

        uploadAvatar({ image: el.files[0], id: user.id }).then(() => {
          emitMessage('Seu avatar foi atualizado!');

          getProfile(user).then((response) => {
            const { email, name, avatar, id } = response.data.user;
            setLocalUser({ email, name, avatar, id });
          });
        });
      }
    });

    function uploadAvatar({ id, image }: { image: any; id: any }) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('id', id);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      return api.put('avatar', formData, config);
    }

    function imageIsLoaded(e: ProgressEvent<FileReader>) {
      // @ts-ignore
      setAvatar(e.target.result);
    }
  }

  useEffect(() => {
    getProfile(user)
      .then((res) => {
        const { name, email, avatar } = res.data.user;
        setName(name as string);
        setAvatar(avatar as string);
        setEmail(email as string);
      })
      .catch((err) => {
        console.log(err);
      });

    getSuggestions(user).then((res) => {
      const sug = res.data;

      setSuggestion(sug);
      // setComments(comment);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div id="content" className="content content-full-width">
            <div className="profile">
              <div className="profile-header">
                <div className="profile-header-cover"></div>

                <div className="profile-header-content">
                  <div className="profile-header-img">
                    <img src={avatar} alt="" />
                    <img
                      src={cameraIcon}
                      alt="Ícone Camera"
                      className="camera-icon"
                      onClick={(e) => {
                        handleUploadAvatar();
                      }}
                    />
                  </div>

                  <div className="profile-header-info">
                    <h4 className="m-t-10 m-b-5">{name}</h4>
                    <p className="m-b-10">{user.badge}</p>
                    <a href="#" className="btn btn-sm btn-info mb-2">
                      Editar Perfil
                    </a>
                  </div>
                </div>

                <ul className="profile-header-tab nav nav-tabs">
                  <li className="nav-item">
                    <a href="#profile-post" className="nav-link active show" data-toggle="tab">
                      POSTS
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#profile-about" className="nav-link" data-toggle="tab">
                      ABOUT
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="profile-content">
              <div className="tab-content p-0">
                <div className="tab-pane fade active show" id="profile-post">
                  <ul className="timeline">
                    <li> */}
            {suggestions.map((prods: Suggestions) => {
              return (
                <SuggestionsComponent
                  name={name}
                  avatar={avatar}
                  data={prods}
                  comments={prods.comments}
                  // user={prods.comments}
                />
              );
            })}
            {/* </li>
                    <li>
                      <div className="timeline-icon">
                        <a href="javascript:;">&nbsp;</a>
                      </div>

                      <div className="timeline-body">Loading...</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
