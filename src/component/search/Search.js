import React from "react";
import Input from "./../input/Input";

function Search(props) {
  return <Input onChange={props.onChange} config={props.config} />;
}

export default Search;
