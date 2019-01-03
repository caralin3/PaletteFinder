import * as React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import './Header.css';

export interface HeaderProps {}

export interface HeaderPageState {}

export class Header extends React.Component<HeaderProps, HeaderPageState> {
  public readonly state: HeaderPageState = {}

  public render() {
    return (
      <div className="header">
        <Link className="header_link" to="/admin">
          <h1 className="header_title">Eyeshadow Palette Finder Admin</h1>
        </Link>
        <span className="header_cta" onClick={() => auth.doSignOut()}>Logout</span>
      </div>
    )
  }
}