import { Route, Switch, Router } from 'wouter';
import StatisticsDate from "./pages/statisticsDate/StatisticsDate";
import Landing from "./pages/landing/Landing";
import StatisticsBasic from "./pages/statisticsBasic/Statistics";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" component={Landing} />
              <Route path="/statistics" component={StatisticsDate} />
              <Route path="/basicStatistics" component={StatisticsBasic}/>
          </Switch>
      </Router>
  );
}

export default App;
