import { Route, Switch, Router } from 'wouter';
import Statistics from "./pages/statistics/Statistics";
import Landing from "./pages/landing/Landing";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" component={Landing} />
              <Route path="/statistics" component={Statistics} />
          </Switch>
      </Router>
  );
}

export default App;
