import {
  Box,
  Card,
  Container,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useContext, useState } from 'react';
import { indexSuggestions, newComment, newSuggestion } from '../../services/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthContext } from '../../contexts/auth';
import Alerts from '../PopUpMessage/index';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Spinner from '../spinner/index';

interface User {
  name: string;
  avatar: string;
  id: string;
}
interface Comments {
  id: String;
  text: string;
  _created_at: string;
  suggestion_id: Int16Array;
  user_id: Int16Array;
  user: User;
}

interface Suggestions {
  id: Int16Array;
  text: string;
  likes: Int16Array;
  shares: Int16Array;
  views: Int16Array;
  comments: Comments[];
  user_id: Int16Array;
  _created_at: string;
  user: User;
}

export interface ModalHandles {
  AfterModalClose: () => void;
}

const AllSuggestions: React.RefForwardingComponent<ModalHandles> = (props, ref) => {
  const [OpenCommentDialog, setOpenCommentDialog] = useState(false);
  const [OpenSuggestionDialog, setOpenSuggestionDialog] = useState(false);
  const [commentId, setcommentId] = useState<any>();
  const [allSuggestion, setAllSuggestion] = useState<Suggestions[]>([]);

  const { emitMessage, user, signOut } = useContext(AuthContext);
  // const [isOpen, setIsOpen] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMessage, setshowPopUpMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const handleClose = () => {
    setOpenCommentDialog(false);
  };
  const handleCloseSugDialog = () => {
    setOpenSuggestionDialog(false);
  };

  useEffect(() => {
    setShowSpinner(true);
    indexSuggestions().then((res) => {
      setAllSuggestion(res.data);
      // setComments(comment);
      setTimeout(function () {
        setShowSpinner(false);
      }, 1000);
    });
  }, []);

  return (
    <div>
      {showSpinner ? <Spinner /> : ''}
      <Box {...props}>
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
              text: '',
            }}
            validationSchema={Yup.object().shape({
              text: Yup.string().max(255).required('Preencha o campo Sugestão!'),
            })}
            onSubmit={async (values, e) => {
              setShowSpinner(true);
              newSuggestion({ text: values.text, user_id: user.id })
                .then((res) => {
                  setOpenSuggestionDialog(false);
                  emitMessage('Sugestão adicionada com sucesso!');
                  indexSuggestions().then((res) => {
                    setAllSuggestion(res.data);
                    // setComments(comment);
                    setTimeout(function () {
                      setShowSpinner(false);
                    }, 1000);
                  });
                })
                .catch((err) => {
                  setShowPopUp(true);
                  setTimeout(function () {
                    setShowSpinner(false);
                  }, 1000);
                  setshowPopUpMessage(err.response.data.error);
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
                <DialogTitle id="form-dialog-title">Escreva a sua Sugestão</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Atenção com as palavras que irá usar, poderá fazer com que a sua conta seja
                    banida!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="text"
                    label="Sugestão"
                    type="text"
                    fullWidth
                    error={Boolean(touched.text && errors.text)}
                    helperText={touched.text && errors.text}
                    value={values.text}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
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
      {OpenCommentDialog ? (
        <Dialog open={OpenCommentDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <Formik
            initialValues={{
              comentario: '',
            }}
            validationSchema={Yup.object().shape({
              comentario: Yup.string().max(255).required('Preencha o campo Comentário!'),
            })}
            onSubmit={async (values, e) => {
              setShowSpinner(true);
              newComment({ user_id: user.id, suggestion_id: commentId, text: values.comentario })
                .then((a) => {
                  console.log(a);
                  setOpenCommentDialog(false);
                  emitMessage('Comentário adicionado com sucesso!');
                  indexSuggestions().then((res) => {
                    setAllSuggestion(res.data);
                    // setComments(comment);
                    setTimeout(function () {
                      setShowSpinner(false);
                    }, 1000);
                  });
                })
                .catch((error) => {
                  // console.log(error.response.data.error)
                  if (error.response.data.status === 'Banned') {
                    emitMessage(error.response.data.error, 'error');
                    signOut();
                  }
                  setTimeout(function () {
                    setShowSpinner(false);
                  }, 1000);
                  setShowPopUp(true);
                  setshowPopUpMessage(error.response.data.error);
                  // setIsOpen(false);
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
                <DialogTitle id="form-dialog-title">Escreva o seu comentário</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Atenção com as palavras que irá usar, poderá fazer com que a sua conta seja
                    banida!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="comentario"
                    label="Comentário"
                    type="text"
                    fullWidth
                    error={Boolean(touched.comentario && errors.comentario)}
                    helperText={touched.comentario && errors.comentario}
                    value={values.comentario}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {showPopUp ? <Alerts message={showPopUpMessage} type="error" /> : ''}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
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

      {allSuggestion.map((suggestion) => {
        return (
          <Card style={{ marginTop: 40 }} key={String(suggestion.id)}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={suggestion.user.avatar}
                  sx={{
                    height: 70,
                    width: 70,
                  }}
                />
              }
              action={
                // <IconButton aria-label="settings">
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  onClick={() => {
                    setOpenCommentDialog(true);
                    setcommentId(suggestion.id);
                  }}
                  onMouseOver={() => setOpenCommentDialog(false)}
                >
                  <AddIcon />
                </Fab>
                // </IconButton>
              }
              title={suggestion.user.name}
              subheader={suggestion._created_at}
            />
            <CardContent>
              <Typography variant="body1" color="textprimary" component="p">
                {suggestion.text}
              </Typography>
              {suggestion.comments.map((comment) => {
                return (
                  <Box bgcolor="grey.200" borderRadius={5} marginTop={2}>
                    <Container maxWidth="lg">
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            src={comment.user.avatar}
                            sx={{
                              height: 50,
                              width: 50,
                            }}
                          />
                        }
                        title={comment.user.name}
                        subheader={comment._created_at}
                      />
                      <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p">
                          {comment.text}
                        </Typography>
                      </CardContent>
                    </Container>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AllSuggestions;
