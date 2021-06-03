import { Helmet } from 'react-helmet';
import React, {useEffect, useState, useContext} from 'react'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import AccountProfile from '../Components/account/AccountProfile';
import AccountProfileDetails from '../Components/account/AccountProfileDetails';
import { deleteSuggestion, getSuggestions } from '../services/auth';
import { AuthContext } from '../contexts/auth';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsPassword from '../Components/settings/SettingsPassword';


function Account(){

  const { user, emitMessage } = useContext(AuthContext);

  const [suggestions, setSuggestion] = useState([]);
  const [suggestionId, setSuggestionId] = useState('');
  const [OpenDialogDelete, setOpenDialogDelete] = useState(false);

  function handleSuggestionDelete(){
    deleteSuggestion({id: suggestionId}).then((res) => {
      emitMessage("Sugestão eliminada com sucesso!")
      setOpenDialogDelete(false)
      getSuggestions(user).then((res) => {
        const sug = res.data;
        
        setSuggestion(sug);
        // setComments(comment);
      });
    })
  }
  function handleClose(){
    setOpenDialogDelete(false)
  }

  useEffect(()=>{
    getSuggestions(user).then((res) => {
      const sug = res.data;
      
      setSuggestion(sug);
      // setComments(comment);
    });
  }, [])


  return(
  <>
  {OpenDialogDelete ? (
        <Dialog open={OpenDialogDelete} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Eliminar Sugestão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor ajude-nos a melhorar!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={() => {
                handleSuggestionDelete();
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
    <Helmet>
      <title>Conta | Shoprice</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile updateButton={true} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
          <Grid
            item
            lg={12}
            md={6}
            xs={12}
          >
              <SettingsPassword />
          </Grid>
          {suggestions.map((suggestion)=>{
            return(
              <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <Card>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" src={suggestion.user.avatar}
                sx={{
                    height: 70,
                    width: 70
                }}/>
                }
                action={
                    // <IconButton aria-label="settings">
                        <Fab color="secondary" aria-label="delete" onClick={() => {setSuggestionId(suggestion.id); setOpenDialogDelete(true)}} size="small">
                            <DeleteIcon />
                        </Fab>
                    // </IconButton>
                }
                title={suggestion.user.name}
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                {suggestion.text}
                </Typography>
            </CardContent>
        </Card>
          </Grid>
            )
          })}
          </Grid>
      </Container>
    </Box>
  </>)
};

export default Account;
