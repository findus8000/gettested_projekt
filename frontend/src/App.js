import { Route, Switch, Router } from 'wouter';
import AverageStat from "./pages/averageStat/AverageStat";
import Landing from "./pages/landing/Landing";
import SpecificStat from "./pages/specificStat/SpecificStat";
import CompareStat from "./pages/compareStat/CompareStat";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Landing} />
                <Route path="/average" component={AverageStat} />
                <Route path="/specific" component={SpecificStat}/>
                <Route path="/compare" component={CompareStat}/>
            </Switch>
        </Router>
    );
}

export default App;


