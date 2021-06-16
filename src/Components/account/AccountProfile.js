import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import React, {useEffect, useState, useContext} from 'react';
import { getProfile, updateProfile } from '../../services/auth';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';


function AccountProfile ({updateButton}) {
  const { setLocalUser, emitMessage, user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

  async function handleUpdateProfile(e) {
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

    function uploadAvatar({ id, image }) {
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

    function imageIsLoaded(e) {
      // @ts-ignore
      setAvatar(e.target.result);
    }
  }

  useEffect(() => {
    getProfile(user)
      .then((res) => {
        const { name, email, avatar } = res.data.user;
        setName(name);
        setAvatar(avatar);
        setEmail(email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
  <Card>
    <form>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          @Shoprice
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    {updateButton ? <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
        // type="submit"
        onClick={(e) => {
          handleUploadAvatar()
        }}
      >
        Atualizar Foto
      </Button>
    </CardActions>: ''}
    
    </form>
  </Card>
  );
};

export default AccountProfile;
