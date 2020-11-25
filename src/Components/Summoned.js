//import React, {Component} from "react";
import Home from "./Home";

class Summoned extends Home{
    constructor(props) {
        super(props);
        this.state = {
            url : `http://localhost:3000/servants?summoned=1&`,
            page : 1,
            limit : 6
        };
    };
}
export default Summoned
