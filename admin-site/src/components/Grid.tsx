import * as React from 'react';
import { Link } from 'react-router-dom';
import { requests } from '../firebase/db';
import { Palettes } from '../types';
import './Grid.css';

export interface GridProps {
  palettes: Palettes;
  deleting: boolean;
}

export interface GridPageState {}

export class Grid extends React.Component<GridProps, GridPageState> {
  public readonly state: GridPageState = {}

  public render() {
    const { deleting, palettes } = this.props;

    return (
      <ul className="grid_items">
        {Object.keys(palettes).map((key) => (
          <li className="grid_item" key={key}>
            {deleting &&
            <span className="grid_button fa-stack fa-2x" onClick={() => this.handleDelete(key)}>
              <i className="grid_circle fas fa-circle fa-stack-2x" />
              <i className="grid_minus fas fa-minus fa-stack-1x" />
            </span>}
            <Link className="grid_item-link" to={`/admin/edit/${key}`}>
              <h3 className="grid_item-name">{ this.trim(palettes[key].name) }</h3>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  private handleDelete = (key: string) => {
    requests.palettes.deletePalette(key);
  }

  private trim = (text: string) => {
    if (text.length > 50) {
      let trimmed = text.slice(0, 25);
      trimmed += '...';
      trimmed += text.slice(text.length - 25, text.length);
      return trimmed;
    }
    return text;
  }
}