import * as React from 'react';
import { auth } from '../firebase';
import './Header.css';

export interface HeaderProps {}

export interface HeaderPageState {}

export class Header extends React.Component<HeaderProps, HeaderPageState> {
  public readonly state: HeaderPageState = {}

  public render() {
    return (
      <div className="header">
        <h1 className="header_title">Eyeshadow Palette Finder Admin</h1>
        <span className="header_cta" onClick={() => auth.doSignOut()}>Logout</span>
      </div>
    )
  }
}