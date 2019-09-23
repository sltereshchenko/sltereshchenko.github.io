import React, {Component} from "react";
import {connect} from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import ErrorBoundary from "../components/ErrorBoundary";
import {requestRobots, setSearchField} from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch),
    }

};

class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }


    render() {
        const {robots, isPending, searchField, onSearchChange} = this.props
        const filteredRobots = robots.filter(
            robot => robot.name.toLowerCase().includes(searchField.toLowerCase())
        );

        return !isPending ? (
            <div className='tc'>
                <ErrorBoundary>
                    <h1 className='f1'>Tests Results</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
            </div>
        ) : <h1>Loading</h1>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);