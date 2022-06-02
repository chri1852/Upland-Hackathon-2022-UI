import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import UserProfile from '../../common/types/UserProfile';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import { Table, Row, Button } from 'react-bootstrap';
import { joinBattle, postPropertiesUnminted } from '../../store/actions/propertyActions';
import Battle from '../../common/types/Battle';
import './locations.css';
import { BattleTable } from '../../components/BattleTableComponent/BattleTable';
import { ApiService } from '../../common/api';
import JoinBattleComponent from '../../components/JoinBattleComponent/JoinBattleComponent';
import { useAppContext } from  '../../common/app-context';


interface StateProps {
  authTokenSet: boolean,
  isProfileLoaded: boolean,
  userProfile: UserProfile,
  isLoadingProfile: boolean,
  hasError: boolean,
  errorMessage: string,
  loadingBattles: boolean,
  battles: Battle[]
};

interface DispatchProps { 
  joinBattle: (battleId: number) => void;
  postPropertiesUnminted: () => void;
}

export type LocationsProps = DispatchProps & StateProps;

export const Locations = (props: LocationsProps) => {
  const navigate = useNavigate();
  const context = useAppContext();
  const apiService: ApiService = context.apiService;

  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }
    props.postPropertiesUnminted();
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

  const processUpdateBattles = async () => {
    await apiService.postDebugUpdateBattles$().toPromise();
    props.postPropertiesUnminted();
  }

  const renderProfileRunCountsBox = () => {
    return (
      <div className="locations-run-counts-box">
        <Row><Button onClick={processUpdateBattles}>Debug Update All Battle</Button></Row>
        <Row className="battleList-top-padding"><Button onClick={props.postPropertiesUnminted}>Debug Refresh Battle</Button></Row>
      </div>
    );
  }

  const renderGreetingBox = () => {
    return (
      <div className="locations-greeting-box">
        <Row><h3>{getRandomGreeting()}</h3></Row>
        <Row><p>Click Battle to challenge one of the other NFTs here. Once you accept in Upland the battle will happen! You will be able to see the outcome on an NFTs Battle History on the Manage Page.</p></Row>
      </div>
    );
    
  }

  const renderLocations = () => {
    if (props.isLoadingProfile || props.loadingBattles) {
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
              <BattleTable battles={props.battles} joinBattle={props.joinBattle}/>
            </Row>
        </Container>
      )
    }
  }

  return (
    <>
      <JoinBattleComponent />
      <Container fluid={true} className="bg-secondary text-light">
        {renderLocations()}
      </Container>
    </>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    joinBattle: (battleId: number) => dispatch(joinBattle(battleId)),
    postPropertiesUnminted: () => dispatch(postPropertiesUnminted())
  }

  return dispatchProps
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    userProfile: state.ProfileState.userProfile,
    isLoadingProfile: state.ProfileState.isLoadingProfile,
    hasError: state.ProfileState.hasError,
    errorMessage: state.ProfileState.errorMessage,
    loadingBattles: state.PropertyState.isLoadingUnmintedProperties,
    battles: state.PropertyState.propertiesUnminted
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);