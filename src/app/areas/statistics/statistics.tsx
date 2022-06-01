import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WebCollection from '../../common/types/WebCollection';
import WebNeighborhood from '../../common/types/WebNeighborhood';
import WebStreet from '../../common/types/WebStreet';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import { Container, Row, Form, Col, Button, Spinner } from 'react-bootstrap'
import { getStats, updateStatsForm } from '../../store/actions/infoActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowLeft, faArrowRight, faDownload } from '@fortawesome/free-solid-svg-icons';
import { statsTypes } from '../../common/enums/statsTypeEnum';
import { cities } from '../../common/enums/cityEnum';
import { CollatedStatsObject } from '../../common/types/CollatedStatsObject';
import StatsFormState from '../../common/types/StatsFormState';
import { InfoTable } from '../../components/InfoTableComponent/InfoTable';

interface StateProps {
  authTokenSet: boolean,

  isLoadingCollections: boolean,
  isLoadingNeighborhoods: boolean,
  collectionsLoaded: boolean,
  neighborhoodsLoaded: boolean,
  hasLoadingInfoError: boolean,
  infoErrorMessage: string,

  collections: WebCollection[],
  neighborhoods: WebNeighborhood[],
  streets: WebStreet[],

  cityStats: CollatedStatsObject[];
  neighborhoodStats: CollatedStatsObject[];
  streetStats: CollatedStatsObject[];
  collectionStats: CollatedStatsObject[];

  isLoadingStats: boolean;

  hasStatsError: boolean;
  statsErrorMessage: string;

  statsFormState: StatsFormState;
};

interface DispatchProps {
  getStats: (type: number) => void;
  updateStatsForm: (statsFormState: StatsFormState) => void;
}

export type StatisticsProps = DispatchProps & StateProps;

