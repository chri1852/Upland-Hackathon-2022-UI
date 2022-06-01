import { Table, Form, Row, Col, Button  } from 'react-bootstrap';
import { SparkHistoryEntry } from './SparkHistoryEntry';
import WebSparkHistory from '../../common/types/WebSparkHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../../areas/forSaleProperties/forSaleProperties.css';
import ProfileSparkHistoryFilters from '../../common/types/ProfileSparkHistoryFilters';
import { da } from 'date-fns/locale';

export interface OwnProps {
  sparkHistory: WebSparkHistory[],
  updateFilters: Function,
  filters: ProfileSparkHistoryFilters
}

export const SparkStakingHistoryComponent = (props: OwnProps) => {
  const distantFuture = new Date(8640000000000000);

  const getInitialSortFilters = () => {
    return {
      ...props.filters,   
      nameSort: 0,
      addressSort: 0,
      amountSort: 0,
      startSort: 0,
      endSort: 0,
      sparkHoursSort: 0
    };
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
    if (direction === 0 && props.filters.pageNumber > 1) {
      props.updateFilters({
        ...props.filters,
        pageNumber: props.filters.pageNumber - 1
      })
    } else if (direction === 1 && props.filters.pageNumber < Math.ceil(props.sparkHistory.length / 100)) {
      props.updateFilters({
        ...props.filters,
        pageNumber: props.filters.pageNumber + 1
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
      pageNumber: parsedNum
    })
  }

  const updateFilterBox = (changeEvent: React.ChangeEvent<any>, varibleName: string) => {
    props.updateFilters({
      ...props.filters,
      [varibleName]: changeEvent.currentTarget.value.toUpperCase()
    } as ProfileSparkHistoryFilters)
  } 

  const updateSort = (varibleName: string, currentValue: number) => {
    let newValue = (currentValue + 1) % 3
    props.updateFilters({
      ...getInitialSortFilters(),
      [varibleName]: newValue
    })
  }

  const sortAllValues = (a: WebSparkHistory, b: WebSparkHistory) => {
    let sortVal = 0;
    let aVal: any;
    let bVal: any;

    if (props.filters.nameSort !== 0) {
      sortVal = props.filters.nameSort;
      aVal = a.name;
      bVal = b.name;
    } else if (props.filters.addressSort !== 0) {
      sortVal = props.filters.addressSort;
      aVal = a.address;
      bVal = b.address;
    } else if (props.filters.amountSort !== 0) {
      sortVal = props.filters.amountSort;
      aVal = a.amount;
      bVal = b.amount;
    } else if (props.filters.startSort !== 0) {
      sortVal = props.filters.startSort;
      aVal = a.start;
      bVal = b.start;
    } else if (props.filters.endSort !== 0) {
      sortVal = props.filters.endSort;
      aVal = new Date(!a.end ? distantFuture : a.end);
      bVal = new Date(!b.end ? distantFuture : b.end);
    } else if (props.filters.sparkHoursSort !== 0) {
      sortVal = props.filters.sparkHoursSort;
      aVal = a.sparkHours;
      bVal = b.sparkHours;
    }
    
    if (sortVal === 1)
    {
      return aVal > bVal ? 1 : -1;
    } else if (sortVal === 2) {
      return bVal > aVal ? 1 : -1;
    }

    return 0;
  }

  const getFilteredAndSortedArray = () => {
    let array = props.sparkHistory
      .filter(p => p.name.toUpperCase().includes(props.filters.name)
        && p.address.toUpperCase().includes(props.filters.address))
    return array
      .sort(sortAllValues)
      .slice((props.filters.pageNumber - 1) * 100, (props.filters.pageNumber * 100));
  }

  return (
    <div className="bg-light header-min-width">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <div className="filter-col">
                <Form.Label>Name</Form.Label>
                {renderSortIcon(props.filters.nameSort, () => updateSort("nameSort", props.filters.nameSort))}
                <Form.Control size="sm" type="text" value={props.filters.name} onChange={(event) => updateFilterBox(event, "name")} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Address</Form.Label>
                {renderSortIcon(props.filters.addressSort, () => updateSort("addressSort", props.filters.addressSort))}
                <Form.Control size="sm" type="text" value={props.filters.address} onChange={(event) => updateFilterBox(event, "address")} />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Amount</Form.Label>
                {renderSortIcon(props.filters.amountSort, () => updateSort("amountSort", props.filters.amountSort))}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Start</Form.Label>
                {renderSortIcon(props.filters.startSort, () => updateSort("startSort", props.filters.startSort))}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>End</Form.Label>
                {renderSortIcon(props.filters.endSort, () => updateSort("endSort", props.filters.endSort))}
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>SparkHours</Form.Label>
                {renderSortIcon(props.filters.sparkHoursSort, () => updateSort("sparkHoursSort", props.filters.sparkHoursSort))}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.sparkHistory && getFilteredAndSortedArray().map((s) => 
            <SparkHistoryEntry 
              key={s.id} 
              sparkHistory={s} 
          />)}
        </tbody>
      </Table>
      <div className="page-selector-class">
        <Row>
          <Button className="page-selector-left" onClick={() => onPageClick(0)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
          <Col className="page-selector-center">
            <Row>
              <Col className="page-selector-center-left"><Form.Label>Page</Form.Label></Col>
              <Col className="page-selector-center-right"><Form.Control size="sm" placeholder="Page" type="text" value={props.filters.pageNumber} onChange={updatePageNumber} /></Col>
            </Row>
          </Col>
          <Button className="page-selector-right" onClick={() => onPageClick(1)}><FontAwesomeIcon icon={faArrowRight} /></Button>
        </Row>
      </div>
    </div>
  );
}
