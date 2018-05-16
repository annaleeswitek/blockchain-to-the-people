import React from 'react';
import {
  Step,
  Stepper,
  StepContent, 
  StepLabel,
  RaisedButton, 
  FlatButton 
} from 'material-ui';
import { InstallMetamask, VotingBooth } from './index';
import {Link} from 'react-router-dom'; 

class UserHorizontalStepper extends React.Component {

  constructor(props) {
      super(props); 
      this.state = {
        finished: false,
        stepIndex: 0,
        components: [<InstallMetamask />, <VotingBooth/>] 
      };

      this.getStepContent = this.getStepContent.bind(this); 
  }

  

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Download MetaMask.';
      case 1:
        return 'Cast your vote. Make sure to include your code, or the vote will not go through! Also, you can only cast your vote once for a single candidate, so please be certain of your choice before voting.'; 
    }
  }


  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Download MetaMask.
            </StepLabel>
          
          </Step>
          <Step>
            <StepLabel>Cast your vote. 
            </StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div>{ this.state.components[stepIndex]}</div> 
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 1 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserHorizontalStepper;