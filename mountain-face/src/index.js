import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import {createStore} from "redux";

const initialState = {
    mountainRoutes: [
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
        },
    ],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NEW_RELEASES':
            return {
                ...state,
                newReleases: action.newReleases
            }
    }
    return state
}

const store = createStore(reducer);

// console.log = console.warn = console.error = () => {};

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <App />
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
