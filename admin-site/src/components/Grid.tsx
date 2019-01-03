import * as React from 'react';
import { Link } from 'react-router-dom';
import { Palette } from '../types';
import './Grid.css';

export interface GridProps {
  palettes: Palette[];
}

export interface GridPageState {}

export class Grid extends React.Component<GridProps, GridPageState> {
  public readonly state: GridPageState = {}

  public render() {
    const { palettes } = this.props;
    return (
      <ul className="grid_items">
        {palettes.map((palette: Palette) => 
          <li className="grid_item" key={palette.id}>
            <Link className="grid_item-link" to={`/admin/edit/${palette.id}`}>
              <h3 className="grid_item-name">{ this.trim(palette.name) }</h3>
            </Link>
          </li>
        )}
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