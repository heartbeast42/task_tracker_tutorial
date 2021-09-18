import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {

  // const onClick = (e) => {
  //   console.log("button clicked", e);
  // }

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        width="110px"
        onClick={onAdd}
        color={showAdd? "red": "green"}
        text={showAdd? "Cancel": "Add Task"}
      />
    </header>
  )
}

Header.defaultProps = {
  title: "Task Tracker",
}

Header.propTypes = {
  title: PropTypes.string,
}

// const headingStyle = {
//   color: "red",
//   backgroundColor: "black"
// }

export default Header
