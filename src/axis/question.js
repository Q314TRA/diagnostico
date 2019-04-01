import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Question extends Component {
    constructor(props) {
        super(props);

        this.mouseOverContent = React.createRef();

        this.getStyleItem = this.getStyleItem.bind(this);
    }


    getStyleItem(index) {
        const { currentQuest } = this.props;

        // let currentQuest = questions.filter(quest => quest.eje == currentAxis);

        let coutItems = currentQuest.length;
        let sqrtCountItems = Math.round(Math.sqrt(coutItems));

        let rowGrid = Math.ceil(index / sqrtCountItems);
        let columnGrid = index - ((rowGrid - 1) * sqrtCountItems);
        return {
            gridColumn: columnGrid,
            gridRow: rowGrid
        }
    }

    render() {
        const { item, itemIndex } = this.props;
        return (
            <div className={`burble ${item.selected ? "selected" : ""}`} style={this.getStyleItem(itemIndex + 1)} onClick={() => {
                item.selected = !item.selected;
                this.forceUpdate();
            }} >
                <span className="quest">
                    {item.action}
                </span>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Question);
