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
  SvgIcon,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Input,
  IconButton
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthContext } from '../../contexts/auth';
import { register, listUsers, updateProfile, getProfile, deleteUser, search } from '../../services/auth';
import Alerts from '../PopUpMessage/index';
import { Search as SearchIcon } from 'react-feather';
import ReplayIcon from '@material-ui/icons/Replay';
import Visibility from '@material-ui/icons/Visibility';
// import Loader from 'react-loader-spinner';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Spinner from '../spinner/index'


const CustomerListResults = () => {
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
  const [BadgeSelectedOption, setBadgeSelectedOption] = useState('');
  const [WarningSelectedOption, setWarningSelectedOption] = useState('');
  const [RoleSelectedOption, setRoleSelectedOption] = useState('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { emitMessage } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [code, setCode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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
      setShowDeleteButton(true)
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      setShowEditButton(false);
      setShowDeleteButton(false)
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
    setShowSpinner(true)

    listUsers().then((res)=>{
      setCustomers(res.data.users)
      setTimeout(function (){setShowSpinner(false)}, 1500);
    }).catch((error) =>{
      // console.log(error.response.data)
      setTimeout(function (){setShowSpinner(false)}, 1000);
      emitMessage(error.response.data, "error")
    })
  }, [])


  const handleClose = () => {
    setOpenDialogAdd(false);
    setOpenDialogEdit(false);
    setOpenDialogDelete(false);
  };

 const handleCreateCode = () => {
  const code = Math.floor(Math.random() * 999999) + 1
  setCode(code)
 }

 const handleClickShowCode = () => {
   setShowCode(!showCode)
 }

  const ChangeStateValues = () => {
    setShowSpinner(true)
    getProfile({id: selectedCustomerIds[0]}).then((user) => {
      setWarningSelectedOption(user.data.user.warnings)
      setBadgeSelectedOption(user.data.user.badge)
      setRoleSelectedOption(user.data.user.role)
      setUsername(user.data.user.name)
      setEmail(user.data.user.email)
      setTimeout(function (){setShowSpinner(false)}, 1500);

    }).catch((err) => {
      setTimeout(function (){setShowSpinner(false)}, 1500);

      console.log(err)
    })
  }

  const handleSubmitEdit = () => {
    setShowSpinner(true)

    updateProfile({ code: code,name: username , email: email, role: RoleSelectedOption, warnings: WarningSelectedOption, badge: BadgeSelectedOption, id: selectedCustomerIds[0] }).then(() => {
      emitMessage('Dados Atualizados com Sucesso!');
      setOpenDialogEdit(false);
      setCode('')
      listUsers().then((res)=>{
        setCustomers(res.data.users)
        setTimeout(function (){setShowSpinner(false)}, 1500);

      }).catch((error) =>{
        setTimeout(function (){setShowSpinner(false)}, 1500);

        console.log(error)
      })
    });
  };
  const handleCustomerSearchChange = () => {
    search({letters: customerName}).then((res) => {
      setCustomers(res.data)
    }).catch((err) => {
      console.log(err.response.data.error)
    })
    
  }
  const handleSubmitDelete = () => {
    console.log(selectedCustomerIds[0])
    deleteUser({id: selectedCustomerIds[0]}).then((user) => {
      let newSelectedCustomerIds = [];


      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
      setSelectedCustomerIds(newSelectedCustomerIds);

      setOpenDialogDelete(false)
      listUsers().then((res)=>{
        setCustomers(res.data.users)
      }).catch((error) =>{
        console.log(error)
      })
    })
  };

  return (
    <Container maxWidth={false}>
      {showSpinner ? <Spinner/>  : ''}
      
      <Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      {showDeleteButton ? <Button variant="outlined" onClick={() => {setOpenDialogDelete(true)}} style={{color: "#D0312D", marginRight: "2px", borderColor: "#D0312D"}}>
        Eliminar
      </Button> : ''}
      
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
                  ),

                }}
                placeholder="Procure um Utilizador"
                variant="outlined"
                value={customerName}
                onChange={(e) => {
                  handleCustomerSearchChange();
                  setCustomerName(e.target.value)
                }}
                
              />
              
              
            </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
    <Card sx={{mt: 3}}>
      {OpenDialogAdd ? (
        <Dialog open={OpenDialogAdd} onClose={handleClose} aria-labelledby="form-dialog-title">          
        <Formik
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Preencha o campo Nome'),
          email: Yup.string().email('Precisa de conter @(...).com para ser um Email válido').max(255).required('Preencha o campo Email'),
          password: Yup.string().max(255).required('Preencha o campo Password')
        })}
        onSubmit={async (values, e) => {
          setShowSpinner(true)
          register({name: values.username, email: values.email, password: values.password}).then((a) => {
            setOpenDialogAdd(false);
            listUsers().then((res)=>{
              setCustomers(res.data.users)
              setTimeout(function (){setShowSpinner(false)}, 1500);

            }).catch((error) =>{
              setTimeout(function (){setShowSpinner(false)}, 1000);
              
              console.log(error)
            })
          }).catch((error) => {
            setTimeout(function (){setShowSpinner(false)}, 1000);

            emitMessage(error.response.data.error, "error")
            // console.log(error)
          })
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
          <form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle id="form-dialog-title">Adicione um novo Utilizador</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aqui poderá criar uma nova conta para um Utilizador!
            </DialogContentText>
            <TextField
              autoFocus
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              margin="dense"
              id="username"
              label="Nome"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              fullWidth
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              value={values.password}
            />
            {showPopUp ? <Alerts message={showPopUpMessage} type="error" /> : ''}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              color="primary"
              type="submit"
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
              disabled
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
              disabled
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowPopUp(false);
              }}
              />
              <Box>

              
              <FormControl sx={{
                        mr: 2, 
                        // ml: 2, 
                        minWidth: 265
                        // alignItems: 'center',
                        // display: 'flex'
                        }}>
                <InputLabel id="demo-simple-select-helper-label">Badge</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={BadgeSelectedOption}
                  onChange={(e) => {
                    setBadgeSelectedOption(e.target.value)
                  }}
                >
                  <MenuItem value={'Active'}>
                    <em>Active</em>
                  </MenuItem>
                  <MenuItem value={'Banned'}>Banned</MenuItem>
                  <MenuItem value={'CEO'}>CEO</MenuItem>
                </Select>
                <FormHelperText>Escolha a Badge do Utilizador</FormHelperText>
              </FormControl>
              <FormControl sx={{
                        // mr: 2, 
                        minWidth: 265
                        // alignItems: 'center',
                        // display: 'flex'
                        }}>
                <InputLabel id="demo-simple-select-helper-label">Warnings</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={WarningSelectedOption}
                  onChange={(e) => {
                    setWarningSelectedOption(e.target.value)
                  }}
                >
                  <MenuItem value={0}>
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
                <FormHelperText>Escolha o número de avisos</FormHelperText>
              </FormControl>
              <FormControl sx={{
                        // mr: 2, 
                        minWidth: 545
                        // alignItems: 'center',
                        // display: 'flex'
                        }}>
                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={RoleSelectedOption}
                  onChange={(e) => {
                    setRoleSelectedOption(e.target.value)
                  }}
                >
                  <MenuItem value={'basic'}>
                    <em>Basic</em>
                  </MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'demo'}>Demo</MenuItem>
                </Select>
                <FormHelperText>Escolha a role do utilizador</FormHelperText>
              </FormControl>
              {username !== "Shoprice Demo" && email !== "demo@shoprice.com" ? <FormControl sx={{
                        // mr: 2, 
                        minWidth: 545
                        // alignItems: 'center',
                        // display: 'flex'
                        }}>
                <InputLabel htmlFor="standard-adornment-password">Código</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showCode ? 'text' : 'password'}
            value={code}
            readOnly={true}
            onChange={(e) => setCode(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCode}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleCreateCode}
                >
                  <ReplayIcon />
                </IconButton>
              </InputAdornment>
            }
          />
              </FormControl> : ''}
              
              </Box>
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
              Eliminar
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
                  Role
                </TableCell>
                <TableCell>
                  Data de Entrada
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page * limit, page * limit + limit).map((customer) => (
                
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  {customer.role !== 'admin' ?  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="false"
                      disabled={customer.role === 'admin' ? true : false}
                    />
                  </TableCell> :  <TableCell></TableCell>}
                 
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