export const Statistics = (props: StatisticsProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }
  }, [navigate, props.authTokenSet]);

  useEffect(() => {
    if(props.authTokenSet) {
      getStatsRequest();
    }
  }, [props.authTokenSet, props.statsFormState.type]);

  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);

  const downloadCSV = async () => {

    let removeString = '__DELETEME__';
    let filename = '';
    let entryData = [] as string[];

    let headerString = "Id,Name,";

    if (props.statsFormState.type === 1) {
      filename = 'CityStats.csv';
      entryData = props.cityStats.map((e) => { 
        return e.id + "," + 
          cities.filter((c) => c.key === e.id)[0].value + "," +
          e.totalProps + "," +
          e.lockedProps + "," +
          e.unlockedNonFSAProps + "," +
          e.unlockedFSAProps + "," +
          e.forSaleProps + "," +
          e.ownedProps + "," +
          e.percentMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.percentNonFSAMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.buildingCount + "," +
          e.percentBuilt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ",";
      });

    } else if (props.statsFormState.type === 2) {
      filename = 'NeighborhoodStats.csv';
      headerString += "City,";
      entryData = props.neighborhoodStats.map((e) => { 
        let neighborhood = props.neighborhoods.filter((n) => n.id === e.id)[0];

        if ((props.statsFormState.cityId !== 0 && neighborhood.cityId !== props.statsFormState.cityId)
          || (props.statsFormState.nameFilter && props.statsFormState.nameFilter !== '' && !neighborhood.name.includes(props.statsFormState.nameFilter))) {
          return removeString;
        }

        return e.id + "," +
          neighborhood.name + "," +
          cities.filter((c) => c.key === neighborhood.cityId)[0].value + "," +
          e.totalProps + "," +
          e.lockedProps + "," +
          e.unlockedNonFSAProps + "," +
          e.unlockedFSAProps + "," +
          e.forSaleProps + "," +
          e.ownedProps + "," +
          e.percentMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.percentNonFSAMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.buildingCount + "," +
          e.percentBuilt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ",";
      });

    } else if (props.statsFormState.type === 3) {
      filename = 'StreetStats.csv';
      headerString += "Type,City,";
      entryData = props.streetStats.map((e) => { 
        let street = props.streets.filter((s) => s.id === e.id)[0];

        if ((props.statsFormState.cityId !== 0 && street.cityId !== props.statsFormState.cityId)
          || (props.statsFormState.nameFilter && props.statsFormState.nameFilter !== '' && !street.name.includes(props.statsFormState.nameFilter))) {
          return removeString;
        }

        return e.id + "," +
          street.name + "," +
          street.type + "," +
          cities.filter((c) => c.key === street.cityId)[0].value + "," +
          e.totalProps + "," +
          e.lockedProps + "," +
          e.unlockedNonFSAProps + "," +
          e.unlockedFSAProps + "," +
          e.forSaleProps + "," +
          e.ownedProps + "," +
          e.percentMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.percentNonFSAMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.buildingCount + "," +
          e.percentBuilt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ",";
      });

    } else if (props.statsFormState.type === 4) {
      filename = 'CollectionStats.csv';
      headerString += "City,Category,Boost,NumberOfSlots,Reward,";
      entryData = props.collectionStats.map((e) => { 
        let collection = props.collections.filter((c) => c.id === e.id)[0];

        if ((props.statsFormState.cityId !== 0 && collection.cityId !== props.statsFormState.cityId)
          || (props.statsFormState.nameFilter && props.statsFormState.nameFilter !== '' && !collection.name.includes(props.statsFormState.nameFilter))) {
          return removeString;
        }

        return e.id + "," +
          collection.name + "," +
          cities.filter((c) => c.key === collection.cityId)[0].value + "," +
          collection.category + "," +
          collection.boost + "," +
          collection.numberOfProperties + "," +
          collection.reward + "," +
          e.totalProps + "," +
          e.lockedProps + "," +
          e.unlockedNonFSAProps + "," +
          e.unlockedFSAProps + "," +
          e.forSaleProps + "," +
          e.ownedProps + "," +
          e.percentMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.percentNonFSAMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "," +
          e.buildingCount + "," +
          e.percentBuilt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ",";
      });
    }

    headerString += "TotalProps,LockedProps,UnlockedNonFSAProps,UnlockedFSAProps,ForSaleProps,OwnedProps,PercentMinted,PercentMintedNonFSA,BuildingCount,PercentBuilt";

    let headerData = [headerString];
    let csvData = headerData.concat(entryData.filter((e) => e !== removeString)).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // In case of IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } 

    setIsDownloadingCSV(false);
  }

  const sortName = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.nameSort === 1)
    {
      return a.name > b.name ? 1 : -1;
    } else if (props.statsFormState.nameSort === 2) {
      return b.name > a.name ? 1 : -1;
    }
    return 0;
  }

  const sortCity = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    let cityAName = cities.filter((c) => c.key === a.cityId)[0].value;
    let cityBName = cities.filter((c) => c.key === b.cityId)[0].value;

    if (props.statsFormState.citySort === 1)
    {
      return cityAName > cityBName ? 1 : -1;
    } else if (props.statsFormState.citySort === 2) {
      return cityBName > cityAName ? 1 : -1;
    }
    return 0;
  }

  const sortTotalProps = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.totalPropsSort === 1)
    {
      return a.totalProps > b.totalProps ? 1 : -1;
    } else if (props.statsFormState.totalPropsSort === 2) {
      return b.totalProps > a.totalProps ? 1 : -1;
    }
    return 0;
  }

  const sortLockedProps = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.lockedPropsSort === 1)
    {
      return a.lockedProps > b.lockedProps ? 1 : -1;
    } else if (props.statsFormState.lockedPropsSort === 2) {
      return b.lockedProps > a.lockedProps ? 1 : -1;
    }
    return 0;
  }

  const sortUnlockedProps = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.unlockedPropsSort === 1)
    {
      return a.unlockedNonFSAProps > b.unlockedNonFSAProps ? 1 : -1;
    } else if (props.statsFormState.unlockedPropsSort === 2) {
      return b.unlockedNonFSAProps > a.unlockedNonFSAProps ? 1 : -1;
    }
    return 0;
  }

  const sortUnlockedFSAProps = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.unlockedFSAPropsSort === 1)
    {
      return a.unlockedFSAProps > b.unlockedFSAProps ? 1 : -1;
    } else if (props.statsFormState.unlockedFSAPropsSort === 2) {
      return b.unlockedFSAProps > a.unlockedFSAProps ? 1 : -1;
    }
    return 0;
  }

  const sortForSaleProps = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.forSalePropsSort === 1)
    {
      return a.forSaleProps > b.forSaleProps ? 1 : -1;
    } else if (props.statsFormState.forSalePropsSort === 2) {
      return b.forSaleProps > a.forSaleProps ? 1 : -1;
    }
    return 0;
  }

  const sortOwnedProps = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.ownedPropsSort === 1)
    {
      return a.ownedProps > b.ownedProps ? 1 : -1;
    } else if (props.statsFormState.ownedPropsSort === 2) {
      return b.ownedProps > a.ownedProps ? 1 : -1;
    }
    return 0;
  }

  const sortPercentMinted = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.percentMintedSort === 1)
    {
      return a.percentMinted > b.percentMinted ? 1 : -1;
    } else if (props.statsFormState.percentMintedSort === 2) {
      return b.percentMinted > a.percentMinted ? 1 : -1;
    }
    return 0;
  }

  const sortPercentMintedNonFSA = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.percentMintedNonFSASort === 1)
    {
      return a.percentNonFSAMinted > b.percentNonFSAMinted ? 1 : -1;
    } else if (props.statsFormState.percentMintedNonFSASort === 2) {
      return b.percentNonFSAMinted > a.percentNonFSAMinted ? 1 : -1;
    }
    return 0;
  }

  const sortBuildingsCount = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.buildingsCountSort === 1)
    {
      return a.buildingCount > b.buildingCount ? 1 : -1;
    } else if (props.statsFormState.buildingsCountSort === 2) {
      return b.buildingCount > a.buildingCount ? 1 : -1;
    }
    return 0;
  }

  const sortPercentBuilt = (a: CollatedStatsObject, b: CollatedStatsObject) => {
    if (props.statsFormState.percentBuiltSort === 1)
    {
      return a.percentBuilt > b.percentBuilt ? 1 : -1;
    } else if (props.statsFormState.percentBuiltSort === 2) {
      return b.percentBuilt > a.percentBuilt ? 1 : -1;
    }
    return 0;
  }

  const handleEnterKeyPress = (changeEvent: React.KeyboardEvent<HTMLInputElement>) => {
    if (changeEvent.key === 'Enter') {
      getStatsRequest();
    }
  }

  const onUpdateStatsForm = (newFormState: StatsFormState) => {
    props.updateStatsForm(newFormState);
  }

  const renderCitySelect = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={6}>
            <h5>City <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={props.statsFormState.cityId}
              disabled={props.isLoadingStats}
              onChange={e => {
                onUpdateStatsForm({
                  ...props.statsFormState,
                  cityId: parseInt(e.target.value)
                });
            }}>
              <option key={0} value={0}>All</option>
              {cities.map((c) => <option key={c.key} value={c.key}>{c.value}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const renderSearchTypeSelect = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={6}>
            <h5>Search By <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={props.statsFormState.type}
              disabled={props.isLoadingStats}
              onChange={e => {
                onUpdateStatsForm({
                  ...props.statsFormState,
                  type: parseInt(e.target.value),
                });
            }}>
              {statsTypes.map((c) => <option key={c.key} value={c.key}>{c.value}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const renderNameFilter = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={6}>
            <h5>Name</h5>
          </Col>
          <Col>
            <Form.Control type="text" value={props.statsFormState.nameFilter}
              onKeyPress={handleEnterKeyPress}
              onChange={e => {
                onUpdateStatsForm({
                  ...props.statsFormState,
                  nameFilter: e.target.value
                });
            }}>
            </Form.Control>
          </Col>
        </Row>
      </div>
    );
  }

  const getStatsRequest = () => {
    props.getStats(props.statsFormState.type);
  }

  const renderColumnOne = () => {
    if (props.isLoadingCollections || props.isLoadingNeighborhoods || props.isLoadingStats) {
      return (
      <div>
        <Row><h2>Statistics</h2></Row>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      );
    } else {
      return (
        <div>
          <Row><h2>Statistics</h2></Row>
          <Row>
            <Button variant="dark" onClick={getStatsRequest} disabled={props.isLoadingStats}>Get Stats</Button>
            <Button className="for-sale-download-csv" variant="dark" onClick={downloadCSV} disabled={props.isLoadingStats || isDownloadingCSV}>Download CSV <FontAwesomeIcon icon={faDownload} /></Button>
          </Row>
        </div>
      );
    }
  }

  const renderColumnTwo = () => {
    return (
      <div>
        {renderSearchTypeSelect()}
        {renderCitySelect()}
        {renderNameFilter()}
      </div>
    );
  }

  const renderStatsHeader = () => {
    return (
      <Container fluid={true} className="bg-secondary text-light">
        <Row className="profile-header header-min-width">
          <Col className="input-form-column-one input-form-column header-info-column-width-250">
            {renderColumnOne()}
          </Col>
          <Col className="input-form-column header-info-column-width-450">
            {renderColumnTwo()}
          </Col>
        </Row>
      </Container>
    );
  }

  const getStatsToUse = ()=> {
    switch(props.statsFormState.type) {
      case 2: 
        return props.neighborhoodStats;
      case 3: 
        return props.streetStats;
      case 4: 
        return props.collectionStats;
      default:
        return props.cityStats;
    }
  }

  const renderStatsBody = () => {
    return (
      <div className="table-max-height">
        <InfoTable 
          entries={getStatsToUse()
            .filter((s) => 
              (props.statsFormState.cityId === 0 || props.statsFormState.cityId === s.cityId) && 
              (!props.statsFormState.nameFilter || props.statsFormState.nameFilter === '' || s.name.toUpperCase().includes(props.statsFormState.nameFilter.toUpperCase())))
            .sort(sortName)
            .sort(sortCity)
            .sort(sortTotalProps)
            .sort(sortLockedProps)
            .sort(sortUnlockedProps)
            .sort(sortUnlockedFSAProps)
            .sort(sortForSaleProps)
            .sort(sortOwnedProps)
            .sort(sortPercentMinted)
            .sort(sortPercentMintedNonFSA)
            .sort(sortBuildingsCount)
            .sort(sortPercentBuilt)
            .slice((props.statsFormState.page - 1) * 100, (props.statsFormState.page * 100))}
          collections={props.collections}
          type={props.statsFormState.type}
          updateSort={props.updateStatsForm}
          statsFormState={props.statsFormState}
        />
      </div>
    );
  }

  const onPageClick = (direction: number) => {
    if (direction === 0 && props.statsFormState.page > 1) {
      onUpdateStatsForm({
        ...props.statsFormState,
        page: props.statsFormState.page - 1
      })
    } else if (direction === 1 && props.statsFormState.page) {
      onUpdateStatsForm({
        ...props.statsFormState,
        page: props.statsFormState.page + 1
      })
    }
  }

  const updatePageNumber = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    let parsedNum = parseInt(changeEvent.currentTarget.value);

    if (isNaN(parsedNum)) {
      parsedNum = 0;
    }

    onUpdateStatsForm({
      ...props.statsFormState,
      page: parsedNum
    });
  }

  const renderStats = () => {
    if (props.isLoadingCollections || props.isLoadingNeighborhoods) {
      return (
        <LoadingComponent />
      );
    } else if (props.hasLoadingInfoError) {
      return (
        <ErrorComponent errorMessage={props.infoErrorMessage} />
      );
    } else {
      return (
        <div>
          {renderStatsHeader()}
          {renderStatsBody()}
        </div>
      );
    }
  }

  return (
    <Container fluid={true} className="bg-secondary text-light">
      {renderStats()}
      <div className="page-selector-class">
        <Row>
          <Button className="page-selector-left" onClick={() => onPageClick(0)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
          <Col className="page-selector-center">
            <Row>
              <Col className="page-selector-center-left"><Form.Label>Page</Form.Label></Col>
              <Col className="page-selector-center-right"><Form.Control size="sm" placeholder="Page" type="text" value={props.statsFormState.page} onChange={updatePageNumber} /></Col>
            </Row>
          </Col>
          <Button className="page-selector-right" onClick={() => onPageClick(1)}><FontAwesomeIcon icon={faArrowRight} /></Button>
        </Row>
      </div>
    </Container>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    getStats: (type: number) => dispatch(getStats(type)),
    updateStatsForm: (statsFormState: StatsFormState) => dispatch(updateStatsForm(statsFormState))
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isLoadingCollections: state.InfoState.isLoadingCollections,
    isLoadingNeighborhoods: state.InfoState.isLoadingNeighborhoods,
    collectionsLoaded: state.InfoState.collections.length > 0,
    neighborhoodsLoaded: state.InfoState.neighborhoods.length > 0,
    hasLoadingInfoError: state.InfoState.hasError,
    infoErrorMessage: state.InfoState.errorMessage,

    collections: state.InfoState.collections,
    neighborhoods: state.InfoState.neighborhoods,
    streets: state.InfoState.streets,

    cityStats: state.InfoState.cityStats,
    neighborhoodStats: state.InfoState.neighborhoodStats,
    streetStats: state.InfoState.streetStats,
    collectionStats: state.InfoState.collectionStats,

    isLoadingStats: state.InfoState.isLoadingStats,
    hasStatsError: state.InfoState.hasStatsError,
    statsErrorMessage: state.InfoState.statsErrorMessage,

    statsFormState: state.InfoState.statsFormState,
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);