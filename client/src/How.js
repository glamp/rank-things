import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default ({ title, links }) => (
  <div style={{ paddingTop: 80 }}>
    <div className="center">
      <Header title="How does this work?" links={[ { title: "home", href: '/' }]} />
      <hr />
    </div>
    <div style={{ width: 380, margin: '0 auto' }}>
      <p>
        We use an adapted version of the <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo rating system</a> to generate
        our rankings. While this isn't a perfect use-case for Elo, it actually works quite well for our purposes. Each time you
        see a "matchup", we treat this as a head-to-head event. The item you vote for wins the match and we update the score
        of each item accordingly.
      </p>
      <p>
        You can use this method for ranking all kinds of things. It's particularly good with sports. If you plug in an entire season
        worth of results into this app, you'd likely get something really close to one of the expert polls or power rankings. Try
        it for yourself!
      </p>
    </div>
  </div>
);
