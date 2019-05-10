import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearReportStatus } from '../actions/actions';

class ReportResumeDownload extends Component {


    constructor(props) {
        super(props);
        this.downloadReport = React.createRef();
    }

    componentDidMount() {
        const { clearReportStatus } = this.props;
        this.downloadReport.current.click();
        clearReportStatus();
    }

    render() {
        const { pathReport } = this.props;
        return (<a ref={this.downloadReport} href={pathReport} style={{ display: "none" }} target="_blank"></a>)
    }

}

const mapStateToProps = state => ({
    pathReport: state.diagnosis.pathReport
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearReportStatus
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ReportResumeDownload);
