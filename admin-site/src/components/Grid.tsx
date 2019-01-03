import * as React from 'react';
import { Link } from 'react-router-dom';
import { Palettes } from '../types';
import './Grid.css';

export interface GridProps {
  palettes: Palettes;
}

export interface GridPageState {}

export class Grid extends React.Component<GridProps, GridPageState> {
  public readonly state: GridPageState = {}

  public render() {
    const { palettes } = this.props;

    return (
      <ul className="grid_items">
        {Object.keys(palettes).map((key) => (
          <li className="grid_item" key={key}>
            <Link className="grid_item-link" to={`/admin/edit/${key}`}>
              <h3 className="grid_item-name">{ this.trim(palettes[key].name) }</h3>
            </Link>
          </li>
        ))}
      </ul>
    )
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