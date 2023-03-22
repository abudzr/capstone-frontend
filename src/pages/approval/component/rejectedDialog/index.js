import { useEffect, useState } from 'react';
import {
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
    TextField
} from '@mui/material/'

import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 * @param {boolean} props.isModal
 * 
 *
 */

export default function RejectDialogApproval(props) {
  const [open, setOpen] = useState(false);
  const [description,setDescription] = useState('')

  const handleClose = () => {
    setOpen(false);
    props.onClose(false);
    props.onConfirm(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    props.onClose(false);
    props.onConfirm(true);
    props.onDescription(description);
  }

  useEffect(() => {
    if (props.isModal) {
        setOpen(true);
    }
  }, [props.isModal])

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Rejected
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
                name='description'
                sx={{
                    width: "100%",
                    height: "139px",
                    }}
                    multiline
                    rows={4}
                    // maxRows={8}
                id="outlined-basic" variant="outlined" placeholder='Description'
                onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Rejected
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RejectDialogApproval.defaultProps = {
    isModal:false,
    onConfirm:false
};

RejectDialogApproval.propTypes = {
    isModal: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    onDescription: PropTypes.func,
};