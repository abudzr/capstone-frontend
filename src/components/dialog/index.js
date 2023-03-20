import { useEffect, useState } from 'react';
import {
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
} from '@mui/material/'
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.text
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth
 * @param {boolean} props.isModal
 * 
 *
 */

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    props.onClose(false);
  };

  const handleConfirm = () => {
    props.onClose(false);
    props.onConfirm(true);
  }

  useEffect(() => {
    if (props.isModal) {
        setOpen(true);
    }
  }, [props.isModal])
  

  return (
    <div>
      <Dialog
        fullWidth={props?.fullWidth}
        maxWidth={props?.maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props?.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.defaultProps = {
    title: '',
    text: '',
    isModal:false,
    fullWidth:false,
    maxWidth:'sm',
    onConfirm:false
};

AlertDialog.propTypes = {
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    isModal: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};