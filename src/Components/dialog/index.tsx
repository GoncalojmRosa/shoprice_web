import React, { useContext, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { newComment } from '../../services/auth';
import { AuthContext } from '../../contexts/auth';
import Alerts from '../PopUpMessage/index';

export default function FormDialog({ commentId }: any) {
  const { emitMessage, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [text, setText] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMessage, setshowPopUpMessage] = useState('');
  // const modalRef = useRef<ModalHandles>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    newComment({ user_id: user.id, suggestion_id: commentId, text: text })
      .then((a) => {
        console.log(a);
        setIsOpen(false);
        emitMessage('Comentário adicionado com sucesso!');
      })
      .catch((error) => {
        // console.log(error.response.data.error)
        setShowPopUp(true);
        setshowPopUpMessage(error.response.data.error);
        // setIsOpen(false);
      });
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
    </div>
  );
}
