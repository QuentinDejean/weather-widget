/* global navigator:true */

import React          from 'react';
import positionUtils  from '../utils/positionUtils';
import unitValidation from '../utils/validationUtils';

class WeatherWidget extends React.Component {

  constructor() {
    super();

    this.state = {
      weatherInfo: null,
      error: null
    };
  }

  componentDidMount() {
    const { unit } = this.props;
    positionUtils.getWeatherInfo(unit)
    .then(({ wind }) => {
      this.setState({ weatherInfo: { wind } });
    })
    .catch(() => {
      this.setState({
        error: 'An error occured while trying to fetch weather info. Please contact support'
      });
    });
  }

  renderErrorMessage() {
    const { error } = this.state;
    return (
      <div>
       An error occured while fetching your widget info: { error }
      </div>
    );
  }

  renderLoadingInfoMessage() {
    return (
      <div>
        Loading weather information...
      </div>
    );
  }

  renderWeatherInfo() {
    const { error, weatherInfo } = this.state;

    if (error) {
      return this.renderErrorMessage();
    }

    if (!weatherInfo) {
      return this.renderLoadingInfoMessage();
    }

    const { deg, speed } = this.state.weatherInfo.wind;
    return (
      <div>
        <div>Degree: {deg}</div>
        <div>Speed: {speed}</div>
      </div>
    );
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <h3>{title}</h3>
        {this.renderWeatherInfo()}
      </div>
    );
  }
}

WeatherWidget.propTypes = {
  showWind: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  unit: React.PropTypes.oneOf(unitValidation)
};

export default WeatherWidget;
