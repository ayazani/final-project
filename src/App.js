import React, { Component } from 'react';
import { Route, Link, BrowserRouter} from "react-router-dom"

import Home from './Components/Home'
import Summoned from './Components/Summoned'
import Servant from './Components/Servant'

class App extends Component {
    render() {
        return (
            <section className="App">
                <BrowserRouter>
                    <Link to="/" className="menu">Home</Link>
                    <Link to="/summoned" className="menu">Summoned Servants</Link>
                    <Route exact path = '/' component={Home} />
                    <Route exact path = '/summoned' component={Summoned}/>
                    <Route exact path = '/servant' component={Servant} />
                </BrowserRouter>
            </section>
        );
    }
}
export default App
