import React from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import NewPoll from './NewPoll';
import How from './How';
import Matchup from './Matchup';
import Rankings from './Rankings';
import NotFound from './NotFound';

const ParamsExample = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new-poll" component={NewPoll} />
      <Route exact path="/how-does-this-work" component={How} />
      <Route exact path="/:id" component={({ match }) => <Matchup pollId={match.params.id} />} />
      <Route exact path="/:id/rankings" component={({ match }) => <Rankings pollId={match.params.id} />} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);


export default ParamsExample;
