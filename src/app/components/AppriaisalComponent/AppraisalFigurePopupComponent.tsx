import React from 'react';
import { connect } from 'react-redux';
import { Table} from 'react-bootstrap'
import { PropertyAppraisalFigure } from '../../common/types/AppraisalResults';
import './AppraisalComponent.css';


interface OwnProps {
  figures: PropertyAppraisalFigure[],
  display: boolean
}

export const AppraisalFigurePopupComponent = (props: OwnProps) => {

  const formatNumberToUPXString = (input: number) => {
    return input.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " upx";
  }

  if (!props.display)
  {
    return (<></>);
  }
  return (
    <div className="bg-light appraisal-figure-display">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <h6>Type</h6>
            </th>
            <th>
              <h6>Value</h6>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.figures.map((f) => <tr><td>{f.type}</td><td>{formatNumberToUPXString(f.value)}</td></tr>)}
        </tbody>
      </Table>
    </div>
  );
}

export default connect(null, null)(AppraisalFigurePopupComponent);