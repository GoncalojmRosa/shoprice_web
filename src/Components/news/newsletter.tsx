import { Box, MenuItem, FormHelperText, FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useEffect, useContext, useState } from 'react';
import { indexNewsByUserId, newNewsLetter } from '../../services/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthContext } from '../../contexts/auth';
import Alerts from '../PopUpMessage/index';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HandleDate from './handleDate';
import Spinner from '../spinner/index';
import * as Yup from 'yup';
import { Formik } from 'formik';

interface news {
  id: string;
  ProductName: string;
  _created_at: string;
  _next_email: string;
  _sended_at: string;
  website_id: string;
  schedule_id: string;
}

const NewsLetter = (props: any, ref: any) => {
  const [OpenSuggestionDialog, setOpenSuggestionDialog] = useState(false);
  const [newsLetters, setNewsLetters] = useState<news[]>([]);

  const { emitMessage, user, signOut } = useContext(AuthContext);
  // const [isOpen, setIsOpen] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMessage, setshowPopUpMessage] = useState('');

  const [siteSelectedOption, setSiteSelectedOption] = useState('');
  const [scheduleSelectedOption, setScheduleSelectedOption] = useState('');
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();
  const [showSpinner, setShowSpinner] = useState(false);

  const handleCloseSugDialog = () => {
    setOpenSuggestionDialog(false);
  };

  const ShowDaysAndHours = (date: string) => {
    var ac = HandleDate(date);
    setDays(ac[0].days);
    setHours(ac[0].hours);
    setMinutes(ac[0].minutes);
    setSeconds(ac[0].seconds);
  };

  useEffect(() => {
    setShowSpinner(true);

    indexNewsByUserId({ id: user.id })
      .then((news) => {
        setTimeout(function () {
          setShowSpinner(false);
        }, 1500);
        setNewsLetters(news.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <Box {...props}>
        {showSpinner ? <Spinner /> : ''}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button color="primary" onClick={() => setOpenSuggestionDialog(true)} variant="contained">
            Adicionar
          </Button>
        </Box>
      </Box>
      {OpenSuggestionDialog ? (
        <Dialog
          open={OpenSuggestionDialog}
          onClose={handleCloseSugDialog}
          aria-labelledby="form-dialog-title"
        >
          <Formik
            initialValues={{
              productName: '',
            }}
            validationSchema={Yup.object().shape({
              productName: Yup.string().max(100).required('Insira o Nome do Produto'),
            })}
            onSubmit={async (values, e) => {
              setShowSpinner(true);

              newNewsLetter({
                ProductName: values.productName,
                website_id: siteSelectedOption,
                user_id: user.id,
                schedule_id: scheduleSelectedOption,
              })
                .then((a) => {
                  setOpenSuggestionDialog(false);
                  emitMessage('Irá receber um E-Mail com o Preço do Produto');

                  indexNewsByUserId({ id: user.id })
                    .then((news) => {
                      setNewsLetters(news.data);
                      setTimeout(function () {
                        setShowSpinner(false);
                      }, 1500);
                    })
                    .catch((err) => {});
                })
                .catch((err) => {
                  // console.log(err.response.data.error);
                  setTimeout(function () {
                    setShowSpinner(false);
                  }, 1500);

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
              values,
            }) => (
              <form onSubmit={(e) => handleSubmit(e)}>
                <DialogTitle id="form-dialog-title">Adicione o Produto</DialogTitle>
                <DialogContent>
                  <DialogContentText>Insira todos os Dados</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="productName"
                    error={Boolean(touched.productName && errors.productName)}
                    helperText={touched.productName && errors.productName}
                    value={values.productName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Nome do Produto"
                    type="text"
                    fullWidth
                  />
                  <Box>
                    <FormControl
                      sx={{
                        mr: 2,
                        // ml: 2,
                        minWidth: 265,
                        // alignItems: 'center',
                        // display: 'flex'
                      }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">Site</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={siteSelectedOption}
                        onChange={(e) => {
                          setSiteSelectedOption(e.target.value);
                        }}
                      >
                        <MenuItem value={4}>
                          <em>Global Data</em>
                        </MenuItem>
                        <MenuItem value={5}>Mbit</MenuItem>
                        <MenuItem value={6}>Chip7</MenuItem>
                      </Select>
                      <FormHelperText>Escolha a Badge do Utilizador</FormHelperText>
                    </FormControl>
                    <FormControl
                      sx={{
                        // mr: 2,
                        minWidth: 265,
                        // alignItems: 'center',
                        // display: 'flex'
                      }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">Schedule</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={scheduleSelectedOption}
                        onChange={(e) => {
                          setScheduleSelectedOption(e.target.value);
                        }}
                      >
                        <MenuItem value={1}>
                          <em>Diariamente</em>
                        </MenuItem>
                        <MenuItem value={2}>Semanalmente</MenuItem>
                        <MenuItem value={3}>Mensalmente</MenuItem>
                      </Select>
                      <FormHelperText>Escolha o número de avisos</FormHelperText>
                    </FormControl>
                  </Box>
                  {showPopUp ? <Alerts message={showPopUpMessage} type="error" /> : ''}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSugDialog} color="primary">
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Enviar
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
      ) : (
        ''
      )}
      {newsLetters.map((news) => {
        return (
          <div style={{ marginTop: 20 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                onClick={(e) => {
                  ShowDaysAndHours(news._next_email);
                  // console.log(news._next_email);
                }}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={news.ProductName}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textSecondary">
                  Você irá receber um E-Mail com o preço do produto em <b>{days}</b> dias{' '}
                  <b>{hours}</b> horas <b>{minutes}</b> minutos e <b>{seconds}</b> segundos
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default NewsLetter;
