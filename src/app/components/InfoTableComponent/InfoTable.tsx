import { Table, Form } from 'react-bootstrap';
import { InfoTableEntry } from './InfoTableEntry';
import { CollatedStatsObject } from '../../common/types/CollatedStatsObject';
import WebCollection from '../../common/types/WebCollection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import StatsFormState from '../../common/types/StatsFormState';
import './infoTable.css'

export interface OwnProps {
  entries: CollatedStatsObject[],
  collections: WebCollection[],
  type: number,
  updateSort: Function,
  statsFormState: StatsFormState
}

export const InfoTable = (props: OwnProps) => {

  const getInitialSort = () => {
    return {
      ...props.statsFormState,
      nameSort: 0,
      citySort: 0,
      totalPropsSort: 0,
      lockedPropsSort: 0,
      unlockedPropsSort: 0,
      unlockedFSAPropsSort: 0,
      forSalePropsSort: 0,
      ownedPropsSort: 0,
      percentMintedSort: 0,
      percentMintedNonFSASort: 0,
      buildingsCountSort: 0,
      percentBuiltSort: 0,
    };
  }

  const updateNameSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.nameSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      nameSort: newValue
    })
  }

  const updateCitySort = (changeEvent: any) => {
    let newValue = (props.statsFormState.citySort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      citySort: newValue
    })
  }

  const updateTotalPropsSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.totalPropsSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      totalPropsSort: newValue
    })
  }

  const updateLockedPropsSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.lockedPropsSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      lockedPropsSort: newValue
    })
  }

  const updateUnlockedNonFSAPropsSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.unlockedPropsSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      unlockedPropsSort: newValue
    })
  }

  const updateUnlockedFSAPropsSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.unlockedFSAPropsSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      unlockedFSAPropsSort: newValue
    })
  }

  const updateForSalePropsSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.forSalePropsSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      forSalePropsSort: newValue
    })
  }

  const updateOwnedPropsSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.ownedPropsSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      ownedPropsSort: newValue
    })
  }

  const updatePercentMintedSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.percentMintedSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      percentMintedSort: newValue
    })
  }

  const updatePercentMintedNonFSASort = (changeEvent: any) => {
    let newValue = (props.statsFormState.percentMintedNonFSASort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      percentMintedNonFSASort: newValue
    })
  }

  const updateBuildingsCountSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.buildingsCountSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      buildingsCountSort: newValue
    })
  }

  const updatePercentBuiltSort = (changeEvent: any) => {
    let newValue = (props.statsFormState.percentBuiltSort + 1) % 3
    props.updateSort({
      ...getInitialSort(),
      percentBuiltSort: newValue
    })
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

  return (
    <div className="bg-light header-min-width">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <div className="info-filter-col"><Form.Label>Id</Form.Label></div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>Name</Form.Label>{renderSortIcon(props.statsFormState.nameSort, updateNameSort)}</div>
            </th>
            { props.type !== 1 && <th><div className="info-filter-col"><Form.Label>City</Form.Label>{renderSortIcon(props.statsFormState.citySort, updateCitySort)}</div></th> }
            <th>
              <div className="info-filter-col"><Form.Label>Total</Form.Label>{renderSortIcon(props.statsFormState.totalPropsSort, updateTotalPropsSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>Locked</Form.Label>{renderSortIcon(props.statsFormState.lockedPropsSort, updateLockedPropsSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>Unlocked Non FSA</Form.Label>{renderSortIcon(props.statsFormState.unlockedPropsSort, updateUnlockedNonFSAPropsSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>Unlocked FSA</Form.Label>{renderSortIcon(props.statsFormState.unlockedFSAPropsSort, updateUnlockedFSAPropsSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>For Sale</Form.Label>{renderSortIcon(props.statsFormState.forSalePropsSort, updateForSalePropsSort)}</div>
            </th>

            <th>
              <div className="info-filter-col"><Form.Label>Owned</Form.Label>{renderSortIcon(props.statsFormState.ownedPropsSort, updateOwnedPropsSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>% Minted</Form.Label>{renderSortIcon(props.statsFormState.percentMintedSort, updatePercentMintedSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>% Minted Non FSA</Form.Label>{renderSortIcon(props.statsFormState.percentMintedNonFSASort, updatePercentMintedNonFSASort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>Buildings</Form.Label>{renderSortIcon(props.statsFormState.buildingsCountSort, updateBuildingsCountSort)}</div>
            </th>
            <th>
              <div className="info-filter-col"><Form.Label>% Built</Form.Label>{renderSortIcon(props.statsFormState.percentBuiltSort, updatePercentBuiltSort)}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map((e) => 
            <InfoTableEntry 
              key={e.id} 
              type={props.type}
              entry={e} 
              collection={props.collections.filter((c) => e.id === c.id)}
          />)}
        </tbody>
      </Table>
    </div>
  );
}
