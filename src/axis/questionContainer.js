import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Question from './question';


class questionContainer extends Component {
    constructor(props) {
        super(props);
        this.mouseOverContent = React.createRef();

        this.leaveOf = this.leaveOf.bind(this);
        this.swminOverSpider = this.swminOverSpider.bind(this);
        this.getStyleContent = this.getStyleContent.bind(this);

    }


    leaveOf() {
        if (window.intervalScroll != undefined && window.intervalScroll != null) {
            window.clearInterval(window.intervalScroll);
        }
    }
    componentDidMount() {
        let maxScrollW = this.mouseOverContent.current.scrollWidth - this.mouseOverContent.current.clientWidth;
        let maxScrollH = this.mouseOverContent.current.scrollHeight - this.mouseOverContent.current.clientHeight;
        this.mouseOverContent.current.scrollLeft = maxScrollW != 0 ? (maxScrollW / 2) : 0;
        this.mouseOverContent.current.scrollTop = maxScrollH != 0 ? (maxScrollH / 2) : 0;
    }


    swminOverSpider(e) {

        let x = e.clientX;
        let y = e.clientY;
        let boardwidth = this.mouseOverContent.current.getBoundingClientRect();

        let rangeOutW = boardwidth.width * 0.3;
        let rangeOutH = boardwidth.height * 0.3;

        let isOnSafeAreaWMin = x > (boardwidth.left + (rangeOutW));
        let isOnSafeAreaWMax = x < (boardwidth.right - (rangeOutW));
        let isOnSafeAreaHMin = y > (boardwidth.top + (rangeOutH));
        let isOnSafeAreaHMax = y < (boardwidth.bottom - (rangeOutH));

        let isOnSafeAreaW = isOnSafeAreaWMin && isOnSafeAreaWMax;
        let isOnSafeAreaH = isOnSafeAreaHMin && isOnSafeAreaHMax;

        if (window.intervalScroll != undefined && window.intervalScroll != null) {
            window.clearInterval(window.intervalScroll);
        }

        if (!isOnSafeAreaW || !isOnSafeAreaH) {

            window.intervalScroll = window.setInterval(() => {

                let currentScrollLeft = this.mouseOverContent.current.scrollLeft;
                let currentScrollTop = this.mouseOverContent.current.scrollTop;
                let maxScrollW = this.mouseOverContent.current.scrollWidth - this.mouseOverContent.current.clientWidth;
                let maxScrollH = this.mouseOverContent.current.scrollHeight - this.mouseOverContent.current.clientHeight;

                if (currentScrollLeft > 0 && !isOnSafeAreaWMin) {
                    this.mouseOverContent.current.scrollLeft -= 1;
                } else if (currentScrollLeft < maxScrollW && !isOnSafeAreaWMax) {
                    this.mouseOverContent.current.scrollLeft += 1;
                }

                if (currentScrollTop > 0 && !isOnSafeAreaHMin) {
                    this.mouseOverContent.current.scrollTop -= 1;
                } else if (currentScrollTop < maxScrollH && !isOnSafeAreaHMax) {
                    this.mouseOverContent.current.scrollTop += 1;
                }


            }, 1)

        }
    }

    getStyleContent() {
        const { currentQuest } = this.props;
        let coutItems = currentQuest.length;
        let styleItem = {};
        if (coutItems > 0) {
            let sqrtCountItems = Math.round(Math.sqrt(coutItems));
            styleItem = {
                gridTemplateColumns: `repeat(${sqrtCountItems}, 300px)`,
                gridTemplateRows: `repeat(${sqrtCountItems + 1}, auto)`
            }
        }
        return styleItem;
    }

    render() {
        const { currentQuest } = this.props;

        // let currentQuest = questions.filter(quest => quest.eje == currentAxis);

        return (
            <div className="contentSupperClass" ref={this.mouseOverContent} onMouseLeave={this.leaveOf} onMouseMove={this.swminOverSpider} >
                <div className="supper-grid" style={this.getStyleContent()}>
                    {currentQuest.map((item, itemIndex) => (
                        <Question item={item} itemIndex={itemIndex} currentQuest={currentQuest} />
                    ))}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    questions: state.diagnosis.questions,
    currentQuest: state.diagnosis.questions.filter(quest => quest.eje == state.diagnosis.currentAxis)
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(questionContainer);
