import './PropertyTable.css';
import { UserProfileProperty } from '../../common/types/UserProfile';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { PropertyTableEntry } from './PropertyTableEntry';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WebCollection from '../../common/types/WebCollection';

export interface OwnProps {
  properties: UserProfileProperty[],
  filters: ProfilePropertyFilters,
  updateFilters: Function,
  collections: WebCollection[],
  getPropertyHistory: Function,
}

export const PropertyTable = (props: OwnProps) => {

  const getInitialSortFilters = () => {
    return {
      ...props.filters,
      AddressSort: 0,
      CitySort: 0,
      NeighborhoodSort: 0,
      SizeSort: 0,
      CollectionSort: 0,
      MintSort: 0,
      BoostSort: 0,
      StatusSort: 0,
      BuildingSort: 0,
      MintedSort: 0,
      AcquiredOnSort: 0,
    };
  }

  const updateAddressFilter = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    props.updateFilters({
      ...props.filters,
      Address: changeEvent.currentTarget.value.toUpperCase()
    } as ProfilePropertyFilters)
  } 

  const updateCityFilter = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    props.updateFilters({
      ...props.filters,
      City: changeEvent.currentTarget.value.toUpperCase()
    } as ProfilePropertyFilters)
  } 

  const updateNeighborhoodFilter = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    props.updateFilters({
      ...props.filters,
      Neighborhood: changeEvent.currentTarget.value.toUpperCase()
    } as ProfilePropertyFilters)
  } 

  const updateStatusFilter = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    props.updateFilters({
      ...props.filters,
      Status: changeEvent.currentTarget.value.toUpperCase()
    } as ProfilePropertyFilters)
  } 

  const updateBuildingFilter = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    props.updateFilters({
      ...props.filters,
      Building: changeEvent.currentTarget.value.toUpperCase()
    } as ProfilePropertyFilters)
  }
  
  const updateAddressSort = (changeEvent: any) => {
    let newValue = (props.filters.AddressSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      AddressSort: newValue
    })
  }

  const updateCitySort = (changeEvent: any) => {
    let newValue = (props.filters.CitySort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      CitySort: newValue
    })
  }

  const updateNeighborhoodSort = (changeEvent: any) => {
    let newValue = (props.filters.NeighborhoodSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      NeighborhoodSort: newValue
    })
  }

  const updateSizeSort = (changeEvent: any) => {
    let newValue = (props.filters.SizeSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      SizeSort: newValue
    })
  }

  const updateCollectionSort = (changeEvent: any) => {
    let newValue = (props.filters.CollectionSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      CollectionSort: newValue
    })
  }

  const updateMintSort = (changeEvent: any) => {
    let newValue = (props.filters.MintSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      MintSort: newValue
    })
  }

  const updateBoostSort = (changeEvent: any) => {
    let newValue = (props.filters.BoostSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      BoostSort: newValue
    })
  }

  const updateStatusSort = (changeEvent: any) => {
    let newValue = (props.filters.StatusSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      StatusSort: newValue
    })
  }

  const updateBuildingSort = (changeEvent: any) => {
    let newValue = (props.filters.BuildingSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      BuildingSort: newValue
    })
  }

  const updateMintedSort = (changeEvent: any) => {
    let newValue = (props.filters.MintedSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      MintedSort: newValue
    })
  }

  const updateAcquiredOnSort = (changeEvent: any) => {
    let newValue = (props.filters.AcquiredOnSort + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      AcquiredOnSort: newValue
    })
  }

  const sortAddress = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.AddressSort === 1)
    {
      return a.address > b.address ? 1 : -1;
    } else if (props.filters.AddressSort === 2) {
      return b.address > a.address ? 1 : -1;
    }
    return 0;
  }

  const sortCity = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.CitySort === 1)
    {
      return a.city > b.city ? 1 : -1;
    } else if (props.filters.CitySort === 2) {
      return b.city > a.city ? 1 : -1;
    }
    return 0;
  }

  const sortNeighborhood = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.NeighborhoodSort === 1)
    {
      return a.neighborhood > b.neighborhood ? 1 : -1;
    } else if (props.filters.NeighborhoodSort === 2) {
      return b.neighborhood > a.neighborhood ? 1 : -1;
    }
    return 0;
  }

  const sortSize = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.SizeSort === 1) {
      return a.size > b.size ? 1 : -1;
    } else if (props.filters.SizeSort === 2) {
      return b.size > a.size ? 1 : -1;
    }
    return 0;
  }

  const sortCollection = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.CollectionSort === 1) {
      return a.collectionIds.length > b.collectionIds.length ? 1 : -1;
    } else if (props.filters.CollectionSort === 2) {
      return b.collectionIds.length > a.collectionIds.length ? 1 : -1;
    }
    return 0;
  }

  const sortMint = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.MintSort === 1) {
      return a.mint > b.mint ? 1 : -1;
    } else if (props.filters.MintSort === 2) {
      return b.mint > a.mint ? 1 : -1;
    }
    return 0;
  }

  const sortBoost= (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.BoostSort === 1) {
      return a.boost > b.boost ? 1 : -1;
    } else if (props.filters.BoostSort === 2) {
      return b.boost > a.boost ? 1 : -1;
    }
    return 0;
  }

  const sortStatus = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.StatusSort === 1) {
      return a.status > b.status ? 1 : -1;
    } else if (props.filters.StatusSort === 2) {
      return b.status > a.status ? 1 : -1;
    }
    return 0;
  }

  const sortBuilding = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.BuildingSort === 1) {
      return a.building > b.building ? 1 : -1;
    } else if (props.filters.BuildingSort === 2) {
      return b.building > a.building ? 1 : -1;
    }
    return 0;
  }

  const sortMinted = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.MintedSort === 1) {
      return a.minted > b.minted ? 1 : -1;
    } else if (props.filters.MintedSort === 2) {
      return b.minted > a.minted ? 1 : -1;
    }
    return 0;
  }

  const sortAcquiredOn = (a: UserProfileProperty, b: UserProfileProperty) => {
    if (props.filters.AcquiredOnSort === 1) {
      return a.acquiredOn > b.acquiredOn ? 1 : -1;
    } else if (props.filters.AcquiredOnSort === 2) {
      return b.acquiredOn > a.acquiredOn ? 1 : -1;
    }
    return 0;
  }

  const renderSortIcon = (direction: number, onClick: any) => {
    if (direction === 0) {
      return (
        <div className="sort-selector-padding" onClick={onClick}>
         <FontAwesomeIcon icon={faSort} />
        </div>
      );
    }

    if (direction === 1) {
      return (
        <div className="sort-selector-padding" onClick={onClick}>
         <FontAwesomeIcon icon={faSortUp} />
        </div>
      );
    }

    if (direction === 2) {
      return (
        <div className="sort-selector-padding" onClick={onClick}>
         <FontAwesomeIcon icon={faSortDown} />
        </div>
      );
    }
  }

  const onPageClick = (direction: number) => {
    if (direction === 0 && props.filters.PageNumber > 1) {
      props.updateFilters({
        ...props.filters,
        PageNumber: props.filters.PageNumber - 1
      })
    } else if (direction === 1 && props.filters.PageNumber < Math.ceil(props.properties.length / 100)) {
      props.updateFilters({
        ...props.filters,
        PageNumber: props.filters.PageNumber + 1
      })
    }
  }

  const updatePageNumber = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    let parsedNum = parseInt(changeEvent.currentTarget.value);

    if (isNaN(parsedNum)) {
      parsedNum = 0;
    }
    props.updateFilters({
      ...props.filters,
      PageNumber: parsedNum
    })
  }

  return (
    <div className="bg-light property-table-min-width">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <div className="filter-col">
                <Form.Label>Address</Form.Label>
                {renderSortIcon(props.filters.AddressSort, updateAddressSort)}
                <Form.Control size="sm" type="text" value={props.filters.Address} onChange={updateAddressFilter} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>City</Form.Label>
                {renderSortIcon(props.filters.CitySort, updateCitySort)}
                <Form.Control size="sm" type="text" value={props.filters.City} onChange={updateCityFilter} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Neighborhood</Form.Label>
                {renderSortIcon(props.filters.NeighborhoodSort, updateNeighborhoodSort)}
                <Form.Control size="sm" type="text" value={props.filters.Neighborhood} onChange={updateNeighborhoodFilter} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Size</Form.Label>
                {renderSortIcon(props.filters.SizeSort, updateSizeSort)}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Mint</Form.Label>
                {renderSortIcon(props.filters.MintSort, updateMintSort)}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Boost</Form.Label>
                {renderSortIcon(props.filters.BoostSort, updateBoostSort)}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Status</Form.Label>
                {renderSortIcon(props.filters.StatusSort, updateStatusSort)}
                <Form.Control size="sm" type="text" value={props.filters.Status} onChange={updateStatusFilter} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Collections</Form.Label>
                {renderSortIcon(props.filters.CollectionSort, updateCollectionSort)}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Building</Form.Label>
                {renderSortIcon(props.filters.BuildingSort, updateBuildingSort)}
                <Form.Control size="sm" type="text" value={props.filters.Building} onChange={updateBuildingFilter} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Minted</Form.Label>
                {renderSortIcon(props.filters.MintedSort, updateMintedSort)}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Acquired On</Form.Label>
                {renderSortIcon(props.filters.AcquiredOnSort, updateAcquiredOnSort)}
              </div>
            </th>
            <th>
              <Form.Label></Form.Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.properties
            .filter(p => p.address.includes(props.filters.Address)
              && p.city.toUpperCase().includes(props.filters.City)
              && p.neighborhood.includes(props.filters.Neighborhood)
              && p.status.toUpperCase().includes(props.filters.Status)
              && p.building.toUpperCase().includes(props.filters.Building))
            .sort(sortBuilding)
            .sort(sortCollection)
            .sort(sortStatus)
            .sort(sortMint)
            .sort(sortSize)
            .sort(sortNeighborhood)
            .sort(sortCity)
            .sort(sortAddress)
            .sort(sortMinted)
            .sort(sortAcquiredOn)
            .sort(sortBoost)
            .slice((props.filters.PageNumber - 1) * 100, (props.filters.PageNumber * 100))
            .map((p) => <PropertyTableEntry key={p.propertyId} property={p} collections={props.collections.filter((c) => p.collectionIds.includes(c.id))} getPropertyHistory={props.getPropertyHistory} />)}
        </tbody>
      </Table>
      <div className="page-selector-class">
        <Row>
          <Button className="page-selector-left" onClick={() => onPageClick(0)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
          <Col className="page-selector-center">
            <Row>
              <Col className="page-selector-center-left"><Form.Label>Page</Form.Label></Col>
              <Col className="page-selector-center-right"><Form.Control size="sm" placeholder="Page" type="text" value={props.filters.PageNumber} onChange={updatePageNumber} /></Col>
            </Row>
          </Col>
          <Button className="page-selector-right" onClick={() => onPageClick(1)}><FontAwesomeIcon icon={faArrowRight} /></Button>
        </Row>
      </div>
    </div>
  );
}
