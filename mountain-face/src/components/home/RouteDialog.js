import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import {Alert} from "@material-ui/lab";
import {Paper} from "@material-ui/core";
import AddComment from "./AddComment";
import Reply from "./Reply";
import EditComment from "./EditComment";
import AuthService from "../../services/authService";


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


Alert.propTypes = {
    severity: PropTypes.string,
    children: PropTypes.node
};



export default function RouteDialog(props) {

    const [comments, setComments] = React.useState(props.route.comments);

    const [open, setOpen] = React.useState(false);

    const IMAGE_URL = 'http://54.208.109.55:8080/image?name='
    // const IMAGE_URL = 'http://localhost:8080/image?name=50+More+Seconds+of+Fun'
    const IMAGE_URL_FALLBACK = 'https://cdn.pixabay.com/photo/2016/07/17/21/44/mountains-1524804_960_720.png'


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const CommentItem = (props) => {
        return (
            <div>
                <div>
                    <Paper style={{padding: "10px 5px", background: '#777777', marginBottom: 20}}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                {/*<Avatar alt="Remy Sharp" src={imgLink} />*/}
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <div style={{display: "inline-block", width: '60%'}}>
                                    <h5 style={{margin: 0, textAlign: "left"}}>
                                        {props.comment.comment}
                                    </h5>
                                    <p style={{textAlign: "left"}}>
                                        By {props.comment.username}
                                    </p>
                                </div>

                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                View More
            </Button>
            <Dialog onClose={handleClose} maxWidth={"lg"} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.route.route}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={1}>
                        <Grid item sm={4}>
                            <div>
                                <img alt={props.route.route}
                                     src={IMAGE_URL + props.route.route}
                                     onError={e => {
                                         e.target.src = IMAGE_URL_FALLBACK;
                                     }}
                                     style={{maxWidth: '80%', borderRadius: 6}}/>
                            </div>
                        </Grid>
                        <Grid item sm={8}>
                            <div>
                                <Alert severity="info">
                                    <Typography variant={"body1"} style={{display: 'inline', fontWeight: 'bold'}}>
                                        Suggested Protection Gear:
                                    </Typography>
                                    <Typography variant={"body1"} style={{display: 'inline', marginLeft: 5}}>
                                        {props.route.protection}
                                    </Typography>
                                </Alert>
                            </div>
                            <div style={{display: 'inline', marginRight: 5}}>
                                <Typography variant={"subtitle1"} style={{display: 'inline', fontWeight: 'bold'}}>
                                    Route Type:
                                </Typography>
                                <Typography style={{display: 'inline', marginLeft: 5}}>
                                    {props.route.route_type}
                                </Typography>
                            </div>
                            <div style={{display: 'inline', marginRight: 5}}>
                                <Typography variant={"subtitle1"} style={{display: 'inline', fontWeight: 'bold'}}>
                                    Length (miles):
                                </Typography>
                                <Typography style={{display: 'inline', marginLeft: 5}}>
                                    {props.route.length}
                                </Typography>
                            </div>
                            <div style={{display: 'inline', marginRight: 5}}>
                                <Typography variant={"subtitle1"} style={{display: 'inline', fontWeight: 'bold'}}>
                                    Rating:
                                </Typography>
                                <Typography style={{display: 'inline', marginLeft: 5}}>
                                    {props.route.rating}
                                </Typography>
                            </div>
                            <div style={{display: 'inline', marginRight: 5}}>
                                <Typography variant={"subtitle1"} style={{display: 'inline', fontWeight: 'bold'}}>
                                    Pitches:
                                </Typography>
                                <Typography style={{display: 'inline', marginLeft: 5}}>
                                    {props.route.pitches}
                                </Typography>
                            </div>
                            <Typography variant={"h5"} style={{fontWeight: 'bold'}}>
                                Description
                            </Typography>
                            <hr/>
                            <Typography variant={"body1"}>
                                {props.route.desc}
                            </Typography>
                        </Grid>
                    </Grid>
                    <div>
                        <div style={{}}>
                            <Typography variant={"h5"} style={{fontWeight: 'bold', marginBottom: 10}}>
                                Comments
                                {AuthService.hasLocalToken() ?
                                    <AddComment route={props.route} comments={comments} setComments={setComments}/>
                                    :
                                    <Typography variant={"h5"} style={{fontWeight: 'bold', textAlign: 'right'}}>
                                        Login to leave a comment
                                    </Typography>
                                }
                            </Typography>
                        </div>
                        <hr/>
                        <div style={{marginTop: 25}}>
                            {comments &&
                            (comments.map((comment) => (
                                <CommentItem comment={comment}/>
                            )))
                            }
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );


}
