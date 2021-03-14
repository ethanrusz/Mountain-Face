import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "./css/App.css";

import Login from "./components/login/login";
// import Register from "./components/register.component";
// import Home from "./components/home.component";
import Home from "./components/home/home";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";

import history from "./helpers/history";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HomeIcon from '@material-ui/icons/Home';
import AuthService from "./services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

export default function App(props) {
  const classes = useStyles();

  const [isTokenSet, setIsTokenSet] = React.useState(AuthService.hasLocalToken());
  // const [isTokenSet, setIsTokenSet] = React.useState(false);

  const mockData = [
    {
      id: 0,
      route: 'Access Denied',
      location: 'El Mirador > El Potrero Chico > Nuevo Leon > Northern Mexico > Mexico > North America > International',
      url: 'https://www.mountainproject.com/route/110149834/access-denied',
      avg_stars: 2.9,
      route_type: 'Sport',
      rating: '5.10b/c',
      pitches: 4,
      length: 350,
      area_latitude: 25.95044,
      area_longitude: -100.47755,
      desc: 'This is a really great route~ with awesome exposure and a really cool summit. It climbs obvious dihedrals and good face climbing up to the ridge.     P1: 5.10a - 11 bolts   P2: 5.10a - 9 bolts    P3: 5.10c - 9 bolts - crux. Some cool handjams and good exposure.    P4: 5.9 - 8 bolts - Jugs to the summit.     You can link pitches and do the route route in two pitches.',
      protection: '12 draws + 60m Rope   Take 22 draws if you want to link pitches.',
      num_votes: 22,
      comments:[
        {
          commentID: 0,
          accountID: 0,
          id: 0,
          heading: 'This is one heading',
          body: 'This is a root comment',
          replies: [
            {
              commentID: 1,
              accountID: 1,
              id: 0,
              heading: 'This is reply to one heading ',
              body: 'This is a reply to a root comment',
              replies: [

              ]
            }
          ]
        },
        {
          commentID: 2,
          accountID: 3,
          id: 0,
          heading: 'This is a test',
          body: 'This is a root comment test',
          replies: [
            {
              commentID: 3,
              accountID: 4,
              id: 0,
              heading: 'This is reply to one heading test ',
              body: 'This is a reply to a root comment test',
              replies: [

              ]
            },
            {
              commentID: 4,
              accountID: 3,
              id: 0,
              heading: 'This is reply to one heading comment test ',
              body: 'I like your comment test',
              replies: [

              ]
            }
          ]
        }
      ]
    },
    {
      id: '1',
      route: 'Agave Nectar',
      location: 'Sugar Shack > Cougar Canyon (Creek) - CONSTRUCTION IN PROGRESS > Bow Valley > Alberta > Canada > North America > International',
      url: 'https://www.mountainproject.com/route/110913861/agave-nectar',
      avg_stars: 2,
      route_type: 'Sport',
      rating: '5.10b/c',
      pitches: 1,
      length: null,
      area_latitude: 51.09642,
      area_longitude: -115.31767,
      desc: 'from tabvar:     Cool fins to roof~ thin holds over roof.',
      protection: '4 bolts to anchor',
      num_votes: 1,
      comments:[
        {
          commentID: 0,
          accountID: 0,
          id: 0,
          heading: 'This is one heading',
          body: 'This is a root comment',
          replies: [
            {
              commentID: 1,
              accountID: 1,
              id: 0,
              heading: 'This is reply to one heading ',
              body: 'This is a reply to a root comment',
              replies: [

              ]
            }
          ]
        },
        {
          commentID: 2,
          accountID: 3,
          id: 0,
          heading: 'This is a test',
          body: 'This is a root comment test',
          replies: [
            {
              commentID: 3,
              accountID: 4,
              id: 0,
              heading: 'This is reply to one heading test ',
              body: 'This is a reply to a root comment test',
              replies: [

              ]
            },
            {
              commentID: 4,
              accountID: 3,
              id: 0,
              heading: 'This is reply to one heading comment test ',
              body: 'I like your comment test',
              replies: [

              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      route: 'Ant & Bee do Yoga',
      location: 'The Hen House > Kamloops > British Columbia > Canada > North America > International',
      url: 'https://www.mountainproject.com/route/112406525/ant-bee-do-yoga',
      avg_stars: 2.7,
      route_type: 'Trad',
      rating: '5.10b/c',
      pitches: 1,
      length: null,
      area_latitude: 50.57212,
      area_longitude: -120.13874,
      desc: 'A safe mixed route with a bit of run out up top. You should probably avoiding touching the large detached boulder to the right of the anchor. #7 on topo.',
      protection: 'mixed~ gear to 4"',
      num_votes: 3,
      comments:[
        {
          commentID: 0,
          accountID: 0,
          id: 0,
          heading: 'This is one heading',
          body: 'This is a root comment',
          replies: [
            {
              commentID: 1,
              accountID: 1,
              id: 0,
              heading: 'This is reply to one heading ',
              body: 'This is a reply to a root comment',
              replies: [

              ]
            }
          ]
        },
        {
          commentID: 2,
          accountID: 3,
          id: 0,
          heading: 'This is a test',
          body: 'This is a root comment test',
          replies: [
            {
              commentID: 3,
              accountID: 4,
              id: 0,
              heading: 'This is reply to one heading test ',
              body: 'This is a reply to a root comment test',
              replies: [

              ]
            },
            {
              commentID: 4,
              accountID: 3,
              id: 0,
              heading: 'This is reply to one heading comment test ',
              body: 'I like your comment test',
              replies: [

              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      route: 'Besame Fuerte',
      location: 'Pilon De Lolita > Loreto Area > Baja California Sur > Mexico > North America > International',
      url: 'https://www.mountainproject.com/route/116086400/besame-fuerte',
      avg_stars: 2,
      route_type: 'Sport',
      rating: '5.10b/c',
      pitches: 1,
      length: 80,
      area_latitude: 26.01097,
      area_longitude: -111.34166,
      desc: 'Start on a slab under a left leaning arched roof. Follow bolts up and left to the arete at the left hand side of the arching roof. Turn the roof and follow the bolts on the arete to a two bolt anchor at ledge.',
      protection: 'bolts"',
      num_votes: 1,
      comments:[
        {
          commentID: 0,
          accountID: 0,
          id: 0,
          heading: 'This is one heading',
          body: 'This is a root comment',
          replies: [
            {
              commentID: 1,
              accountID: 1,
              id: 0,
              heading: 'This is reply to one heading ',
              body: 'This is a reply to a root comment',
              replies: [

              ]
            }
          ]
        },
        {
          commentID: 2,
          accountID: 3,
          id: 0,
          heading: 'This is a test',
          body: 'This is a root comment test',
          replies: [
            {
              commentID: 3,
              accountID: 4,
              id: 0,
              heading: 'This is reply to one heading test ',
              body: 'This is a reply to a root comment test',
              replies: [

              ]
            },
            {
              commentID: 4,
              accountID: 3,
              id: 0,
              heading: 'This is reply to one heading comment test ',
              body: 'I like your comment test',
              replies: [

              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      route: 'Big Momma\'s Rock',
      location: 'The Courtyard > Mamquam FSR > Squamish > British Columbia > Canada > North America > International',
      url: 'https://www.mountainproject.com/route/114457722/big-mommas-rock',
      avg_stars: 3,
      route_type: 'Sport',
      rating: '5.10b/c',
      pitches: 1,
      length: 60,
      area_latitude: 49.71393,
      area_longitude: -123.09943,
      desc: 'Fun technical climbing. Tricky right off the bat.',
      protection: 'bolts"',
      num_votes: 3,
      comments:[
        {
          commentID: 0,
          accountID: 0,
          id: 0,
          heading: 'This is one heading',
          body: 'This is a root comment',
          replies: [
            {
              commentID: 1,
              accountID: 1,
              id: 0,
              heading: 'This is reply to one heading ',
              body: 'This is a reply to a root comment',
              replies: [

              ]
            }
          ]
        },
        {
          commentID: 2,
          accountID: 3,
          id: 0,
          heading: 'This is a test',
          body: 'This is a root comment test',
          replies: [
            {
              commentID: 3,
              accountID: 4,
              id: 0,
              heading: 'This is reply to one heading test ',
              body: 'This is a reply to a root comment test',
              replies: [

              ]
            },
            {
              commentID: 4,
              accountID: 3,
              id: 0,
              heading: 'This is reply to one heading comment test ',
              body: 'I like your comment test',
              replies: [

              ]
            }
          ]
        }
      ]
    },
  ];

  const handleLogout = () => {
    AuthService.logout();
    setIsTokenSet(null);
    history.push("/login");
  };

  const handleSetIsTokenSet = () => {
    setIsTokenSet(AuthService.hasLocalToken());
  };

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <div>
            <div className={classes.root}>
              <AppBar position="static" color="transparent">
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <HomeIcon onClick={() => history.push("/")} />
                  </IconButton >
                  <Typography variant="h6" className={classes.title}>
                    Mountain Face
                  </Typography>
                  {!isTokenSet ? (
                      <Button color="inherit" onClick={() => history.push("/login")}>Login</Button>
                  ) : (
                      <Button onClick={handleLogout} color="inherit">Logout</Button>
                  )}
                </Toolbar>
              </AppBar>
            </div>


            <div>
              <Switch>
                {/*<Route exact path={["/", "/home"]} component={Home} />*/}
                <Route exact path="/login" render={(props) => (
                    <Login {...props} setIsTokenSet={handleSetIsTokenSet} />
                )} />
                {/*<Route exact path="/register" component={Register} />*/}
                <Route exact path={["/", "/home"]} render={(props) => (
                    <Home {...props} setIsTokenSet={handleSetIsTokenSet} mockData={mockData} />
                )} />

              </Switch>
            </div>
          </div>
        </Router>
      </ThemeProvider>
  );
}

