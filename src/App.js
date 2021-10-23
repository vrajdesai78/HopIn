import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Home"
import Login from './components/Login'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/home" exact>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
