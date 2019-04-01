import React, { Component } from 'react';
import ItemResume from './itemResume';

class ContentResume extends Component {


    constructor(props) {
        super(props);
        this.gestStatusResume = this.gestStatusResume.bind(this);
        this.getResourceBatery = this.getResourceBatery.bind(this);
    }


    gestStatusResume() {
        const { questions } = this.props;

        let resumeStatusAxis = questions.reduce((a, b, i) => {
            if (a[b.eje] == undefined || a[b.eje] == null)
                a[b.eje] = { count: 0, checked: 0 };

            if (b.selected)
                a[b.eje].checked += 1;

            a[b.eje].count += 1;
            return a;
        }, {});


        let resumeStatusAxisAspectChart = questions.reduce((a, b, i) => {
            if (a[b.eje] == undefined || a[b.eje] == null)
                a[b.eje] = {};

            if (b.selected) {
                if (a[b.eje][b.aspect] == undefined || a[b.eje][b.aspect] == null)
                    a[b.eje][b.aspect] = 0;

                a[b.eje][b.aspect] += 1;
            }
            return a;
        }, {});


        let resumeStatusAxisAspectChartPendings = questions.reduce((a, b, i) => {
            if (a[b.eje] == undefined || a[b.eje] == null)
                a[b.eje] = {};

            let _aspects = Object.keys(resumeStatusAxisAspectChart[b.eje]);

            if (_aspects.indexOf(b.aspect) == -1)
                a[b.eje][b.aspect] = true;
            return a;
        }, {});

        return Object.keys(resumeStatusAxis).map((axisName) => {
            return {
                axisName,
                statusPercent: Math.round((resumeStatusAxis[axisName].checked * 100) / resumeStatusAxis[axisName].count),
                resource: this.getResourceBatery(resumeStatusAxis[axisName]),
                aspects: Object.keys(resumeStatusAxisAspectChart[axisName]).map(key => ({ name: key, value: resumeStatusAxisAspectChart[axisName][key] })),
                aspectsPendings: Object.keys(resumeStatusAxisAspectChartPendings[axisName])
            }
        });
    }

    getResourceBatery(resource) {
        let checked = resource.checked;
        let count = resource.count;

        let _media = count / 6;

        let resourceNum = Math.floor(checked / _media);

        return `batery_${resourceNum == 0 ? 1 : resourceNum}.png`
    }

    render() {
      return  (<div className="resume-content">
            <h1>Resumen diagnostico</h1>
            {this.gestStatusResume().map((item) => <ItemResume resumeAxis={item} />)}
        </div>)
    }

}

export default ContentResume;