import React, {Component} from "react";
import PropTypes from "prop-types";
import ajaxCall from "../utility/ajaxCall";

class TagSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: this.props.responseData,
            city: this.props.cityData,
            reloadData: this.props.cityData,
            cityNode: null,
            pillFilter: "",

            pageSize: 25,
            startRecord: 1,
            endRecord: 25,
            pageNumber: 1,
            limit: 25,
            offset: 0,
            prevPageToggleable: false,
            nextPageToggleable: true,
        };
    }

    goBackToTagManager = (e) => {
        this.props.goBackTagManagerHandler()
    };

    componentDidMount() {
        // this.fetchDatatable();
    }

    fetchDatatable() {
        let myResolve = responseData => {
            this.setState({
                scans: responseData.data,
            });
        };
        //Parameters
        let queryParams = this.getFilters();
        new Promise(() => {
            ajaxCall
                .get(queryParams)
                .then(responseData => myResolve(responseData));
        });
    }

    updatePagination() {
        this.setState({
            startRecord: this.state.pageNumber * this.state.pageSize - this.state.pageSize + 1,
            endRecord: this.state.pageNumber * this.state.pageSize,
            limit: this.state.pageNumber * this.state.pageSize,
            offset: this.state.pageNumber * this.state.pageSize - this.state.pageSize,
        }, function () {
            this.fetchDatatable();
            this.updatePageButtons();
        });
    }

    updatePageButtons() {
        this.setState({
            prevPageToggleable: this.state.startRecord > 1,
            nextPageToggleable: this.state.endRecord < this.state.totalRecords,
        });
    }

    resetPagination() {
        this.state.pageNumber = 1;
    }

    getFilters() {
        let filters = {};
        filters.limit = this.state.limit;
        filters.offset = this.state.offset;
        filters.order = this.state.order;
        filters.controller = 'tagsummary';
        return filters;
    }
    
    render() {
        return (
            <div>
                <h1>Here is the Tag Summary</h1>
                <button onClick={this.goBackToTagManager.bind(this)}>Go Back</button>
            </div>
        )
    }
}

TagSummary.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func
};
export default TagSummary;
