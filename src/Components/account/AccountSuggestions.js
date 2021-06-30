import {
    Card,
    CardContent,

    CardHeader,
    Typography,
    Avatar,

  } from '@material-ui/core';
  import Fab from '@material-ui/core/Fab';
  import DeleteIcon from '@material-ui/icons/Delete';
import { deleteSuggestion } from '../../services/auth';
  
  function AccountSuggestions({avatar, text, name, suggestionId}){

    function handleSuggestionDelete(){
      deleteSuggestion()
    }
  
    return (
      <form
        autoComplete="off"
        noValidate
        // onSubmit={handleUpdateProfile}
      >
              
        <Card key={String(suggestionId)} >
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" src={avatar}
                sx={{
                    height: 70,
                    width: 70
                }}/>
                }
                action={
                    // <IconButton aria-label="settings">
                        <Fab color="secondary" aria-label="delete" onClick={handleSuggestionDelete} size="small">
                            <DeleteIcon />
                        </Fab>
                    // </IconButton>
                }
                title={name}
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                {text}
                </Typography>
            </CardContent>
        </Card>
      </form>
    );
  };
  
  export default AccountSuggestions;
  