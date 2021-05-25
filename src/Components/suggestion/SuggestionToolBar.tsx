import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';

const SuggestionToolBar = (props: any) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button color="primary" variant="contained">
        Adicionar
      </Button>
    </Box>
  </Box>
);

export default SuggestionToolBar;
