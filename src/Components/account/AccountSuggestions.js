import {
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Typography,
    Avatar,
    IconButton,
  } from '@material-ui/core';
  import Fab from '@material-ui/core/Fab';
  import AddIcon from '@material-ui/icons/Add';
  import DeleteIcon from '@material-ui/icons/Delete';
  
  function AccountSuggestions({avatar, text, name}){
  
    return (
      <form
        autoComplete="off"
        noValidate
        // onSubmit={handleUpdateProfile}
      >
              
        <Card>
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
                        <Fab color="secondary" aria-label="delete" size="small">
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
  