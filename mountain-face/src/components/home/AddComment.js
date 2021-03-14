import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddComment(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{float: 'right'}} >
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                New Comment
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/*To subscribe to this website, please enter your email address here. We will send updates*/}
                        {/*occasionally.*/}
                    </DialogContentText>
                    <TextField
                        color={"secondary"}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Heading"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        color={"secondary"}
                        autoFocus
                        margin="dense"
                        id="body"
                        label="Body"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
