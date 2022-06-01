import './CollectionSquareComponent.css';
import '../../common/styles/colors.css'
import WebCollection from '../../common/types/WebCollection';
import { useState } from 'react';
import { CollectionSquareInfo } from './CollectionSquareInfoComponent';

export interface OwnProps {
  collection: WebCollection,
  displayRight: boolean
}

export const CollectionSquare = (props: OwnProps) => {

  const [displayInfo, setDisplayInfo] = useState(false);

  const hoverHandler = () => {
    setDisplayInfo(true);
  }

  const outHandler = () => {
    setDisplayInfo(false);
  }

  const getBackgroundColor = () => {
    switch(props.collection.category) {
      case 1:
        return "color-collection-standard";
      case 2:
        return "color-collection-limited";
      case 3:
        return "color-collection-exclusive";
      case 4:
        return "color-collection-rare";
      case 5:
        return "color-collection-ultrarare";
      default:
        return "";
    }
  }

  return (
    <div className="collection-wrapper">
      <div className={"collection-square " + getBackgroundColor()} onMouseOver={hoverHandler} onMouseOut={outHandler}/>
      <CollectionSquareInfo collection={props.collection} displayRight={props.displayRight} displayInfo={displayInfo}/>
    </div>
  );
}