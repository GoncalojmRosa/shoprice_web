import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, {useContext} from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { AuthContext } from '../../contexts/auth';
import { passwordToken } from '../../services/auth';

function Login() {
  const navigate = useNavigate();
  const { emitMessage } = useContext(AuthContext);

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
              email: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Precisa de conter @(...).com para ser um Email válido').max(255).required('Preencha o campo Email'),
            })}
            onSubmit={async (values) => {
              await passwordToken({ email: values.email}).then((res) => {
                navigate('/forgotPassword')
                emitMessage(res.data.message);
              });
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
                    Código de Verificação
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Utilize o mesmo Email que usou no ato de criação da sua Conta.
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
                <Box sx={{ py: 2 }}>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Já possui o código?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/forgotPassword"
                    variant="h6"
                  >
                    Avançar
                  </Link>
                </Typography>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Enviar Código
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Voltar atrás?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Login
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
