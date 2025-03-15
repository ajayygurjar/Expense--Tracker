const Input = ({ label, id, type, value, onChange }) => {
    return (
      <div>
        <label htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          placeholder=""
        />
      </div>
    );
  };
  
  export default Input;
  