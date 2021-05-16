import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import React, {useEffect, useState, useContext} from 'react';
import { getProfile, updateProfile } from '../../services/auth';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

function AccountProfileDetails(){
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
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleUpdateProfile}
    >
      <Card>
        <CardHeader
          subheader="A informação pode ser editada"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={(e) => {setName(e.target.value)}}
                required
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e) => {setName(e.target.value)}}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
