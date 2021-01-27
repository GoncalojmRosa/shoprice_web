import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import warningIcon from '../../Assets/warning.svg';
// import cameraIcon from '../../Assets/icons/camera.svg';
import './styles.scss';
import backgroundImg from '../../Assets/success-background.svg';
import { getProfile, updateProfile } from '../../services/auth';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

function Profile() {
  const { setLocalUser, emitMessage } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  async function handleUpdateProfile(e: FormEvent) {
    e.preventDefault();
    await updateProfile({ name, whatsapp, email, bio, surname }).then(() => {
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

        // uploadAvatar({ image: el.files[0] }).then(() => {
        //   emitMessage('Seu avatar foi atualizado!');
        //   getProfile().then((response) => {
        //     const { email, name, surname, avatar, id } = response.data.user;
        //     setLocalUser({ email, name, surname, avatar, id });
        //   });
        // });
      }
    });

    function uploadAvatar({ image }: { image: any }) {
      const formData = new FormData();
      formData.append('image', image);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      return api.post('avatar', formData, config);
    }

    function imageIsLoaded(e: ProgressEvent<FileReader>) {
      // @ts-ignore
      setAvatar(e.target.result);
    }
  }

  // getProfile(true).then((response) => {
  //   const { name, email, avatar, surname, bio, whatsapp } = response.data.user

  //   const classes = response.data.classes

  //   setName(name as string)
  //   setSurname(surname as string)
  //   setAvatar(avatar as string)
  //   setBio(bio as string)
  //   setWhatsapp(whatsapp as string)
  //   setEmail(email as string)
  // }),[]);

  return (
    <div id="page-teacher-profile" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <form>
            <div className="image-group">
              <div className="avatar-preview">
                <img src={avatar} alt="avatar" />
                <img
                  //   src={cameraIcon}
                  alt="Ícone Camera"
                  className="camera-icon"
                  onClick={(e) => {
                    handleUploadAvatar();
                  }}
                />
              </div>
            </div>
          </form>
          <h2>{name + ' ' + surname}</h2>
          {/*<h3>{subject}</h3>*/}
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Seus dados</legend>
            <div id="personal-info">
              <div id="name-info">
                <Input
                  label="Nome"
                  name="name"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div id="surname-info">
                <Input
                  label="Sobrenome"
                  id="surname-info"
                  name="surname"
                  value={surname || ''}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div id="email-info">
                <Input
                  label="E-mail"
                  name="email"
                  value={email || ''}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="whatsapp-info">
                <Input
                  label="Whatsapp"
                  name="whatsapp"
                  value={whatsapp || ''}
                  placeholder="+1122555554444"
                  type="tel"
                  accept="number"
                  pattern="^\+(?:[0-9] ?){6,14}[0-9]"
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
          <fieldset>
            <legend>
              Suas aulas
              <Link to="/give-classes">+ Nova aula</Link>
            </legend>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default Profile;
