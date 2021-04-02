import React, { FormEvent, useContext, useEffect, useState } from 'react';
import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import warningIcon from '../../Assets/warning.svg';
import cameraIcon from '../../Assets/icons/camera.svg';
import './styles.scss';
import backgroundImg from '../../Assets/success-background.svg';
import { getProfile, updateProfile } from '../../services/auth';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

function Profile() {
  const { setLocalUser, emitMessage, user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

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
  }, []);

  return (
    <div id="page-teacher-profile" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <form>
            <div className="image-group">
              <div className="avatar-preview">
                <img src={avatar} alt="avatar" />
                <img
                  src={cameraIcon}
                  alt="Ícone Camera"
                  className="camera-icon"
                  onClick={(e) => {
                    handleUploadAvatar();
                  }}
                />
              </div>
            </div>
          </form>
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
                  type="text"
                  label="Nome"
                  name="name"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
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
            </div>
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Atualizar Perfil</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Profile;
