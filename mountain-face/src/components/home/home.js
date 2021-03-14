import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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


    useEffect(() => {



    }, []);





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
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions
                        of Lorem Ipsum.
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
                        {props.mockData.map((route) => (
                            <Grid item key={route.id} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        // component={"img"}
                                        // src={process.env.PUBLIC_URL +'assets/ProjectImages/'+route.route+'.jpg'}
                                        className={classes.cardMedia}
                                        image={process.env.PUBLIC_URL +'assets/ProjectImages/'+route.route+'.jpg'}
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
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
