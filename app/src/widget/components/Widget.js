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
    .then(({ wind, main, weather }) => {
      this.setState({ weatherInfo: { wind, main, weather } });
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

  renderInfo() {
    const { error, weatherInfo } = this.state;

    if (error) {
      return this.renderErrorMessage();
    }

    if (!weatherInfo) {
      return this.renderLoadingInfoMessage();
    }

    return (
      <div>
        {this.renderUnitInfo()}
        {this.renderWindInfo()}
        {this.renderWeatherInfo()}
      </div>
    );
  }

  renderUnitInfo() {
    const { unit } = this.props;
    return (
      <p><strong>Unit Displaying:</strong> {unit}</p>
    );
  }

  renderWindInfo() {
    const { showWind } = this.props;
    const { deg, speed } = this.state.weatherInfo.wind;

    if (!showWind) {
      return null;
    }

    return (
      <p><strong>Wind Info:</strong> Degree: {deg} | Speed: {speed}</p>
    );
  }

  renderWeatherInfo() {
    const { weather } = this.state.weatherInfo;
    const { description, main } = weather[0];

    return (
      <p><strong>Weather Info:</strong> {main} ({ description })</p>
    );
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <h3>{title}</h3>
        {this.renderInfo()}
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
