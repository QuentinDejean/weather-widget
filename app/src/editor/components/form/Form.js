import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

import './form.css';

const unitType = {
  METRIC: 'metric',
  IMPERIAL: 'imperial'
};

class Form extends React.Component {

  constructor() {
    super();

    this.state = {
      title: 'Simple Text',
      isValid: true
    };

    this.fields = {
      inputTitle: this.state.title,
      inputUnit: unitType.METRIC,
      inputWind: 'show'
    };

    this.initMethods();
  }

  shouldComponentUpdate(nextProps, { title, isValid }) {
    return this.state.title !== title
           || this.state.isValid !== isValid;
  }

  onMetricChange() {
    const { inputUnit } = this.fields;
    const { METRIC, IMPERIAL } = unitType;
    this.fields.inputUnit = inputUnit === METRIC ? IMPERIAL : METRIC;
  }

  onTitleChange({ target: { value } }) {
    this.fields.inputTitle = value;
    this.setState({
      title: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const isValid = this.validateForm();

    if (isValid !== this.state.isValid) {
      this.setState({
        isValid
      });
    }

    if (isValid) {
      this.props.onWidgetCreated(this.fields);
    }
  }

  onInputWindCheck(e, isChecked) {
    this.fields.inputWind = isChecked;
  }

  validateForm() {
    let isValid = true;

    Object.keys(this.fields).forEach((key) => {
      if (!this.fields[key]) {
        isValid = false;
      }
    });

    return isValid;
  }

  initMethods() {
    this.onInputWindCheck = this.onInputWindCheck.bind(this);
    this.onMetricChange = this.onMetricChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  render() {
    const { isValid, title } = this.state;
    const { inputUnit } = this.fields;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h3>Please start by choosing your configuration</h3>
          <div className="form-section">
            <TextField
              errorText={!isValid && !title ? 'This field is required' : null}
              floatingLabelText="Widget Title"
              hintText="Will appear at the top of the widget"
              onChange={this.onTitleChange}
              value={title}
            />
          </div>

          <div className="form-section">
            <Checkbox
              defaultChecked
              label="Show Wind"
              onCheck={this.onInputWindCheck}
            />
          </div>

          <div className="form-section">
            <RadioButtonGroup
              name="unit"
              defaultSelected={inputUnit}
              onChange={this.onMetricChange}
            >
              <RadioButton
                value="metric"
                label="Metric"
              />
              <RadioButton
                value="imperial"
                label="Imperial"
              />
            </RadioButtonGroup>

            <RaisedButton
              label="Submit"
              primary
              type="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  onWidgetCreated: React.PropTypes.func.isRequired
};

export default Form;
