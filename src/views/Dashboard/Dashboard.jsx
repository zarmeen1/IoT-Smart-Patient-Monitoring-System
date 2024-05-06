import React from 'react';
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import { lineChart } from "../../variables/charts";

import {
  getFutureStressData,
  getMoodData,
  getRuminationData,
  getSleepData
} from "../../services/data";

import dashboardStyle from "../../assets/jss/modules/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      stressData: { labels: [], series: [] },
      moodData: { labels: [], series: [] },
      ruminationData: { labels: [], series: [] },
      sleepData: { labels: [], series: [] },
      // currentTime: new Date() 
    };

    getFutureStressData().then(data => {
      this.setState({ stressData: data });
    });

    getMoodData().then(data => {
      this.setState({ moodData: data });
    });

    getRuminationData().then(data => {
      this.setState({ ruminationData: data });
    });

    getSleepData().then(data => {
      this.setState({ sleepData: data });
    });
  };

  // componentDidMount() {
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     1000
  //   );
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  // tick() {
  //   this.setState({
  //     currentTime: new Date()
  //   });
  // }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getAvg(series) {
    if (series[0]) {
      const arr = series[0];
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i], 10);
      }
      return sum / arr.length;
    }
  }

  getDiff(series) {
    if (series[0]) {
      const arr = series[0];
      const first = arr[0];
      const last = arr[arr.length - 1];
      const diff = ((last - first) / first) * 100;
      return diff.toFixed(2);
    }
    return "N/A";
  }

  render() {
    const { classes } = this.props;
    const { stressData, moodData } = this.state;
    const currentTime = new Date();
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>thermostat</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Temperature</p>
                <h3 className={classes.cardTitle}>
                  {this.getAvg(stressData.series)}°F
                </h3>
              </CardHeader>
              <CardFooter stats>
                This is the patient's current temperature in Fahrenheit
                <div className={classes.stats}>
                  <AccessTime /> updated {currentTime.toLocaleTimeString()}
                </div>
                {/* <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                </div> */}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>favorite</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Pulse</p>
                <h3 className={classes.cardTitle}>
                  70 bpm
                  {/* {this.getAvg(moodData.series)} */}
                </h3>
              </CardHeader>
              <CardFooter stats>
                This is the patient's pulse in beats per minute (bpm)
                <div className={classes.stats}>
                  <AccessTime /> updated {currentTime.toLocaleTimeString()}
                </div>
                {/* <div className={classes.stats}>
                  <DateRange />
                  Last 5 Months
                </div> */}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={stressData}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Temperature</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {this.getDiff(stressData.series)}%
                  </span>{" "}
                  increase in 5 months.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated at {currentTime.toLocaleTimeString()}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={moodData}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Pulse</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {this.getDiff(moodData.series)}%
                  </span>{" "}
                  increase in 5 months.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated at {currentTime.toLocaleTimeString()}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
