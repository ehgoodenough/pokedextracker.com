import { Link } from 'react-router';

export function FooterComponent () {
  return (
    <footer className="main-footer">
      <a href="https://pokedextracker.com/blog/" className="link" target="_blank">Blog</a>
      <i className="fa fa-circle" />
      <a href="https://twitter.com/PokedexTracker" className="link" target="_blank" rel="noopener noreferrer">Twitter</a>
      <i className="fa fa-circle" />
      <a href="https://github.com/pokedextracker" className="link" target="_blank" rel="noopener noreferrer">Github</a>
    </footer>
  );
}
