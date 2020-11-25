import React, {Component} from "react";
import ReactScrollDetect, { DetectSection } from 'react-scroll-detect';
import Page from 'react-page-loading'
import summon from "../functions/summon";
import {Link} from "react-router-dom";
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            servants: [],
            page: 1,
            limit: 6,
            url : `http://localhost:3000/servants?`
        };
    };
    pageInc = () => {
        if (this.state.page < 37) {
            this.setState({
                page: this.state.page + 1
            });
        }
    };
    pageDec = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            })
        }
    };
    limitInc = () => {
        if (this.state.limit < 225){
            this.setState({
                limit: this.state.limit + 6
            })
        }
    };
    loadMore = () =>{
        this.limitInc();
    }
    componentDidMount() {
        fetch(`${this.state.url}_page=${this.state.page}&_limit=${this.state.limit}`)
            .then(response => response.json())
            .then(data => {
                let servants = data.map((servant) =>{
                    return servant
                });
                this.setState({
                    servants: servants,
                    isLoaded : true,
                })
            })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.page + 1 === this.state.page){
            this.setState({
                limit : 6
            });
            this.componentDidMount();
        }
        else if (prevState.page - 1 === this.state.page) {
            this.setState({
                limit : 6
            });
            this.componentDidMount();
        }
        if (prevState.limit + 6 === this.state.limit){
            this.setState({
                page : 1
            });
            this.componentDidMount();
        }
    }

    render(){
        let {error, isLoaded, servants, page} = this.state;
        if(error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Page loader={"spin"} color={"#A9A9A9"} size={10}/>;
        }
        else return (
            <section>
                <button className="pages_nav loading" onClick={this.loadMore} disabled={servants.length < 6 || page !== 1}>Load more</button>
                <div className="navigation">
                    <button className="pages_nav" onClick={this.pageDec}  disabled={page === 1}>❮</button>
                    <button className="pages_nav" onClick={this.pageInc} disabled={page === 37 || servants.length < 6}>❯</button>
                    <span className="page">Page№ {page}</span>
                    </div>
                <ReactScrollDetect triggerPoint='bottom' onChange={(page === 1 || servants.length >6)? this.loadMore : undefined}>
                <ul className="servants-list">
                    {servants.map(servant => (
                    <li key = {servant.id} className="servant">
                        <DetectSection>
                        <Link to={{pathname :'/servant', state:{id : servant.id}}} className = "servant-link">
                            <div className="servant-profile">
                                <div className="servant-pic"><img src={`${process.env.PUBLIC_URL}/servants/${servant.id}.png`} alt={`${servant.nameEN}`} width="200" height="240" /></div>
                                <div className = "servant-info">
                                    <div className="spans">
                                        <span className="name-ru">{servant.nameRU}</span>
                                        <span className="name-jp">Jp: {servant.nameJP}</span>
                                        <span className="name-en">En: {servant.nameEN}</span>
                                        <span className="class">Class: {servant.class} <img src={`${process.env.PUBLIC_URL}/class icons/${servant.class}.png`} width="30" height="30" alt = {`${servant.class}`}/></span>
                                        <span className="id">№{servant.id}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="servant-summon">
                            <button onClick={(e) => summon(servant)} disabled={Boolean(servant.summoned)}>
                                    <span className="animated-word" onClick={(e)=>{
                                        if (e.target.innerText === "Призвать") e.target.innerText = "Призван"
                                    }}>
                                        {Boolean(servant.summoned) ? "Призван" : "Призвать"}
                                    </span>
                            </button>
                        </div>
                        </DetectSection>
                    </li>
                    ))}
                </ul>
                </ReactScrollDetect>
            </section>
        )
    }
}

export default Home
