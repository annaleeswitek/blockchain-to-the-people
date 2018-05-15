import React from 'react';
import {
  Step,
  Stepper,
  StepContent, 
  StepLabel,
  RaisedButton, 
  FlatButton 
} from 'material-ui';
import { StepperUser, VotingBooth } from './index';
import {Link} from 'react-router-dom'; 

class UserHorizontalStepper extends React.Component {

  constructor(props) {
      super(props); 
      this.state = {
        finished: false,
        stepIndex: 0,
        components: [null, <VotingBooth/>, null] 
      };

      this.getStepContent = this.getStepContent.bind(this); 
  }

  

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
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
        return 'Download metamask.';
      case 1:
        return 'Cast your vote.';
      case 2:
        return 'Go to the watch party.';
      default:
        return 'Follow the prior steps to set up your first election!';
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
          <Step>
            
            <StepLabel>View the real-time votes as they come in to your community's election.</StepLabel>
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
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
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