import { useState,useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

import { changePassword } from '../../services/auth';
import { AuthContext } from '../../contexts/auth';



function SettingsPassword(){
  const [password, setPassword] = useState('');
  const { user, signIn, emitMessage } = useContext(AuthContext);

  const [confirm, setConfirm] = useState('');

  function handleSubmit(e){
    e.preventDefault();
   changePassword({id: user.id, password:  password, confirmPassword: confirm}).then((res) =>{
     signIn({password: password, email: user.email})
   }).catch((err)=>{
     emitMessage(err.response.data.error, 'error')
   })
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={(e)=> setConfirm(e.target.value)}
            type="password"
            value={confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
