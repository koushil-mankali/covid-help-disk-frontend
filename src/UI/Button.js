import "./button.css";

let Button = (props) => {
  const propBtn = props.className ? props.className : "";
  return (
    <div className={`btn ${propBtn}`} onClick={props.onClick ? props.onClick : null }>
      {props.children}
    </div>
  );
};

export default Button;
