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

function AccountProfileDetails(){
  const {emitMessage, user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

  async function handleUpdateProfile(e) {
    e.preventDefault();
    await updateProfile({ name, email, id: user.id }).then(() => {
      emitMessage('Seu perfil foi atualizado!');
    });
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
                helperText="Poderá colocar o seu Nome completo"
                label="Nome"
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
                label="Email"
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
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
