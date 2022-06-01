import { CollatedStatsObject } from '../../common/types/CollatedStatsObject';
import WebCollection from '../../common/types/WebCollection';
import { cities } from '../../common/enums/cityEnum';
import { CollectionSquare } from '../CollectionSquareComponent/CollectionSquareComponent';

export interface OwnProps {
  entry: CollatedStatsObject,
  type: number,
  collection: WebCollection[],
}

export const InfoTableEntry = (props: OwnProps) => {

  const getNameValue = () => {
    switch(props.type) {
      case 1:
      case 2:
      case 3:
        return (<td>{props.entry.name}</td>);
      case 4:
        return (<td>{<CollectionSquare collection={props.collection[0]} displayRight={true}/>} {props.entry.name}</td>);
    }
  }

  return (
    <tr>
      <td>{props.entry.id}</td>
      {getNameValue()}
      {props.type !== 1 && <td>{cities.filter((c) => c.key === props.entry.cityId)[0].value}</td>}
      <td>{props.entry.totalProps}</td>
      <td>{props.entry.lockedProps}</td>
      <td>{props.entry.unlockedNonFSAProps}</td>
      <td>{props.entry.unlockedFSAProps}</td>
      <td>{props.entry.forSaleProps}</td>
      <td>{props.entry.ownedProps}</td>
      <td>{props.entry.percentMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} %</td>
      <td>{props.entry.percentNonFSAMinted.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} %</td>
      <td>{props.entry.buildingCount}</td>
      <td>{props.entry.percentBuilt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} %</td>
    </tr>
  );
}