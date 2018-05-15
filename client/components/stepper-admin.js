import React from 'react';
import {
  Step,
  Stepper,
  StepContent, 
  StepLabel,
  RaisedButton, 
  FlatButton 
} from 'material-ui';
import { CreateElection, CreateCandidate } from './index';
import {Link} from 'react-router-dom'; 

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalStepper extends React.Component {

  constructor(props) {
      super(props); 
      this.state = {
        finished: false,
        stepIndex: 0,
        components: [null, <CreateElection/>, <CreateCandidate/>, null] 
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
        return 'MetaMask Browser Extension turns Google Chrome into an ethereum browser, which will enable us to retrieve your vote from the blockchain, and let you securely sign transactions and manage your identity.'
      case 1: 
        return 'Select campaign settings.';
      case 2:
        return 'Add your first candidate. You can either add several candidates now, or return to this page at a later date.';
      case 3:
        return 'Invite members of your community to your election. They will be sent a private code, and will be added to your view after thay have successfully registered on the site.';
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
            <StepLabel>Download MetaMask 
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>Create a Campaign
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>Add a Candidate to the Election</StepLabel>
          </Step>
          <Step>
            
            <StepLabel>Invite Community Members To Participate In The Election</StepLabel>
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

export default HorizontalStepper;