import './VerifyError.css';

export interface VerifyErrorProps {
  message: string,
}

export const VerifyError = (props: VerifyErrorProps) => {

  return (
    <div className="verify-prop-container bg-danger shadow-sm">
      <div>{props.message}</div>
    </div>
  );
}