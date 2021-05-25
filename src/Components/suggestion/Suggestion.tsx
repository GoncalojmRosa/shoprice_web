import {
  Box,
  Card,
  Container,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  Avatar,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useContext, useState } from 'react';
import { indexSuggestions, newComment } from '../../services/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthContext } from '../../contexts/auth';
import Alerts from '../PopUpMessage/index';

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
  const [OpenDialog, setOpenDialog] = useState(false);
  const [commentId, setcommentId] = useState<any>();
  const [allSuggestion, setAllSuggestion] = useState<Suggestions[]>([]);

  const { emitMessage, user } = useContext(AuthContext);
  // const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMessage, setshowPopUpMessage] = useState('');

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    newComment({ user_id: user.id, suggestion_id: commentId, text: text })
      .then((a) => {
        console.log(a);
        setOpenDialog(false);
        emitMessage('Comentário adicionado com sucesso!');
        indexSuggestions().then((res) => {
          setAllSuggestion(res.data);
          // setComments(comment);
        });
      })
      .catch((error) => {
        // console.log(error.response.data.error)
        setShowPopUp(true);
        setshowPopUpMessage(error.response.data.error);
        // setIsOpen(false);
      });
  };

  useEffect(() => {
    indexSuggestions().then((res) => {
      setAllSuggestion(res.data);
      // setComments(comment);
    });
  }, []);

  return (
    <div>
      {OpenDialog ? (
        <Dialog open={OpenDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Escreva o seu comentário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Atenção com as palavras que irá usar, poderá fazer com que a sua conta seja banida!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Comentário"
              type="text"
              fullWidth
              onChange={(e) => {
                setText(e.target.value);
                setShowPopUp(false);
              }}
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
        </Dialog>
      ) : (
        ''
      )}

      {allSuggestion.map((suggestion) => {
        return (
          <Card style={{ marginTop: 40 }}>
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
                    setOpenDialog(true);
                    setcommentId(suggestion.id);
                  }}
                  onMouseOver={() => setOpenDialog(false)}
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
