import React, {useMemo} from 'react';
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
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    MenuItem,
    Paper,
    TextField
} from "@material-ui/core";
import Reply from "./Reply";
import EditComment from "./EditComment";
import BackspaceIcon from "@material-ui/icons/Backspace";
import RouteDialog from "./RouteDialog";
import { makeStyles } from '@material-ui/core/styles';
import MainService from "../../services/mainService";


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

const useStyles = makeStyles((theme) => ({
    root: {

    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


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
export default function SearchDialog(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const CommentItem = (props) => {
        return(
            <div>
                <div>
                    <Paper style={{ padding: "10px 5px", background: '#777777', marginBottom: 20 }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                {/*<Avatar alt="Remy Sharp" src={imgLink} />*/}
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <div style={{display: "inline-block", width: '60%'}}>
                                    <h3 style={{ margin: 0, textAlign: "left" }}>{props.comment.heading}</h3>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>By John Snow</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {props.comment.body}
                                    </p>
                                    <p style={{ textAlign: "left" }}>
                                        posted 1 minute ago
                                    </p>
                                </div>
                                <div style={{display: "inline-block", width: '38%'}}>
                                    {/*<Button style={{float: 'right'}} variant="contained" onClick={handleClose} color="secondary">*/}
                                    {/*    Reply*/}
                                    {/*</Button>*/}
                                    {/*<Button style={{float: 'right', marginRight: 20}} variant="contained" onClick={handleClose} color="secondary">*/}
                                    {/*    Edit*/}
                                    {/*</Button>*/}
                                    <div style={{float: 'right'}} >
                                        <Reply comment={props.comment} />
                                    </div>
                                    <div style={{float: 'right', marginRight: 20}} >
                                        <EditComment comment={props.comment} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div style={{marginLeft: 40}}>
                    {props.comment &&
                    (props.comment.replies &&
                            (props.comment.replies.map((comment) => (
                                        <CommentItem comment={comment} />
                                    )
                                )
                            ))
                    }
                </div>
            </div>
        );
    };

    const [filterType, setFilterType] = React.useState(null);
    const [filterMinDistance, setFilterMinDistance] = React.useState(null);
    const [filterMaxDistance, setFilterMaxDistance] = React.useState(null);
    const [filterMinPitch, setFilterMinPitch] = React.useState(null);
    const [filterMaxPitch, setFilterMaxPitch] = React.useState(null);
    const [filterRating, setFilterRating] = React.useState(null);
    const [filterSearchRouteTerm, setFilterSearchRouteTerm] = React.useState('');
    const [filterSearchLocationTerm, setFilterSearchLocationTerm] = React.useState('');
    const [searchPosition, setSearchPosition] = React.useState(null);
    const [maxDistance, setMaxDistance] = React.useState(50);




    const [loadLimit, setLoadLimit] = React.useState(10);
    const [searchData, setSearchData] = React.useState([]);
    const [filterData, setFilterData] = React.useState([]);

    const updateFilterData = () => {
        let tempHold = [];
        let addedRouteIDs = [];

        if (searchData){
            for (const route of searchData.splice(0, loadLimit)){

                if (filterType){
                    if (route.route_type === filterType){
                        if (!addedRouteIDs.includes(route.id)){
                            tempHold.push(route);
                            addedRouteIDs.push(route.id);
                        }
                    }
                }
                if (filterMinDistance){
                    if (route.length){
                        if (route.length >= filterMinDistance){
                            if (!addedRouteIDs.includes(route.id)){
                                tempHold.push(route);
                                addedRouteIDs.push(route.id);
                            }
                        }
                    }
                }
                if (filterMaxDistance){
                    if (route.length){
                        if (route.length <= filterMaxDistance){
                            if (!addedRouteIDs.includes(route.id)){
                                tempHold.push(route);
                                addedRouteIDs.push(route.id);
                            }
                        }
                    }

                }
                if (filterMinPitch){
                    if (route.pitches){
                        if (route.pitches >= filterMinPitch){
                            if (!addedRouteIDs.includes(route.id)){
                                tempHold.push(route);
                                addedRouteIDs.push(route.id);
                            }
                        }
                    }
                }
                if (filterMaxPitch){
                    if (route.pitches){
                        if (route.pitches <= filterMaxPitch){
                            if (!addedRouteIDs.includes(route.id)){
                                tempHold.push(route);
                                addedRouteIDs.push(route.id);
                            }
                        }
                    }
                }

                setFilterData(tempHold);
            }
        }

    };

    const handleFilterSearchLocationTermChange = (value) => {
        setFilterSearchLocationTerm(value);
    };

    const handleFilterSearchRouteTermChange = (value) => {
        if (value !== ''){
            MainService.searchTerm(value).then(searchResults => {
                console.log(searchResults);
                setSearchData(searchResults);
            });
        } else {
            setSearchData([]);
        }
        setFilterSearchRouteTerm(value);

    };

    function getPos(){
        if (filterSearchLocationTerm.length > 3){
            MainService.getPosition(filterSearchLocationTerm).then(searchResults => {
                if (searchResults){
                    console.log('searchResults');
                    console.log(searchResults);
                    if (searchResults.data.length > 0){
                        setSearchPosition(searchResults.data[0]);
                    }
                }

                // setSearchData(searchResults);
            });
        }
    }

    const handleFilterTypeChange = (value) => {
        setFilterType(value);
    };

    const handleFilterMinDistanceChange = (value) => {
        setFilterMinDistance(value);
    };

    const handleFilterMaxDistanceChange = (value) => {
        setFilterMaxDistance(value);
    };

    const handleFilterMinPitchChange = (value) => {
        setFilterMinPitch(value);
    };

    const handleFilterMaxPitchChange = (value) => {
        setFilterMaxPitch(value);
    };

    const clearFilterType = () => {
        setFilterType(null);
    };

    const clearFilterPitch = () => {
        setFilterMinPitch('');
        setFilterMaxPitch('');
    };

    const clearFilterDistance = () => {
        setFilterMinDistance('');
        setFilterMaxDistance('');
    };

    const clearFilterRating = () => {
        setFilterRating(null);
    };

    const clearFilterSearchTerm = () => {
        setSearchData([]);
        setFilterSearchRouteTerm('');
    };

    const clearFilterSearchLocationTerm = () => {
        setSearchPosition(null);
        setFilterSearchLocationTerm('');
    };

    const routeTypes = [
        {
            value: 'Sport',
            id: 0,
        },
        {
            value: 'Trad',
            id: 1,
        }
    ];

    useMemo(function(){
        if (searchPosition !== null){
            MainService.searchLocation(searchPosition.latitude, searchPosition.longitude, maxDistance).then(results => {
                console.log(results);
                setSearchData(results);
            });
        }

        // return undefined;
    }, [searchPosition]);


    useMemo(function(){
        updateFilterData();
        // return undefined;
    }, [filterType, filterMinDistance, filterMaxDistance, filterMinPitch, filterMaxPitch, filterRating, filterSearchRouteTerm]);

    const IMAGE_URL = 'http://54.208.109.55:8080/image?name='
    // const IMAGE_URL_FALLBACK = 'http://localhost:8080/image?name=50+More+Seconds+of+Fun'
    const IMAGE_URL_FALLBACK = 'https://cdn.pixabay.com/photo/2016/07/17/21/44/mountains-1524804_960_720.png'

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Search
            </Button>
            <Dialog onClose={handleClose} maxWidth={"lg"} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Search Routes
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{width: 900}}>
                        <div className="d-inline-block">
                            <div className="d-inline-block align-top m-1">
                                <Typography variant="subtitle1" display="block" gutterBottom>
                                    Distance
                                    <div className="d-inline-block align-middle m-1">
                                        <Button variant="contained" size={"small"} color="secondary" onClick={()=> clearFilterDistance()} style={{marginTop: '10px'}} endIcon={<BackspaceIcon />}>
                                            Clear
                                        </Button>
                                    </div>
                                </Typography>
                                <div style={{marginBottom: 10}}>
                                    <TextField
                                        id="outlined-number"
                                        label="Min"
                                        type="number"
                                        value={filterMinDistance}
                                        onChange={(event) => handleFilterMinDistanceChange(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color={"secondary"}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-number"
                                        label="Max"
                                        type="number"
                                        value={filterMaxDistance}
                                        onChange={(event) => handleFilterMaxDistanceChange(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color={"secondary"}
                                    />
                                </div>
                            </div>
                            <div className="d-inline-block align-top m-1">
                                <Typography variant="subtitle1" display="block" gutterBottom>
                                    Pitch
                                    <div className="d-inline-block align-middle m-1">
                                        <Button variant="contained" size={"small"} color="secondary" onClick={()=> clearFilterPitch()}  style={{marginTop: '10px'}} endIcon={<BackspaceIcon />}>
                                            Clear
                                        </Button>
                                    </div>
                                </Typography>
                                <div style={{marginBottom: 10}}>
                                    <TextField
                                        id="outlined-minPitch"
                                        label="Min"
                                        type="number"
                                        value={filterMinPitch}
                                        onChange={(event) => handleFilterMinPitchChange(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color={"secondary"}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-maxPitch"
                                        label="Max"
                                        type="number"
                                        value={filterMaxPitch}
                                        onChange={(event) => handleFilterMaxPitchChange(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color={"secondary"}
                                    />
                                </div>
                            </div>
                            <div className="d-inline-block align-top m-1">
                                <Typography variant="subtitle1" display="block" gutterBottom>
                                    Type
                                    <div className="d-inline-block align-middle m-1">
                                        <Button variant="contained" size={"small"} onClick={()=> clearFilterType()} color="secondary" style={{marginTop: '10px'}} endIcon={<BackspaceIcon />}>
                                            Clear
                                        </Button>
                                    </div>
                                </Typography>
                                <div style={{marginBottom: 10}}>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="Type"
                                        value={filterType}
                                        color={"secondary"}
                                        onChange={(event) => handleFilterTypeChange(event.target.value)}
                                        helperText="Please select route type"
                                    >
                                        {routeTypes.map((option) => (
                                            <MenuItem key={option.id} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>

                        </div>

                        <br />

                        <div className="d-inline-block w-75">
                            <FormControl fullWidth >
                                <TextField id="filled-basic" value={filterSearchRouteTerm} onChange={(event) => handleFilterSearchRouteTermChange(event.target.value)} label="Search Routes" variant="filled" color="secondary" />
                            </FormControl>
                        </div>

                        <div className="d-inline-block">
                            <div className="m-1">
                                <Button variant="contained" color="secondary" style={{marginTop: '10px'}} onClick={()=> clearFilterSearchTerm()} size={"small"} endIcon={<BackspaceIcon />}>
                                    Clear
                                </Button>
                            </div>

                        </div>

                        <div className="d-inline-block w-75">
                            <FormControl fullWidth >
                                <TextField value={filterSearchLocationTerm} onChange={(event) => setFilterSearchLocationTerm(event.target.value)} label="Search Locations" variant="filled" color="secondary" />
                                <TextField style={{marginTop: 10}} value={maxDistance} onChange={(event) => setMaxDistance(event.target.value)} label="Search Distance" variant="filled" color="secondary" />
                                <Button disabled={(!(filterSearchLocationTerm.length > 3))} variant="contained" color="secondary" style={{marginTop: '10px'}} onClick={()=> getPos()} size={"small"} >
                                    Search Location
                                </Button>
                            </FormControl>
                        </div>

                        <div className="d-inline-block">
                            <div className="m-1">
                                <Button variant="contained" color="secondary" style={{marginTop: '10px'}} onClick={()=> clearFilterSearchLocationTerm()} size={"small"} endIcon={<BackspaceIcon />}>
                                    Clear
                                </Button>
                            </div>

                        </div>

                        <div style={{marginTop: 10, marginBottom: 25}}>
                            <Grid container spacing={4}>
                                {filterData.length > 0 ?
                                    (filterData.slice(0, loadLimit).map((route) => (
                                            <Grid item key={route.id} xs={12} sm={6} md={3}>
                                                <Card className={classes.card}>
                                                    <CardMedia
                                                        component={"img"}
                                                        src={IMAGE_URL + route.route}
                                                        style={{paddingTop: 0, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', maxHeight: '140px'}}
                                                        onError={e => {
                                                            e.target.src = IMAGE_URL_FALLBACK;
                                                        }}
                                                        className={classes.cardMedia}
                                                        title={route.route}
                                                    />

                                                    <CardContent className={classes.cardContent}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {route.route}
                                                        </Typography>
                                                        <Typography noWrap>
                                                            {route.desc}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <RouteDialog route={route} />
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )))
                                    :
                                    (searchData.length > 0 &&
                                        (searchData.slice(0, loadLimit).map((route) => (
                                                <Grid item key={route.id} xs={12} sm={6} md={3}>
                                                    <Card className={classes.card}>
                                                        <CardMedia
                                                            component={"img"}
                                                            src={IMAGE_URL + route.route}
                                                            style={{paddingTop: 0, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', maxHeight: '140px'}}
                                                            onError={e => {
                                                                e.target.src = IMAGE_URL_FALLBACK;
                                                            }}
                                                            className={classes.cardMedia}
                                                            title={route.route}
                                                        />

                                                        <CardContent className={classes.cardContent}>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {route.route}
                                                            </Typography>
                                                            <Typography noWrap>
                                                                {route.desc}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <RouteDialog route={route} />
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )))
                                    )
                                }
                            </Grid>

                            <div>
                                {(filterData.length > 10 || searchData.length > 10) &&
                                <FormControl fullWidth >
                                    <Button variant="contained" color="secondary" style={{marginTop: '10px'}} onClick={()=> setLoadLimit(loadLimit + 10) } size={"small"} >
                                        Show More
                                    </Button>
                                </FormControl>
                                }

                                {loadLimit > 10 &&
                                <FormControl fullWidth >
                                    <Button variant="contained" color="secondary" style={{marginTop: '10px'}} onClick={()=>  setLoadLimit(loadLimit - 10)} size={"small"} >
                                        Show Less
                                    </Button>
                                </FormControl>

                                }
                            </div>
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
