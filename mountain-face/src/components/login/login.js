import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Mountain Face
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    login: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState(null);

    const [password, setPassword] = React.useState(null);

    const handleSetUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // AuthService.login(username, password).then(res => {
        //     if (res !== null){
        //         if (res.accessToken !== '' || res.accessToken !== null){
        //             props.setIsTokenSet();
        //             props.history.push("/dashboard");
        //         }
        //     }
        // });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div className={classes.login}>
                    <TextField
                        variant="filled"
                        color="secondary"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="email"
                        autoFocus
                        onChange={handleSetUsername}
                    />
                    <TextField
                        variant="filled"
                        color="secondary"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleSetPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/*<Link href="#" variant="body2">*/}
                            {/*    Forgot password?*/}
                            {/*</Link>*/}
                        </Grid>
                        <Grid item>
                            {/*<Link href="#" variant="body2">*/}
                            {/*    {"Don't have an account? Sign Up"}*/}
                            {/*</Link>*/}
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
