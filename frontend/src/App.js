import { Route, Switch, Router } from 'wouter';
import StatisticsDate from "./pages/statisticsDate/StatisticsDate";
import Landing from "./pages/landing/Landing";
import StatisticsBasic from "./pages/statisticsBasic/Statistics";
import NewStatistic from "./pages/newStatistic/NewStatistic";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Landing} />
                <Route path="/statistics" component={StatisticsDate} />
                <Route path="/basicStatistics" component={StatisticsBasic}/>
                <Route path="/newStatistic" component={NewStatistic}/>
            </Switch>
        </Router>
    );
}

export default App;


