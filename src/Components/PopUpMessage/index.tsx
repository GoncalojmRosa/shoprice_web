import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

interface alertProps {
  message?: string;
  type?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const Alerts: React.FunctionComponent<alertProps> = ({ message, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {type === 'error' ? (
        <Alert severity="error" color="error">
          {message}
        </Alert>
      ) : (
        ''
      )}
      {type === 'success' ? (
        <Alert severity="success">
          <AlertTitle>Error</AlertTitle>
          {message} — <strong>check it out!</strong>
        </Alert>
      ) : (
        ''
      )}
    </div>
  );
};

export default Alerts;
