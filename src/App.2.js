import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from "./questions.json";
import { PieChart, Pie, Sector } from 'recharts';


const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Aspecto ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Pct ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


let intervalScroll = null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAxis: "",
      questions: questions,
      resumeView: false,
      activeIndex: 0
    }

    this.mouseOverContent = React.createRef();

    this.getStyleContent = this.getStyleContent.bind(this);
    this.getStyleItem = this.getStyleItem.bind(this);
    this.swminOverSpider = this.swminOverSpider.bind(this);
    this.setcurrentAxis = this.setcurrentAxis.bind(this);
    this.leaveOf = this.leaveOf.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.onPieEnter = this.onPieEnter.bind(this);
    this.getResourceBatery = this.getResourceBatery.bind(this);

  }

  getStyleContent() {
    let currentQuest = this.state.questions.filter(quest => quest.eje == this.state.currentAxis);

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

  getStyleItem(index) {
    let currentQuest = this.state.questions.filter(quest => quest.eje == this.state.currentAxis);

    let coutItems = currentQuest.length;
    let sqrtCountItems = Math.round(Math.sqrt(coutItems));

    let rowGrid = Math.ceil(index / sqrtCountItems);
    let columnGrid = index - ((rowGrid - 1) * sqrtCountItems);
    // debugger;
    return {
      gridColumn: columnGrid,
      gridRow: rowGrid
    }
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

    // console.log("relacionX",  x, "min-", (boardwidth.left + (rangeOutW )) , "-max-", (boardwidth.right - (rangeOutW )));
    // console.log("relacionY",  y, "min-", (boardwidth.top + (rangeOutH )) , "-max-", (boardwidth.bottom - (rangeOutH )));

    if (intervalScroll != undefined && intervalScroll != null) {
      window.clearInterval(intervalScroll);
    }

    if (!isOnSafeAreaW || !isOnSafeAreaH) {

      intervalScroll = window.setInterval(() => {

        let currentScrollLeft = this.mouseOverContent.current.scrollLeft;
        let currentScrollTop = this.mouseOverContent.current.scrollTop;
        let maxScrollW = this.mouseOverContent.current.scrollWidth - this.mouseOverContent.current.clientWidth;
        let maxScrollH = this.mouseOverContent.current.scrollHeight - this.mouseOverContent.current.clientHeight;
        // debugger;
        if (currentScrollLeft <= 0 && !isOnSafeAreaWMin) {
          // window.clearInterval(intervalScroll);
        } else if (currentScrollLeft > 0 && !isOnSafeAreaWMin) {
          this.mouseOverContent.current.scrollLeft -= 1;
        } else if (currentScrollLeft < maxScrollW && !isOnSafeAreaWMax) {
          this.mouseOverContent.current.scrollLeft += 1;
        }

        if (currentScrollTop <= 0 && !isOnSafeAreaHMin) {
          // window.clearInterval(intervalScroll);
        } else if (currentScrollTop > 0 && !isOnSafeAreaHMin) {
          this.mouseOverContent.current.scrollTop -= 1;
        } else if (currentScrollTop < maxScrollH && !isOnSafeAreaHMax) {
          this.mouseOverContent.current.scrollTop += 1;
        }

        // if (!isOnSafeAreaW)
        //   this.mouseOverContent.current.scrollLeft += x > (boardwidth.left + (rangeOutW)) ? 20 : -20;

        // if (!isOnSafeAreaH)
        //   this.mouseOverContent.current.scrollTop += y > (boardwidth.top + (rangeOutH)) ? 20 : -20;


      }, 1)
      // debugger;

      // console.group("coords")
      // console.log("e.clientX", x);
      // console.log("e.clientY", y);
      // console.log(boardwidth.top, boardwidth.right, boardwidth.bottom, boardwidth.left);
      // console.log(boardwidth);
      // console.groupEnd();

    }



    // boardwidth.top
    // boardwidth.right

    // boardwidth.bottom
    // boardwidth.left

  }

  setcurrentAxis(axis) {
    this.setState({
      currentAxis: axis
    })

  }

  leaveOf() {
    if (intervalScroll != undefined && intervalScroll != null) {
      window.clearInterval(intervalScroll);
    }
  }

  getInitialState() {
    return {
      activeIndex: 0,
    };
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  gestStatusResume() {

    let resumeStatusAxis = this.state.questions.reduce((a, b, i) => {

      if (a[b.eje] == undefined || a[b.eje] == null)
        a[b.eje] = { count: 0, checked: 0 };

      if (b.selected)
        a[b.eje].checked += 1;

      a[b.eje].count += 1;

      return a;
    }, {});


    let resumeStatusAxisAspectChart = this.state.questions.reduce((a, b, i) => {

      if (a[b.eje] == undefined || a[b.eje] == null)
        a[b.eje] = {};


      if (b.selected) {
        if (a[b.eje][b.aspect] == undefined || a[b.eje][b.aspect] == null)
          a[b.eje][b.aspect] = 0;

        a[b.eje][b.aspect] += 1;
      }

      return a;
    }, {});


    let resumeStatusAxisAspectChartPendings = this.state.questions.reduce((a, b, i) => {
      if (a[b.eje] == undefined || a[b.eje] == null)
        a[b.eje] = {};

      let _aspects = Object.keys(resumeStatusAxisAspectChart[b.eje]);

      if (_aspects.indexOf(b.aspect) == -1)
        a[b.eje][b.aspect] = true;
      return a;
    }, {});




    // { name: 'Group B', value: 300 }

    return {
      AMBIENTAL: {
        statusPercent: Math.round((resumeStatusAxis["AMBIENTAL"].checked * 100) / resumeStatusAxis["AMBIENTAL"].count),
        resource: this.getResourceBatery(resumeStatusAxis["AMBIENTAL"]),
        aspects: Object.keys(resumeStatusAxisAspectChart["AMBIENTAL"]).map(key => ({ name: key, value: resumeStatusAxisAspectChart["AMBIENTAL"][key] })),
        aspectsPendings: Object.keys(resumeStatusAxisAspectChartPendings["AMBIENTAL"])
      },
      ECONOMICO: {
        statusPercent: Math.round((resumeStatusAxis["ECONOMICO"].checked * 100) / resumeStatusAxis["ECONOMICO"].count),
        resource: this.getResourceBatery(resumeStatusAxis["ECONOMICO"]),
        aspects: Object.keys(resumeStatusAxisAspectChart["ECONOMICO"]).map(key => ({ name: key, value: resumeStatusAxisAspectChart["ECONOMICO"][key] })),
        aspectsPendings: Object.keys(resumeStatusAxisAspectChartPendings["ECONOMICO"])
      },
      SOCIAL: {
        statusPercent: Math.round((resumeStatusAxis["SOCIAL"].checked * 100) / resumeStatusAxis["SOCIAL"].count),
        resource: this.getResourceBatery(resumeStatusAxis["SOCIAL"]),
        aspects: Object.keys(resumeStatusAxisAspectChart["SOCIAL"]).map(key => ({ name: key, value: resumeStatusAxisAspectChart["SOCIAL"][key] })),
        aspectsPendings: Object.keys(resumeStatusAxisAspectChartPendings["SOCIAL"])
      }
    }
  }

  getResourceBatery(resource) {
    let checked = resource.checked;
    let count = resource.count;

    let _media = count / 6;

    let resourceNum = Math.floor(checked / _media);

    return `batery_${resourceNum == 0 ? 1 : resourceNum}.png`
  }



  render() {

    let currentQuest = this.state.questions.filter(quest => quest.eje == this.state.currentAxis);
    let statusResume = this.gestStatusResume();

    return (
      <div className="App" >

        {this.state.resumeView &&

          <div className="resume-content">

            <h1>Resumen diagnostico</h1>

            {/* INCIO AMBIENTAL */}
            <div className="item-resume">
              <h2 className="AMBIENTAL">Ambiental</h2>
              <div className="item-status-info" >
                <div className="item-status">
                  <img src={statusResume["AMBIENTAL"].resource}></img>
                  <span>{statusResume["AMBIENTAL"].statusPercent}%</span>
                </div>
                <div className="item-chat-aspects">
                  <PieChart width={700} height={400}>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      data={statusResume["AMBIENTAL"].aspects}
                      cx={300}
                      cy={200}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      onMouseEnter={this.onPieEnter}
                    />
                  </PieChart>
                </div>
                <div className="item-aspects-reveal">
                  <h3>Aspectos faltantes</h3>
                  <div className="item-aspects-content">

                    {statusResume["AMBIENTAL"].aspectsPendings.map((_aspect) => (
                      <div className="item-aspects-item">{_aspect}</div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
            {/* FIN AMBIENTAL */}

            {/* INCIO ECONOMICO */}
            <div className="item-resume">
              <h2 className="ECONOMICO">Economico</h2>
              <div className="item-status-info" >
                <div className="item-status">
                  <img src={statusResume["ECONOMICO"].resource}></img>
                  <span>{statusResume["ECONOMICO"].statusPercent}%</span>
                </div>
                <div className="item-chat-aspects">
                  <PieChart width={700} height={400}>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      data={statusResume["ECONOMICO"].aspects}
                      cx={300}
                      cy={200}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      onMouseEnter={this.onPieEnter}
                    />
                  </PieChart>
                </div>
                <div className="item-aspects-reveal">
                  <h3>Aspectos faltantes</h3>
                  <div className="item-aspects-content">

                    {statusResume["ECONOMICO"].aspectsPendings.map((_aspect) => (
                      <div className="item-aspects-item">{_aspect}</div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
            {/* FIN ECONOMICO */}

            {/* INCIO SOCIAL */}
            <div className="item-resume">
              <h2 className="SOCIAL">Social</h2>
              <div className="item-status-info" >
                <div className="item-status">
                  <img src={statusResume["SOCIAL"].resource}></img>
                  <span>{statusResume["SOCIAL"].statusPercent}%</span>
                </div>
                <div className="item-chat-aspects">
                  <PieChart width={700} height={400}>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      data={statusResume["SOCIAL"].aspects}
                      cx={300}
                      cy={200}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      onMouseEnter={this.onPieEnter}
                    />
                  </PieChart>
                </div>
                <div className="item-aspects-reveal">
                  <h3>Aspectos faltantes</h3>
                  <div className="item-aspects-content">

                    {statusResume["SOCIAL"].aspectsPendings.map((_aspect) => (
                      <div className="item-aspects-item">{_aspect}</div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
            {/* FIN SOCIAL */}


          </div>

        }


        {this.state.currentAxis && !this.state.resumeView &&
          <h1>{this.state.currentAxis}</h1>
        }

        {!this.state.resumeView &&

          <div className="contentSupperClass" ref={this.mouseOverContent} onMouseLeave={this.leaveOf} onMouseMove={this.swminOverSpider} >
            <div className="supper-grid" style={this.getStyleContent()}>


              {currentQuest.length == 0 &&
                <div className="home-message">
                  <h1>BIOTICA</h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
              }

              {currentQuest.map((item, itemIndex) => (
                <div className={`burble ${item.selected ? "selected" : ""}`} style={this.getStyleItem(itemIndex + 1)} onClick={() => {
                  item.selected = !item.selected;
                  this.forceUpdate();
                }} >
                  <span className="quest">
                    {item.action}
                  </span>
                </div>
              ))}

            </div>

          </div>

        }

        {/* <div className="content-panel-cm fadeout"></div> */}

        {!this.state.resumeView &&
          <div className="content-panel-cm content-panel">
            <div className="item" onClick={() => this.setcurrentAxis("ECONOMICO")} >
              <img src="coin.svg"></img>
              {/* <span>Economico</span> */}
            </div>
            <div className="item" onClick={() => this.setcurrentAxis("SOCIAL")} >
              <img src="user.svg"></img>
              {/* <span>Social</span> */}
            </div>
            <div className="item" onClick={() => this.setcurrentAxis("AMBIENTAL")} >
              <img src="leaf.svg"></img>
              {/* <span>Ambiental</span> */}
            </div>

          </div>
        }

        {!this.state.resumeView &&
          <div>
            <div className="doot-global home" onClick={() => {
              this.setState({
                currentAxis: ""
              })
            }}>
              <img src="house.png"></img>
            </div>

            <div className="doot-global finish" onClick={() => {
              this.setState({
                resumeView: true
              })
            }}>
              <img src="flag.png"></img>
            </div>
          </div>
        }

        {/* <div className="content-panel-cm content-panel-zone">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div> */}


      </div>
    );
  }
}

export default App;
