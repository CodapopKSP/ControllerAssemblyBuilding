//|-------------------|
//|      Actions      |
//|-------------------|

/*
  This file contains the actions that are performed by the controller.
  They are separated based on module. As modules send transmissions to the controller,
  the actions are performed in response to the transmissions.
*/

void Navigation_Time_Action() {
  if (Navigation_Time_Ctrl[0] != Navigation_Time_STATE) {
    Navigation_Time_STATE = Navigation_Time_Ctrl[0];

    if (!keyboardEmulation) {
      // Controller is in KSP mode
      setKey(Navigation_Time_STATE & 1, Navigation_Time_List[0], Navigation_Time_flag[0]);
      setSimpitAction(Navigation_Time_STATE & 2, 0, Navigation_Time_flag[1], simpitSendTimewarp);
      for (int i = 2; i <= 6; i++) {
        setSimpitAction(Navigation_Time_STATE & 1<<i, Navigation_Time_List[i], Navigation_Time_flag[i], tapKey);
      }
      setSimpitAction_Switch(Navigation_Time_STATE & 128, Navigation_Time_List[7], Navigation_Time_flag[7], tapKey, tapKey);
    } else {
      // Controller is in Keyboard Emulation mode
      for (int i = 0; i < 7; i++) {
        setKey(Navigation_Time_STATE & 1<<i, Navigation_Time_Emulation_Keys[i], Navigation_Time_flag[i]);
      }
      setKey_Switch(Navigation_Time_STATE & 128, Navigation_Time_List[7], Navigation_Time_flag[7]);
    }
  }
  Navigation_Time_LAST = Navigation_Time_STATE;
}
void Camera_Action() {
  Camera_combinedBytes = Camera[0] + (Camera[1]*256);
  if (Camera_combinedBytes != Camera_STATE) {
    Camera_STATE = Camera_combinedBytes;

    if (!keyboardEmulation) {
      // Controller is in KSP mode
      for (int i = 0; i < 2; i++) {
        setSimpitAction(Camera_STATE & 1<<i, Camera_List[i], Camera_flag[i], tapKey);
      }
      for (int i = 2; i < 8; i++) {
        setKey(Camera_STATE & 1<<i, Camera_List[i], Camera_flag[i]);
      }
      for (int i = 8; i < 10; i++) {
        setSimpitAction(Camera_STATE & 1<<i, Camera_List[i], Camera_flag[i], tapKey);
      }
    } else {
      // Controller is in Keyboard Emulation mode
      for (int i = 0; i < 10; i++) {
        setKey(Camera_STATE & 1<<i, Camera_Emulation_Keys[i], Camera_flag[i]);
      }
    }
  }
  Camera_LAST = Camera_STATE;
}
void Ctrl_Sys_Action() {
  ControlSys_combinedBytes = Ctrl_Sys_Ctrl[0] + (Ctrl_Sys_Ctrl[1]*256);
  if (ControlSys_combinedBytes != Ctrl_Sys_STATE) {
    Ctrl_Sys_STATE = ControlSys_combinedBytes;

    if (!keyboardEmulation) {
      // Controller is in KSP mode
      for (int i = 0; i < 10; i++) {
        setSimpitAction(Ctrl_Sys_STATE & 1<<i, SASMode[i], Ctrl_Systems_flag[i], simpitSetSASMode);
      }
      setSimpitAction_Switch(Ctrl_Sys_STATE & 1024, SAS_ACTION, Ctrl_Systems_flag[10], simpitActivateAction, simpitDeactivateAction);
      setSimpitAction_Switch(Ctrl_Sys_STATE & 2048, RCS_ACTION, Ctrl_Systems_flag[11], simpitActivateAction, simpitDeactivateAction);
    } else {
      // Controller is in Keyboard Emulation mode
      for (int i = 0; i < 10; i++) {
        setKey(Ctrl_Sys_STATE & 1<<i, Control_Systems_Emulation_Keys[i], Ctrl_Systems_flag[i]);
      }
      setKey_Switch(Ctrl_Sys_STATE & 1024, Control_Systems_SAS, Ctrl_Systems_flag[10]);
      setKey_Switch(Ctrl_Sys_STATE & 2048, Control_Systems_RCS, Ctrl_Systems_flag[11]);
    }
  }
  Ctrl_Sys_LAST = Ctrl_Sys_STATE;
}
void EA_Groups_Action() {
  if (EA_Groups_Ctrl[0] != EA_Groups_STATE) {
    EA_Groups_STATE = EA_Groups_Ctrl[0];

    if (!keyboardEmulation) {
      // Controller is in KSP mode
      for (int i = 0; i < 5; i++) {
        setSimpitAction(EA_Groups_STATE & 1<<i, EA_Groups_List[i], EA_Groups_flag[i], simpitToggleCAG);
      }
      setSimpitAction(EA_Groups_STATE & 32, STAGE_ACTION, EA_Groups_flag[5], simpitActivateAction);
      setSimpitAction(EA_Groups_STATE & 64, ABORT_ACTION, EA_Groups_flag[6], simpitActivateAction);
    } else {
      // Controller is in Keyboard Emulation mode
      for (int i = 0; i < 7; i++) {
        setKey(EA_Groups_STATE & 1<<i, EA_Groups_Emulation_Keys[i], EA_Groups_flag[i]);
      }
    }
  }
  EA_Groups_LAST = EA_Groups_STATE;
}
void Rotation_Action() {
  if (Rotation[0] != Rotation_STATE) {
    Rotation_STATE = Rotation[0];

    if (!keyboardEmulation) {
      // Controller is in KSP mode
      if ((Rotation[0] & 1) && !(currentActionStatus & LIGHT_ACTION)){
        mySimpit.activateAction(LIGHT_ACTION);
      }
      if ((Rotation[0] & 1) && (currentActionStatus & LIGHT_ACTION)){
        mySimpit.deactivateAction(LIGHT_ACTION);
      }
      if (Rotation[0] & 2) {
        trimy = 0;
        trimp = 0;
        trimr = 0;
      }
      if (Rotation[0] & 4) {
        Trim_On = true;
      } else {
        Trim_On = false;
      }
      if (Rotation[0] & 8) {
        vehicleType = rover;
      } else if (Rotation[0] & 16) {
        vehicleType = plane;
      } else {
        vehicleType = rocket;
      }
      if((Rotation[0] & 32) && !(currentActionStatus & GEAR_ACTION)){
        mySimpit.activateAction(GEAR_ACTION);
      }
      if(!(Rotation[0] & 32) && (currentActionStatus & GEAR_ACTION)){
        mySimpit.deactivateAction(GEAR_ACTION);
      }
    } else {
      // Controller is in Keyboard Emulation mode
      setSimpitAction(Rotation[0] & 1, Rotation_Light, Rotation_flag[0], tapKey);
      setSimpitAction(Rotation[0] & 2, Rotation_Reset_Trim, Rotation_flag[1], tapKey);
      setSimpitAction(Rotation[0] & 4, Rotation_Trim, Rotation_flag[2], tapKey);
      setSimpitAction_Switch(Rotation[0] & 8, Rotation_RVR, Rotation_flag[3], tapKey, tapKey);
      setSimpitAction_Switch(Rotation[0] & 16, Rotation_PLN, Rotation_flag[4], tapKey, tapKey);
      setSimpitAction_Switch(Rotation[0] & 32, Rotation_Gear, Rotation_flag[5], tapKey, tapKey);
    }
    Rotation_LAST = Rotation_STATE;
  }

  if (!keyboardEmulation) {
    // Plane
    if (vehicleType == 0) {
      updateAnalogValues(ANALOG_ROTATION_MESSAGE, Rotation_axis2, Rotation_axis1, Rotation_axis0);
      updateAnalogValues(ANALOG_WHEEL_MESSAGE, Rotation_axis1_wheels, Rotation_axis0_wheels, 0);

      // Trim
      if (Trim_On) {
        trimy = Rotation_axis2;
        trimp = Rotation_axis1;
        trimr = Rotation_axis0;
      }
      updateAnalogValues(ANALOG_ROTATION_MESSAGE, checkTrim(trimy, Rotation_axis2), checkTrim(trimp, Rotation_axis1), checkTrim(trimr, Rotation_axis0));
    }
    
    // Rocket
    if (vehicleType == 1) {
      updateAnalogValues(ANALOG_ROTATION_MESSAGE, Rotation_axis0, Rotation_axis1, Rotation_axis2);
      updateAnalogValues(ANALOG_WHEEL_MESSAGE, 0, 0, 0);
    }
    
    // Rover
    if (vehicleType == 2) {
      updateAnalogValues(ANALOG_ROTATION_MESSAGE, Rotation_axis2, Rotation_axis1, Rotation_axis0);
    }

    if (precision) {
      updateAnalogValues(ANALOG_ROTATION_MESSAGE, myRotation.yaw/prec_divide, myRotation.pitch/prec_divide, myRotation.roll/prec_divide);
    }

    // Execute
    //sendRotationIfChanged();
    if (memcmp(&myRotation, &myRotationOld, sizeof(rotationMessage)) != 0) {
      mySimpit.send(ROTATION_MESSAGE, myRotation);
      myRotationOld = myRotation;
    }

    sendWheelIfChanged();
  } else {
    setKey(Rotation_axis2 > keyboardEmulation_threshold, Rotation_Twist_Right, Rotation_flag[6]);
    setKey(Rotation_axis2 < -keyboardEmulation_threshold, Rotation_Twist_Left, Rotation_flag[7]);
    setKey(Rotation_axis1 > keyboardEmulation_threshold, Rotation_Backward, Rotation_flag[8]);
    setKey(Rotation_axis1 < -keyboardEmulation_threshold, Rotation_Forward, Rotation_flag[9]);
    setKey(Rotation_axis0 > keyboardEmulation_threshold, Rotation_Right, Rotation_flag[10]);
    setKey(Rotation_axis0 < -keyboardEmulation_threshold, Rotation_Left, Rotation_flag[11]);
  }
}
void Translation_Action() {
  if (Translation[0] != Translation_STATE) {
    Translation_STATE = Translation[0];
  
    if (!keyboardEmulation) {
      // Controller is in KSP mode
      if (On_EVA and !EVA_Ctrl_Con) {
        setKey(Translation[0] & 8, EVA_List_Analog[2], EVA_flag[6]);
        setKey(Translation[0] & 1, EVA_List_Analog[1], EVA_flag[7]);
        setKey(Translation[0] & 16, EVA_List_Analog[0], EVA_flag[8]);
        setKey_Switch(Translation[0] & 2, EVA_List_Analog[3], EVA_flag[9]);
      } else {
        // Precision Control
        if (Translation[0] & 2) {
          precision = true;
        } else {
          precision = false;
        }
      
        // Parking Break On
        if ((Translation[0] & 4) and !parking_break){
          mySimpit.activateAction(BRAKES_ACTION);
          parking_break = true;
          cruise_control = 0;
        }
      
        // Parking Break Off
        if(!(Translation[0] & 4) && !brakes_pushed && parking_break){
          mySimpit.deactivateAction(BRAKES_ACTION);
          parking_break = false;
        }
      
        // Brakes
        if((Translation[0] & 8) && !brakes_pushed && !parking_break){
          mySimpit.activateAction(BRAKES_ACTION);
          cruise_control = 0;
          brakes_pushed = true;
        }
        if(!(Translation[0] & 8) && brakes_pushed){
          brakes_pushed = false;
          if (!parking_break) {
            mySimpit.deactivateAction(BRAKES_ACTION);
          }
        }
      
        // Reset Cruise
        if (Translation[0] & 16) {
          cruise_control = 0;
        }
      }
    } else {
      // Controller is in Keyboard Emulation mode
      setSimpitAction(Translation[0] & 1, Translation_Cruise, Translation_flag[4], tapKey);
      setSimpitAction_Switch(Translation[0] & 2, Translation_Precision_Control, Translation_flag[0], tapKey, tapKey);
      setSimpitAction_Switch(Translation[0] & 4, Translation_Brakes_Lock, Translation_flag[1], tapKey, tapKey);
      setSimpitAction(Translation[0] & 8, Translation_Brakes, Translation_flag[2], tapKey);
      setSimpitAction(Translation[0] & 16, Translation_Reset_Cruise, Translation_flag[3], tapKey);
    }
    Translation_LAST = Translation_STATE;Translation_LAST = Translation_STATE;
  }
  if (!keyboardEmulation) {
    if (vehicleType != rover) {
      if (precision) {
        updateAnalogValues(ANALOG_TRANSLATION_MESSAGE, Translation_axis0/prec_divide, Translation_axis1/prec_divide, Translation_axis2/prec_divide);
      } else {
        updateAnalogValues(ANALOG_TRANSLATION_MESSAGE, Translation_axis0, Translation_axis1, Translation_axis2);
      }
    } else {
      // Set Cruise Control and Wheel Throttle/Steering
      if (Translation[0] & 1) {
        cruise_control = Translation_axis1_wheels;
      }
      if ((cruise_control != 0) and (Translation_axis1_wheels <= cruise_control)) {
        myWheel.throttle = cruise_control;
      } else {
        myWheel.throttle = Translation_axis1_wheels;
      }
      myWheel.steer = Translation_axis0_wheels;
    }

    // Execute
    sendTranslationIfChanged();
    sendWheelIfChanged();
  } else {
    if (On_EVA and !EVA_Ctrl_Con) {
      setKey(Translation_axis0 < 0, EVA_List_Analog[9], EVA_flag[0]);
      setKey(Translation_axis0 > 0, EVA_List_Analog[7], EVA_flag[1]);
      setKey(Translation_axis2 < 0, EVA_List_Analog[4], EVA_flag[2]);
      setKey(Translation_axis2 > 0, EVA_List_Analog[5], EVA_flag[3]);
      setKey(Translation_axis1 < 0, EVA_List_Analog[6], EVA_flag[4]);
      setKey(Translation_axis1 > 0, EVA_List_Analog[8], EVA_flag[5]);
    } else {
      setKey(Translation_axis2 > keyboardEmulation_threshold, Translation_Twist_Left, Translation_flag[6]);
      setKey(Translation_axis2 < -keyboardEmulation_threshold, Translation_Twist_Right, Translation_flag[7]);
      setKey(Translation_axis1 > keyboardEmulation_threshold, Translation_Backward, Translation_flag[8]);
      setKey(Translation_axis1 < -keyboardEmulation_threshold, Translation_Forward, Translation_flag[9]);
      setKey(Translation_axis0 > keyboardEmulation_threshold, Translation_Left, Translation_flag[10]);
      setKey(Translation_axis0 < -keyboardEmulation_threshold, Translation_Right, Translation_flag[11]);
    }
  }
}
void Throttle_Action() {
  if (Throttle[0] != Throttle_STATE) {
    Throttle_STATE = Throttle[0];

    if (!keyboardEmulation) {
      // Controller is in KSP mode
      if (Throttle[0] & 1) {
        throttle_pcont = true;
      } else {
        throttle_pcont = false;
      }

    } else {
      // Controller is in Keyboard Emulation mode
      setSimpitAction_Switch(Throttle[0] & 1, Throttle_Precision, Throttle_flag[0], tapKey, tapKey);
      setSimpitAction(Throttle[0] & 2, Throttle_Min, Throttle_flag[1], tapKey);
      setKey(throttle > throttle_min + 100, Throttle_Forward, Throttle_flag[2]);
    }
  }

  // Send analog throttle changes regardless of button-state changes
  if (!keyboardEmulation) {
    if (Throttle[0] & 2) {
      throttle = 0;
    }
    mySimpit.send(THROTTLE_MESSAGE, throttle);
  }

  Throttle_LAST = Throttle_STATE;
}