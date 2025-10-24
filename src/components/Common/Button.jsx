import Loader from "../Loader/Loader";

const Button = ({ type, title, isLoading }) => {
  return (
    <button
      type={type ? type : "button"}
      disabled={isLoading}
      className="button disabled:cursor-not-allowed"
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};

export default Button;
