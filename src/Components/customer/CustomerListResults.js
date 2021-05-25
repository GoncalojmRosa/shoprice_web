import { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Container,
  CardContent,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthContext } from '../../contexts/auth';
import { register, listUsers, updateProfile, getProfile } from '../../services/auth';
import Alerts from '../PopUpMessage/index';
import { Search as SearchIcon } from 'react-feather';

const CustomerListResults = (props, {...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMessage, setshowPopUpMessage] = useState('');
  const [OpenDialogAdd, setOpenDialogAdd] = useState(false);
  const [OpenDialogEdit, setOpenDialogEdit] = useState(false);
  const [OpenDialogDelete, setOpenDialogDelete] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const { emitMessage } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];
    
    if (selectedIndex === -1) {
      // console.log(id)
      setShowEditButton(true)
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      setShowEditButton(false);
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    }else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  useEffect(()=>{
    listUsers().then((res)=>{
      setCustomers(res.data.users)
    }).catch((error) =>{
      console.log(error)
    })
  }, [])


  const handleClose = () => {
    setOpenDialogAdd(false);
    setOpenDialogEdit(false);
    setOpenDialogDelete(false);
  };

  const handleSubmit = () => {
    register({name: username, email: email, password: password}).then((a) => {
      console.log(a)
      setOpenDialogAdd(false);
      listUsers().then((res)=>{
        setCustomers(res.data.users)
      }).catch((error) =>{
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  };

  const ChangeStateValues = () => {
    // console.log(selectedCustomerIds[0])
    getProfile({id: selectedCustomerIds[0]}).then((user) => {
      setUsername(user.data.user.name)
      setEmail(user.data.user.email)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleSubmitEdit = () => {
    updateProfile({ name: username , email: email, id: selectedCustomerIds[0] }).then(() => {
      emitMessage('Dados Atualizados com Sucesso!');
      setOpenDialogEdit(false);
      listUsers().then((res)=>{
        setCustomers(res.data.users)
      }).catch((error) =>{
        console.log(error)
      })
    });
  };
  const handleSubmitDelete = () => {
    
  };

  return (
    <Container maxWidth={false}>
      <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button variant="outlined" onClick={() => {setOpenDialogDelete(true)}} style={{color: "#D0312D", marginRight: "2px", borderColor: "#D0312D"}}>
        Eliminar
      </Button>
      {showEditButton ? <Button sx={{ mx: 1 }} onClick={() => {setOpenDialogEdit(true); ChangeStateValues()}} variant="contained" style={{backgroundColor: "#3bb143", color: "#ffffff"}}>
        Editar
      </Button> : <></>}
      <Button
        color="primary"
        variant="contained"
        style={{marginLeft: "2px"}}
        onClick={() =>setOpenDialogAdd(true)}
      >
        Adicionar
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
    <Card {...rest} sx={{mt: 3}}>
      {OpenDialogAdd ? (
        <Dialog open={OpenDialogAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Escreva o seu comentário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Atenção com as palavras que irá usar, poderá fazer com que a sua conta seja banida!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Nome"
              type="text"
              fullWidth
              onChange={(e) => {
                setUsername(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
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
      {OpenDialogEdit ? (
        <Dialog open={OpenDialogEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edite o Utilizador</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Atenção com as palavras que irá usar, poderá fazer com que a sua conta seja banida!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Nome"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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
                handleSubmitEdit();
              }}
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
      {OpenDialogDelete ? (
        <Dialog open={OpenDialogDelete} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Eliminar Utilizador</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aqui pode escolher se pretende eliminar o Utilizador
            </DialogContentText>
            {showPopUp ? <Alerts message={showPopUpMessage} type="error" /> : ''}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={() => {
                handleSubmitDelete();
              }}
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Badge
                </TableCell>
                <TableCell>
                  Roll
                </TableCell>
                <TableCell>
                  Data de Entrada
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatar}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.badge}
                  </TableCell>
                  <TableCell>
                    {customer.role}
                  </TableCell>
                  <TableCell>
                    {moment(customer._created_at).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </Container>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
