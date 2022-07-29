import './styles.css';

interface InputLabelProps {
  label: string;
  labelFor?: string;
  id?: string;
}

const InputLabel = ({ id, label, labelFor }: InputLabelProps): JSX.Element => {
  return (
    <div className='label-wrapper'>
      <label id={id} htmlFor={labelFor}>
        <p>{label}</p>
      </label>
    </div>
  );
};

export default InputLabel;
