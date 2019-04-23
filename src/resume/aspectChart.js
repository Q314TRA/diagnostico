import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PieChart, Pie , Cell } from 'recharts';

import { setResumeCurrentAxis } from '../actions/actions';
import ActiveShape from './activeShape';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class AspectChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }

        this.onPieEnter = this.onPieEnter.bind(this);
        this.selectPie = this.selectPie.bind(this);
    }

    onPieEnter(data, index) {
        this.setState({
            activeIndex: index,
        });
    }

    selectPie(params) {
        const { setResumeCurrentAxis } = this.props;
        setResumeCurrentAxis(params.name);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="content-chart">


                <PieChart width={600} height={500}>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={(props) => <ActiveShape context={{ ...props }} />}
                        data={data}
                        cx={300}
                        cy={250}
                        innerRadius={80}
                        outerRadius={150}
                        fill="#8884d8"
                        onMouseEnter={this.onPieEnter}
                        onClick={this.selectPie}
                    />
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </PieChart>

            </div>
        );
    }


}


const mapStateToProps = state => ({
    currentAxisResume: state.diagnosis.currentAxisResume
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setResumeCurrentAxis
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AspectChart);
