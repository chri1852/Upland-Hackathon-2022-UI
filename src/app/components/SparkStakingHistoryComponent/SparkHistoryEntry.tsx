import WebSparkHistory from '../../common/types/WebSparkHistory';

export interface OwnProps {
  sparkHistory: WebSparkHistory,
}

export const SparkHistoryEntry = (props: OwnProps) => {

  return (
    <>
      <tr className="nft-table-entry-centering">
        <td>{props.sparkHistory.name}</td>
        <td>{props.sparkHistory.address}</td>
        <td>{props.sparkHistory.amount}</td>
        <td>{props.sparkHistory.start}</td>
        <td>{props.sparkHistory.end}</td>
        <td>{props.sparkHistory.sparkHours}</td>
      </tr>
    </>
  );
}