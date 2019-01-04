import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { withAuthorization } from '../auth/withAuthorization';
import { Grid, Header } from '../components';
import { requests } from '../firebase/db';
import { ApplicationState } from '../store';
import { Palettes } from '../types';
import './Home.css';

export interface HomePageProps { }

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface StateMappedProps {
  palettes: Palettes | null;
}

interface HomeMergedProps extends
  RouteComponentProps,
  StateMappedProps,
  DispatchMappedProps,
  HomePageProps {}

export interface HomePageState {
  deleting: boolean;
}

class DisconnectedHomePage extends React.Component<HomeMergedProps, HomePageState> {
  public readonly state: HomePageState = {
    deleting: false
  }

  public componentWillMount() {
    this.loadPalettes();
  }

  public render() {
    const { palettes } = this.props;
    const { deleting } = this.state;

    return (
      <div className="home">
        <Header />
        <div className="home_content">
          <div className="home_header">
            <h2 className="home_title">Eyeshadow Palettes</h2>
            <div>
              <Link to="/admin/add">
                <span className="home_button fa-stack fa-2x">
                  <i className="home_circle fas fa-circle fa-stack-2x" />
                  <i className="home_plus fas fa-plus fa-stack-1x" />
                </span>
              </Link>
              <span className="home_button fa-stack fa-2x" onClick={this.toggleDelete}>
                <i className="home_circle fas fa-circle fa-stack-2x" />
                <i className="home_del fas fa-trash-alt fa-stack-1x" />
              </span>
            </div>
          </div>
          {!!palettes ? <Grid palettes={palettes} deleting={deleting} /> : 
            <div className="home_empty">
              <h3>You haven't added any eyeshadow palettes yet.</h3>
            </div>
          }
        </div>
      </div>
    )
  }

  private loadPalettes = async () => {
    const { dispatch } = this.props;
    await requests.palettes.getAllPalettes(dispatch);
  }

  private toggleDelete = () => this.setState({ deleting: !this.state.deleting });
}

const authCondition = (authUser: any) => !!authUser;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

const mapStateToProps = (state: ApplicationState) => ({
  palettes: state.palettesState.palettes,
});

export const HomePage = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectedHomePage);