import { Route, Switch } from "react-router-dom";
import Body from './components/screens/Body';
import Resolved from './components/screens/Resolved';
import ErrorHistoryScreen from "./components/screens/ErrorHistoryScreen";

const Routes = () => {
    return (
        <Switch>
            <Route path="/resolved">
                <Resolved />
            </Route>
            <Route path={`/history/:errID`}>
                    <ErrorHistoryScreen />
                </Route>
            <Route path="/">
                <Body />
            </Route>

        </Switch>
    )

}

export default Routes;
