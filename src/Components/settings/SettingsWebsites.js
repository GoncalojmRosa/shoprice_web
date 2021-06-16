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
  FormHelperText
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
import { listSites, indexSiteById, updateWebsite } from '../../services/auth';
import Alerts from '../PopUpMessage/index';
import { Search as SearchIcon } from 'react-feather';

const SettingsWebsites = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMessage, setshowPopUpMessage] = useState('');
  
  const [OpenDialogEdit, setOpenDialogEdit] = useState(false);

  const [showEditButton, setShowEditButton] = useState(false);
  const { emitMessage } = useContext(AuthContext);
  const [sites, setSites] = useState([]);

  const [name, setName] = useState('');
  const [xPath, setXPath] = useState('');
  const [nameXPath, setNameXPath] = useState('');
  const [priceXPath, setPriceXPath] = useState('');
  const [imgXPath, setImgXPath] = useState('');
  const [url, setUrl] = useState('');

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = sites.map((customer) => customer.id);
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
    listSites().then((res)=>{
      setSites(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }, [])


  const handleClose = () => {

    setOpenDialogEdit(false);

  };

  const ChangeStateValues = () => {
    // console.log(selectedCustomerIds[0])
    indexSiteById({id: selectedCustomerIds[0]}).then((site)=>{
      setName(site.data.Name)
      setUrl(site.data.url)
      setNameXPath(site.data.NameXPath)
      setPriceXPath(site.data.PriceXPath)
      setXPath(site.data.XPath)
      setImgXPath(site.data.ImgXPath)
    }).catch((err) =>{
      console.log(err)
    })
  }

  const handleSubmitEdit = () => {
    updateWebsite({id: selectedCustomerIds[0], Name: name, url, XPath: xPath, ImgXPath: imgXPath, NameXPath: nameXPath,PriceXPath: priceXPath})
    .then((a) => {
      listSites().then((res)=>{
        setSites(res.data)
      }).catch((error) =>{
        console.log(error)
      })
      setOpenDialogEdit(false)
    })
    .catch((err) => {

    })
  };

  return (
    <Container maxWidth={false}>
      <Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      {showEditButton ? <Button sx={{ mx: 1 }} onClick={() => {setOpenDialogEdit(true); ChangeStateValues()}} variant="contained" style={{backgroundColor: "#3bb143", color: "#ffffff"}}>
        Editar
      </Button> : <></>}
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
              placeholder="Procure um Site"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
    <Card sx={{mt: 3}}>
      {OpenDialogEdit ? (
        <Dialog open={OpenDialogEdit} maxWidth="50" onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edite o Site</DialogTitle>
          <DialogContent>
            <TextField
            
              autoFocus
              margin="dense"
              id="name"
              label="Nome do Site"
              type=""
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="Url"
              type="url"
              fullWidth
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="xpath"
              label="XPath"
              type="text"
              fullWidth
              value={xPath}
              onChange={(e) => {
                setXPath(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="namexpath"
              label="Name XPath"
              type="text"
              fullWidth
              value={nameXPath}
              onChange={(e) => {
                setNameXPath(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="imgxpath"
              label="Img XPath"
              type="text"
              fullWidth
              value={imgXPath}
              onChange={(e) => {
                setImgXPath(e.target.value);
                setShowPopUp(false);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="pricexpath"
              label="Price XPath"
              type="text"
              fullWidth
              value={priceXPath}
              onChange={(e) => {
                setPriceXPath(e.target.value);
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
     
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === sites.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < sites.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Url
                </TableCell>
                <TableCell>
                  XPath
                </TableCell>
                <TableCell>
                ImgXPath
                </TableCell>
                <TableCell>
                NameXPath
                </TableCell>
                <TableCell>
                PriceXPath
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.slice(0, limit).map((site) => (
                <TableRow
                  hover
                  key={site.id}
                  selected={selectedCustomerIds.indexOf(sites.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(site.id) !== -1}
                      onChange={(event) => handleSelectOne(event, site.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    
                        {site.Name}
                  </TableCell>
                  <TableCell>
                    {site.url}
                  </TableCell>
                  <TableCell>
                    {site.XPath}
                  </TableCell>
                  <TableCell>
                    {site.ImgXPath}
                  </TableCell>
                  <TableCell>
                    {site.NameXPath}
                  </TableCell>
                  <TableCell>
                    {site.PriceXPath}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={sites.length}
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

SettingsWebsites.propTypes = {
  sites: PropTypes.array.isRequired
};

export default SettingsWebsites;
