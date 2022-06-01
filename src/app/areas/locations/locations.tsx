import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import UserProfile from '../../common/types/UserProfile';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import { Table, Row } from 'react-bootstrap';
import './locations.css';

interface StateProps {
  authTokenSet: boolean,
  isProfileLoaded: boolean,
  userProfile: UserProfile,
  isLoadingProfile: boolean,
  hasError: boolean,
  errorMessage: string
};

interface DispatchProps { }

export type LocationsProps = DispatchProps & StateProps;

export const Locations = (props: LocationsProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }
  }, [navigate, props.isProfileLoaded, props.authTokenSet])

  const names = [
    "Friendo",
    "Chief",
    "Slugger",
    "Boss",
    "Champ",
    "Amigo",
    "Guy",
    "Buddy",
    "Sport",
    "My Dude",
    "Pal",
    "Buddy",
    "Bud",
    "Big Guy",
    "Tiger",
    "Scooter",
    "Shooter",
    "Ace",
    "Partner",
    "Slick",
    "Hombre",
    "Hoss",
    "Bub",
    "Buster",
    "Partner",
    "Fam",
    "Cap",
    "Skip",
    "Slim",
    "Ghost Rider"
  ];
  const greetings = [
    "Hello",
    "Hi",
    "Howdy",
    "Greetings",
    "What's Happening",
    "How's it Hanging",
    "Tidings",
    "What's Up",
    "Salutations",
    "Hola",
    "G'day",
    "Hey",
    "Sup",
    "Hiya",
    "Ahoy",
    "Que Pasa",
    "Hola",
    "Cheers",
    "Well Met",
    "Shalom"   
  ]

  const getRandomGreeting = () => {
    return greetings[Math.floor(Math.random()*greetings.length)] + " " + names[Math.floor(Math.random()*names.length)] + "!";
  }

  const renderProfileRunCountsBox = () => {
    if (!props.userProfile.supporter) {
      return (
        <div className="locations-run-counts-box">
          <Row><h3>{props.userProfile.username}</h3></Row>
          {props.userProfile.runCount >= props.userProfile.maxRuns ? 
            <Row><u><b><h5>No Runs Left, Vist Locations</h5></b></u></Row> : 
            <Row><h5>Runs Used: {props.userProfile.runCount} / {props.userProfile.maxRuns}</h5></Row>}
          <Row><h5>UPX to Next Run: {props.userProfile.upxToNextRun}</h5></Row>
          <Row><h5>UPX to Supporter: {props.userProfile.upxToSupporter}</h5></Row>
        </div>
      );
    } else {
      return (
        <div className="locations-run-counts-box">
          <Row><h1>Supporter</h1></Row>
          <Row><h3>Thank You!</h3></Row>
        </div>
      );
    }
  }

  const renderGreetingBox = () => {
    if (!props.userProfile.supporter) {
      return (
        <div className="locations-greeting-box">
          <Row><h3>{getRandomGreeting()}</h3></Row>
          <Row><p>You have <u><b>{props.userProfile.runCount >= props.userProfile.maxRuns ? "no runs left." : props.userProfile.maxRuns-props.userProfile.runCount + " runs left." }</b></u> To earn another run send to any of the properties below, or you can send UPX directly to Hornbrod (you will need to cover the fees). The Optimizer listens to the blockchain every 5 minutes for new sends so please be patient. Over on the right you can see your current runs, as well as how close you are to another run, and becoming a supporter.</p></Row>
        </div>
      );
    } else {
      return (
        <div className="locations-greeting-box">
          <Row><h3>{getRandomGreeting()}</h3></Row>
          <Row><p>You are already a supporter, but if you like the optimizer so much you still want to tip more, feel free to visit the properties below or send UPX directly to Hornbrod!</p></Row>
        </div>
      );
    }
  }

  const renderLocations = () => {
    if (props.isLoadingProfile) {
      return (
        <LoadingComponent />
      )
    } else if (props.hasError) {
      return (
        <ErrorComponent errorMessage={props.errorMessage} />
      );
    } else {
      return (
        <Container fluid={true} className="bg-secondary text-light locations-min-width">
            <Row className="profile-header">
              {renderGreetingBox()}
              {renderProfileRunCountsBox()}
            </Row>
            <Row>
              <Table className="bg-light">
                <thead>
                  <tr><th>City</th><th>Address</th><th>Send Amount</th></tr>
                </thead>
                <tbody>
                  <tr><td>San Francisco</td><td>1441 Stevenson St, CA</td><td>125</td></tr>
                  <tr><td>Manhattan</td><td>137 W 13th St, NY</td><td>125</td></tr>
                  <tr><td>Queens</td><td>195 Beach 147 Street, NY</td><td>100</td></tr>
                  <tr><td>Fresno</td><td>2272 Robinwood Ave, CA</td><td>25</td></tr>
                  <tr><td>Brooklyn</td><td>140 Kensington St, NY</td><td>50</td></tr>
                  <tr><td>Oakland</td><td>7307 Ney Ave, CA</td><td>50</td></tr>
                  <tr><td>Staten Island</td><td>405 Lenevar Ave, NY</td><td>25</td></tr>
                  <tr><td>Bakersfield</td><td>1228 Lincoln ST, CA</td><td>25</td></tr>
                  <tr><td>Chicago</td><td>1368 N Milwaukee Ave, IL</td><td>125</td></tr>
                  <tr><td>Cleveland</td><td>12300 Gay Ave, OH</td><td>50</td></tr>
                  <tr><td>Santa Clara</td><td>3037 Alexander Ave, CA</td><td>100</td></tr>
                  <tr><td>Rutherford</td><td>68 Vanderburgh Ave, NY</td><td>50</td></tr>
                  <tr><td>Kansas City</td><td>7 NE 64th St, MO</td><td>50</td></tr>
                  <tr><td>New Orleans</td><td>819 Bourbon St, LA</td><td>50</td></tr>
                  <tr><td>Nashville</td><td>311 Broadway, TN</td><td>100</td></tr>
                  <tr><td>The Bronx</td><td>15 Fordham St, NY</td><td>100</td></tr>
                  <tr><td>Los Angeles</td><td>7614 Melrose Ave, CA</td><td>125</td></tr>
                  <tr><td>Detroit</td><td>70 Josephine St, MI</td><td>25</td></tr>
                </tbody>
              </Table>
            </Row>
        </Container>
      )
    }
  }

  return (
    <Container fluid={true} className="bg-secondary text-light">
      {renderLocations()}
    </Container>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = { }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    userProfile: state.ProfileState.userProfile,
    isLoadingProfile: state.ProfileState.isLoadingProfile,
    hasError: state.ProfileState.hasError,
    errorMessage: state.ProfileState.errorMessage,
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);