import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RenderList from './RenderList'
import Charts from './Charts';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 0
        }
        
    }

    loading = () => {
        this.setState({
            loading: 1
        })
    }

    render() {
        
        return (
            <React.Fragment>
                
                <Charts/>
                <RenderList/>
                
            </React.Fragment>
            
        );
    }
}

export default Dashboard;