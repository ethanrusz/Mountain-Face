import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MainService from "../../services/mainService";

import background from "../../assets/background.jpg";
import {Card, CardActions, CardContent, CardMedia} from "@material-ui/core";
import RouteDialog from "./RouteDialog";
import SearchDialog from "./SearchDialog";

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

export default function Home(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [randRoutes, setRandRoutes] = React.useState(null);


    useEffect(() => {
        MainService.getRandom().then(randRoutesData => {
            console.log('res');
            console.log(randRoutesData);
            setRandRoutes(randRoutesData)
        });


    }, []);

    const IMAGE_URL = 'http://localhost:8080/image?name='
    // const IMAGE_URL_FALLBACK = 'http://localhost:8080/image?name=50+More+Seconds+of+Fun'
    const IMAGE_URL_FALLBACK = 'https://cdn.pixabay.com/photo/2016/07/17/21/44/mountains-1524804_960_720.png'
    // process.env.PUBLIC_URL +'assets/ProjectImages/'+route.route+'.jpg'


    return (
        <div className={classes.root}>
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }} className={classes.heroContent}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Mountain Face
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Buncha rocks n' what not
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                {/*<Button variant="contained" color="secondary">*/}
                                {/*    Search*/}
                                {/*</Button>*/}
                                <SearchDialog data={props.mockData} />
                            </Grid>
                            {/*<Grid item>*/}
                            {/*    <Button variant="contained" color="secondary">*/}
                            {/*        Secondary action*/}
                            {/*    </Button>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </div>
                </Container>
            </div>
            <div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {randRoutes &&
                        (randRoutes.map((route) => (
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
                        }
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
