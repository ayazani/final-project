import React, {Component} from "react";
import Page from "react-page-loading";
class Servant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            url: `http://localhost:3000/servants/`
        };
    }
    componentDidMount() {
        let id = this.props.location.state.id;
        fetch(`${this.state.url}${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    servant : data,
                    isLoaded : true
                })
            });

    }

    render() {let {error, isLoaded, servant} = this.state;
        if(error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Page loader={"spin"} color={"#A9A9A9"} size={10}/>;
        }
        else return  (
            <section className="profile">
                <div className="image">
                <img src={`${process.env.PUBLIC_URL}/servants/${servant.id}.png`} height="600" width="500"/>
                </div>
                <div className="info">
                    <span className="name-ru">{servant.nameRU}</span>
                    <span className="name-en">En: {servant.nameEN}</span>
                    <span className="name-jp">Jp: {servant.nameJP}</span>
                    <span className="id">№{servant.id}</span>
                    <span className="status">Статус: {Boolean(servant.summoned) ? "Призван" : "Не призван"}</span>
                    <span className="date-summon">{Boolean(servant.summoned) ? `Дата призыва: ${servant.date}` : ""}</span>
                    <span className="class">Класс: {servant.class} <img src={`${process.env.PUBLIC_URL}/class icons/${servant.class}.png`} width="30" height="30" /></span>
                    <p className="about">
                        <h4>О персонаже:</h4>
                        {servant.info}
                    </p>
                </div>
            </section>
        )

    }
}
export default Servant
