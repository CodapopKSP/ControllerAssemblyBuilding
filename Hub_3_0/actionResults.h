//|-------------------|
//|      Results      |
//|-------------------|

/*
  This file contains the keybind values that are used by the controller
  in KSP. They can be edited if your keybindings are different in KSP.
*/


uint8_t Navigation_Time_List[8] = {
  KEY_LEFT_ALT,
  '1',
  '.',
  ',',
  '/',
  ']',
  '`',
  'm'
};
const int Camera_List[10] = {
  KEY_F2,
  KEY_F1,
  '-',      // Was Numpad -
  KEY_RIGHT_ARROW,
  KEY_DOWN_ARROW,
  KEY_UP_ARROW,
  KEY_LEFT_ARROW,
  '=',      // Was Numpad +
  'c',
  'v',
};
AutopilotMode SASMode[10] = {
  AP_MANEUVER,
  AP_STABILITYASSIST,
  AP_RETROGRADE,
  AP_PROGRADE,
  AP_ANTINORMAL,
  AP_NORMAL,
  AP_RADIALOUT,
  AP_RADIALIN,
  AP_ANTITARGET,
  AP_TARGET,
};
const int EA_Groups_List[5] = {1, 2, 3, 4, 5};
uint8_t EVA_List_Analog[10] = {
  'b',
  'f',
  ' ',
  'r',
  KEY_LEFT_SHIFT,
  KEY_LEFT_CTRL,
  'w',
  'a',
  's',
  'd',
};