import * as React from 'react';
import './Card.css';

export interface CardProps {
  title: string;
  className?: string;
}

export const Card: React.SFC<CardProps> = (props) => (
  <div className={`card ${props.className}`}>
    <h3 className="card_title">{props.title}</h3>
  </div>
)