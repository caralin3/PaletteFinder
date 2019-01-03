import * as React from 'react';
import { Card } from './';
import { Link } from 'react-router-dom';
import './Grid.css';

export interface GridProps {
  palettes: any[];
}

export interface GridPageState {}

export class Grid extends React.Component<GridProps, GridPageState> {
  public readonly state: GridPageState = {}

  public render() {
    const { palettes } = this.props;
    return (
      <div className="grid">
        <ul className="grid_items">
          {palettes.map((palette) => 
            <li className="grid_item">
              <Link to={`/admin/edit/${palette.id}`}>
                <Card title={palette.title} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}