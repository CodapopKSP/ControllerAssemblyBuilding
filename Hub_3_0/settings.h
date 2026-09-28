//|----------------------|
//|   General Settings   |
//|----------------------|

  /*
  This determines the OS of the host computer. This mostly affects modifier keys.
  It is set to WINDOWS by default.
  */

  #define OPERATING_SYSTEM MAC

  /*
  This value determines how often the controller will update, in milliseconds.
  If your controller frequently loses connection, you can try increasing this value.
  Default value is 10. You may try something on the scale of 20 - 100.
  */

  #define update_time 10

  /*
  This value determines how long before the controller will attempt to reconnect if
  it has lost connection, in milliseconds.
  The plugin often sends messages only when something changes, so during stable play
  (e.g. orbit, no input) you may get no messages for several seconds. Use a longer
  timeout to avoid false reconnects; use a shorter one if you want faster detection
  of a real disconnect.
  Default value is 15000 (15 seconds).
  */
  const unsigned long SIMPIT_CONNECTION_TIMEOUT_MS = 15000;


//|------------------------------|
//|   Throttle Module Settings   |
//|------------------------------|

  /*
  These values correspond with the numbers written on the bottom of the
  Throttle module. The numbers on the bottom are the calibration for
  the throttle control.
  By default the deadzone value is 5 away from what was measured on the test bench.
  Min values are 0. Max values are 1023.
  
  If your throttle lever has too much of a deadzone at the top or bottom,
  you may lower the min values or raise the max values.
  Alternatively, if your throttle lever isn't quite reaching zero or max,
  you may raise the min values or lower the max values.
  */

  #define throttle_min 280
  #define throttle_max 894
  #define throttle_pmin 250
  #define throttle_pmax 800


//|---------------------|
//|   Analog Settings   |
//|---------------------|

  /*
  These values handle the deadzones for all joystick modules as well as 
  the throttle knob on some analog modules.
  Min values are 0.
  Max values are 1023.
  
  If your analog sticks have a deadzone in the center that is too large,
  you may raise deadZone_min and/or lower deadZone_max.
  If your analog sticks have a deadzone in the center that is too small,
  (such as the stick giving input when you aren't touching it) you may
  lower deadZone_min and/or raise deadZone_max.

  If the throttle knob has deadzones that are too large, you may lower
  minVolt_ and/or raise maxVolt_.
  If the throttle knob has deadzones that are too small, (such as the
  throttle giving input when it is off, or never reaching 100%), you may
  raise minVolt_ and/or lower maxVolt_.
  */
  
  #define deadZone_min 466
  #define deadZone_max 557
  #define maxVolt_ 1020
  #define minVolt_ 3
  #define keyboardEmulation_threshold 20000


//|-----------------------|
//|   Timewarp Settings   |
//|-----------------------|

  /*
  This value is the number of seconds before the start of a burn that
  the 'TO MNVR' button will warp to.
  Default value is -90.0f;, meaning 90 seconds before the burn.
  If, for instance, you want 10 seconds before, you would use -10.0f;.
  */
  
  float TW_delay = -90.0f;

  
//|------------------------|
//|   Keyboard Emulation   |
//|------------------------|

  /*
  These values determine the keys that get sent to the host computer
  when a button is pressed. You can edit these to fit your needs, such
  as to match the keybindings of another game or software.
  */

  // Controller Input                 |         Keypress

  #define Navigation_Time_Map                 'm'
  #define Navigation_Time_Map_Return          '`'
  #define Navigation_Time_Cycle_Ship_Up       ']'
  #define Navigation_Time_To_Mnvr             '1'
  #define Navigation_Time_Phys_Tw             KEY_LEFT_ALT
  #define Navigation_Time_Timewarp_Up         '.'
  #define Navigation_Time_Timewarp_Down       ','
  #define Navigation_Time_Stop_Tw             '/'

  #define Camera_UI                           KEY_F2
  #define Camera_Screenshot                   KEY_F1
  #define Camera_Minus                        '-'
  #define Camera_Right                        KEY_RIGHT_ARROW
  #define Camera_Down                         KEY_DOWN_ARROW
  #define Camera_Left                         KEY_LEFT_ARROW
  #define Camera_Up                           KEY_UP_ARROW
  #define Camera_Plus                         '+'
  #define Camera_IVA                          'c'
  #define Camera_CycleCamera                  'v'

  #define Control_Systems_Hold                '1'
  #define Control_Systems_Maneuver            '2'
  #define Control_Systems_Prograde            '3'
  #define Control_Systems_Retrograde          '4'
  #define Control_Systems_Normal              '5'
  #define Control_Systems_AntiNormal          '6'
  #define Control_Systems_RadialOut           '7'
  #define Control_Systems_RadialIn            '8'
  #define Control_Systems_TargetPrograde      '9'
  #define Control_Systems_TargetRetrograde    '0'
  #define Control_Systems_SAS                 't'
  #define Control_Systems_RCS                 'r'

  #define EA_Groups_Stage                     ' '
  #define EA_Groups_Abort                     KEY_BACKSPACE 
  #define EA_Groups_Action_Group_1            '1'
  #define EA_Groups_Action_Group_2            '2'
  #define EA_Groups_Action_Group_3            '3'
  #define EA_Groups_Action_Group_4            '4'
  #define EA_Groups_Action_Group_5            '5'

  #define Rotation_Gear                       'g'
  #define Rotation_Light                      'u'
  #define Rotation_Reset_Trim                 '?'
  #define Rotation_Trim                       ':'
  #define Rotation_PLN                        '3'
  // RKT mode is not actually an input
  #define Rotation_RVR                        '5'
  #define Rotation_Forward                    'w'
  #define Rotation_Backward                   's'
  #define Rotation_Left                       'a'
  #define Rotation_Right                      'd'
  #define Rotation_Twist_Left                 'q'
  #define Rotation_Twist_Right                'e'

  #define Translation_Brakes                  'b'
  #define Translation_Brakes_Lock             'b'
  #define Translation_Cruise                  '8'
  #define Translation_Reset_Cruise            '9'
  #define Translation_Precision_Control       '0'
  #define Translation_Forward                 'i'
  #define Translation_Backward                'k'
  #define Translation_Left                    'j'
  #define Translation_Right                   'l'
  #define Translation_Twist_Left              'h'
  #define Translation_Twist_Right             'n'

  #define Throttle_Precision                  '1'
  #define Throttle_Min                        '2'
  // Throttle Max is not actually an input
  #define Throttle_Forward                    '0'