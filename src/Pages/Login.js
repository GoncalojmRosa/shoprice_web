import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, {useContext} from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { AuthContext } from '../contexts/auth';
import { authenticate } from '../services/auth';

function Login() {
  const navigate = useNavigate();
  const { signIn, emitMessage } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Login | Shoprice</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@shoprice.com',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Precisa de conter @(...).com para ser um Email válido').max(255).required('Preencha o campo Email'),
              password: Yup.string().max(255).required('Preencha o campo Password')
            })}
            onSubmit={async (values, e) => {
              // console.log(e.)
              // navigate('/login');
              authenticate({ email: values.email, password: values.password })
              .then((res) => {
                // console.log(res)
                signIn({ email: values.email, password: values.password }).then((res) => {
                  // emitMessage('Logado com sucesso');
                  navigate('/')
                  // window.location.assign('/');
                })
              })
              .catch((err) => {
                emitMessage(err.response.data.error, 'error')
              })
              // await signIn({ email: values.email, password: values.password }).then((res) => {
                // emitMessage('Logado com sucesso');
                // window.location.assign('/');
              // }).catch((err) => {
              //   console.log(err.response.data.error)
              // });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Login
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Utilize os seus dados para entrar na Aplicação
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Esqueceu-se da Password?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/sendCode"
                    variant="h6"
                  >
                    Alterar
                  </Link>
                </Typography>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Autenticar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Não tem conta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    variant="h6"
                  >
                    Registar
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
