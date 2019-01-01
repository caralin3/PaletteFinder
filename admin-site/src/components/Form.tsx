import * as React from 'react';
import './Button.css';
import './Form.css';

export interface FormProps {
  buttonText: string;
  className?: string;
  disabled?: boolean;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.SFC<FormProps> = (props) => (
  <div className="form">
    <form className="form_form" onSubmit={props.submit}>
      <div className={`form_fields ${props.className}`}>
        { props.children }
      </div>
      <button
        className={props.disabled ? 'button-disabled' : 'button'}
        disabled={props.disabled}
        type="submit"
      >
        { props.buttonText }
      </button>
    </form>
  </div>
)