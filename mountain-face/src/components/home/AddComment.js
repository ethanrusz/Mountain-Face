import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MainService from "../../services/mainService";
import AuthService from "../../services/authService";

export default function AddComment(props) {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function postComment() {
        console.log(props.route);
        console.log('comment');
        console.log(comment);

        MainService.addComment( props.route.id, 'John Snow', comment).then(response => {
            if (props.comments){
                props.setComments([
                    ...props.comments,
                    {
                        username: AuthService.getLocalToken(),
                        comment: comment
                    }
                ])
            } else {
                props.setComments([
                    {
                        username: AuthService.getLocalToken(),
                        comment: comment
                    }
                ]);
            }

            console.log(response);
            handleClose();
        });
    }

    return (
        <div style={{float: 'right'}} >
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                New Comment
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>

                    <TextField
                        color={"secondary"}
                        autoFocus
                        onChange={event => setComment(event.target.value)}
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
                    <Button variant="contained" onClick={postComment} color="secondary">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
