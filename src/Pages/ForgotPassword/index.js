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
import { updatePassword } from '../../services/auth';

function Login() {
  const navigate = useNavigate();
  const {emitMessage} = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Alterar Password | Shoprice</title>
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
              code: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
              code: Yup.number("Só pode conter Números").required("Preencha o campo Código").positive("Não pode conter números Negativos").integer("Só pode conter Números").max(999999, "Código não pode ultrapassar os 6 digitos"),
              password: Yup.string().max(255).required('Preencha o campo Passord'),
              confirmPassword: Yup.string().max(255).required('Preencha o campo Confirm Password')
            })}
            onSubmit={async (values) => {
                await updatePassword({ code: values.code, password: values.password, confirmPassword: values.confirmPassword}).then((res) => {
                  navigate('/login');
                emitMessage(res.data.message);
              }).catch((err) => {
                emitMessage(err.response.data.error, 'error');

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
                    Alterar Password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Utilize uma Password que se lembre.
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.code && errors.code)}
                  fullWidth
                  helperText={touched.code && errors.code}
                  label="Código"
                  margin="normal"
                  name="code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.code}
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
                 <TextField
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirmar Password"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Alterar Password
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
