import './VerifyProp.css';

export interface VerifyPropProps {
  uplandUsername: string,
  address: string,
  price: number
}

export const VerifyProp = (props: VerifyPropProps) => {

  return (
    <div className="verify-prop-container bg-success shadow-sm">
      <div>Please verify you are {props.uplandUsername} by placing</div>
      <div><u>{props.address}</u> for sale for <u>{props.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</u></div>
      <div>Then enter a password and click Verify</div>
    </div>
  );
}