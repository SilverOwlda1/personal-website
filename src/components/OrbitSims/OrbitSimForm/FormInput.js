import classes from "./FormInput.module.css";

const FormInput = (props) => {
  return (
    <div className={classes["form-input"]}>
      <div className={classes["form-input-container"]}>
        <label htmlFor={props.title}>{props.title}</label>
        <input
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={classes["orbit-form-input"]}
          id={props.title}
          type="text"
        ></input>
      </div>
      <p>{props.units}</p>
    </div>
  );
};

export default FormInput;
