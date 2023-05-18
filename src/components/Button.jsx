import styled from "styled-components";
import '../App.css'
export default styled.button`
  box-shadow: none;
  width: 150px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid white;
  font-family: Garamond;
  font-size: 17px;
  margin-left: 15px;

  &:hover {
    background-color: #A0C1D1;
    color:#5A7D7C ;
  }
`;
export const Button = (props) => {
    return(
        <button className={"bg-purple-300 px-5 py-2 rounded hover:bg-purple-500 transition"} onClick={props.onClick}>{props.children}</button>
    );
}


