# Untitled Space Craft
## Controller Assembly Building

This is a webtool for streamlining several aspects of Untitled Space Craft controller development and improving the customer experience. The CAB was designed to mimic the aesthetic and vibe of the VAB (Vehicle Assembly Building) in KSP.


## Features

* Provides a visual, interactive tool to help customers pick and choose modules
* Fully reveals all price and technical info that the customer may need to know
* Includes an Engineer's Report for automatically checking module compatibility, greatly reducing customer service workload
* Provides several handpicked controller configuration examples for the customer to use as a starting point
* Includes a Lights toggle so customers may see which parts of the controller can light up
* The **Firmware** button located within the Engineer's Report builds an Arduino project zip from the current layout.


## How to Use It
### As a Customer

* Click a container button at the bottom of the screen to add a container to the canvas.
* Drag modules from the left and right sides and drop them in the slots in the container.
* Check the Engineer's Report by clicking a button at the top of the screen.
* Save the URL of your configuration by clicking the Save button to later send it in an email or chat message.
* (Optional) Drag and drop the container to a spot on the canvas to add multiple containers.
* Download your controller's firmware.

### As a Developer

* Click the link sent by a customer or saved in the database.
* Check the Engineer's Report to make sure the chosen modules are compatible.
* Paste the link into the off-site Logistics tool to receive a list of necessary parts and materials.

### Firmware button

The **Firmware** button located within the Engineer's Report builds an Arduino project zip from the current layout. Browsers block loading local files when the page is opened from disk (`file://`). For the Code button to work, serve the project over HTTP, e.g. from the project folder run:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.


## Contact

Reddit: u/CodapopKSP

Discord: codapopksp

Email: UntitledSpaceCraft.Controllers@gmail.com

Instagram: untitled_space_craft

## Sprite Fine Tuning

Use `build_sprites.py` to regenerate sheets:

```bash
python3 build_sprites.py --target modules
python3 build_sprites.py --target containers
python3 build_sprites.py --target all
```

For very fine runtime tuning (including decimal nudges), edit `SPRITE_TUNING` near the top of `script.js`.

- `SPRITE_TUNING.module.scaleX/scaleY`
- `SPRITE_TUNING.module.offsetXPx/offsetYPx`
- `SPRITE_TUNING.module.lightOffsetXPx/lightOffsetYPx`
- `SPRITE_TUNING.module.perImage['modules/<name>.png']`
- `SPRITE_TUNING.container.perImage['containers/<name>.png']`

Example:

```js
SPRITE_TUNING.module.perImage['modules/ag1.png'] = {
  offsetXPx: 0.25,
  offsetYPx: -0.15,
  scaleX: 1.001,
  scaleY: 1
};
```