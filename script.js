//|================|
//|     Script     |
//|================|

// Delete Bin
const deleteBin = document.getElementById('delete-bin')

// URL Parameters
const urlParameters = new URLSearchParams(window.location.search);
const controllerConfigString = urlParameters.get('config');
const colorConfigString = urlParameters.get('color');

// Prevent users from right clicking
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Mobile-specific Variables
let activeModule_mobile = null;
function isPhone() {
  return /mobile/i.test(navigator.userAgent);
}
var isAppleDevice = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
if (isAppleDevice) {
  document.body.classList.add('apple-device');
}

// Check Left Array for mouseover for zIndex changes on mobile
const leftArray = document.getElementById('left-array');
leftArray.addEventListener('mouseover', function() {
  leftArray.classList.add('mouseover');
});
leftArray.addEventListener('mouseout', function() {
  leftArray.classList.remove('mouseover');
});



//|----------------------|
//|     Load Modules     |
//|----------------------|

// Add modules to Left and Right module arrays
const moduleArray_left = document.querySelector('.left-module-array');
const moduleArray_right = document.querySelector('.right-module-array');
let moduleCounter = 0;
moduleData.forEach(module => {
  /*
    Populate the left and right module docks with modules using data from moduleData.js
    moduleData is an array that contains all of the data for each module.
      name:           The name of the module.
      id:             The letter code for the module for things such as generating the URL code on save.
      price:          The price for the module in USD.
      image:          The graphical image of the module.
      image_light:    The image used when the lights are switched on.
      tooltip:        The tooltip text.
      has:            Functions that the module provides.
      needs:          Missing functions that the module needs.
      needs_data:     Boolean for if the module requests data from Simpit.
  */

  // Create the module element
  const moduleDock = document.createElement('div');
  moduleDock.classList.add('module-dock');
  moduleDock.setAttribute('data-type', 'type2');
  
  const moduleElement = document.createElement('div');
  moduleElement.classList.add('module');
  moduleElement.setAttribute('module', 'true');

  // Set the module ID, price, and name
  moduleElement.setAttribute('id', module.id);
  moduleElement.setAttribute('data-price', module.price);
  moduleElement.setAttribute('data-name', module.name);

  // Create the module image element
  const moduleImage = document.createElement('img');
  moduleImage.src = module.image;
  moduleImage.classList.add('image-1');
  moduleElement.appendChild(moduleImage);

  // Check if the module has the image_light property for turning the lights on and off
  if (module.image_light) {
    const moduleImageLight = document.createElement('img');
    moduleImageLight.src = module.image_light;
    moduleImageLight.classList.add('image-2');
    moduleImageLight.classList.add('hidden');
    moduleElement.appendChild(moduleImageLight);
    moduleElement.classList.add('light');
  }

  // Create the module tooltip element
  const moduleTooltip = document.createElement('span');
  moduleTooltip.style.fontFamily = "Roboto, sans-serif";
  moduleTooltip.classList.add('tooltip');

  // Create the module tooltip content
  const moduleTooltipContent = document.createElement('strong');
  moduleTooltipContent.style.fontSize = '1.8vh';
  moduleTooltipContent.textContent = module.name;

  // Construct price and tooltip message
  const modulePrice = document.createElement('span');
  modulePrice.style.fontSize = '1.7vh';
  modulePrice.innerHTML = `<br>$${module.price}</br>`;
  const moduleDescription = document.createElement('span');
  moduleDescription.innerHTML = module.tooltip;

  // Add them together to form the tooltip
  moduleTooltip.appendChild(moduleTooltipContent);
  moduleTooltip.appendChild(modulePrice);
  moduleTooltip.appendChild(moduleDescription);

  // Add everything together
  moduleElement.appendChild(moduleTooltip);
  moduleDock.appendChild(moduleElement);

  // Append the module element to the container
  if (moduleCounter < 12) {
    moduleArray_left.appendChild(moduleDock);
  } else {
    moduleArray_right.appendChild(moduleDock);
  }
  moduleCounter += 1;
});



//|-------------------------|
//|     Sidebar Buttons     |
//|-------------------------|

// Color Picker Buttons
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach((button) => {
  /*
    Add buttons on the side that allow the user to change the color of the current containers.
    Uses .color-button to change the color of .container-box
  */
  button.addEventListener('click', () => {
    const color = button.style.backgroundColor;
    const containerBoxes = document.querySelectorAll('.container-box');
    containerBoxes.forEach(containerBox => {
      containerBox.style.borderColor = color;
    })
  });
});



//|------------------------|
//|     Header Buttons     |
//|------------------------|

// Recommended Configurations Button
const recommendedConfigsButton = document.getElementById('recommendedConfigs');
recommendedConfigsButton.addEventListener('click', function() {
  /*
    Add a popup that displays a list of buttons that populate the canvas with pre-designed configurations
  */
  Swal.fire({
    title: 'Recommended Configurations',
    html:
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2400h1b1b2g1a3f3f5f6\'">Jebediah\'s Command</button>' +
    '<button id="btn2" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2300b3a4g1f3f6f5\'">USS Button Box</button>' +
    '<button id="btn3" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2300b1h1b2f2a5e1\'">Keyboard\'s Lament</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z1200f2a5\'">Keyboard Companion 1</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z1200f2g1\'">Keyboard Companion 2</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2200a5b3f4f5\'">External Command Seat 1</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2200g1b3f2a4\'">External Command Seat 2</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2313h1b1b2f1f6g1z2115c1a3\'">Valentina\'s Command</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z3111a1h3e1z2413g1b1h1h2d1f3a2f5z3116c1b2f6&color=rgb(0,0,0)\'">Mission Control</button>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});


// Main Price Display
const priceDisplay = document.getElementById('price-display')
function updateTotalPrice() {
  /*
    Show the price in big, bold text near the top right of the canvas.
    Uses .container-box and .module within .module-dock[data-type="type1"] to acquire data.
  */
  let totalPrice = 0

  // Calculate price for containers
  const containerBoxes = document.querySelectorAll('.container-box');
  containerBoxes.forEach(containerBox => {
    const priceOfContainer = parseFloat(containerBox.dataset.price);
    totalPrice += priceOfContainer;
  });

  // Calculate price for modules
  const containerModuleDocks = document.querySelectorAll('.module-dock[data-type="type1"]');
  containerModuleDocks.forEach(containerModuleDock => {
    const dockedModules = containerModuleDock.querySelectorAll('.module');
    dockedModules.forEach(dockedModule => {
      const priceOfModule = parseFloat(dockedModule.dataset.price);
      totalPrice += priceOfModule;
    });
  });

  // Display price
  priceDisplay.innerText = `Total: $${parseInt(totalPrice.toFixed(2))}`;
};


// Save Button
const saveButton = document.getElementById('save')
saveButton.addEventListener('click', function() {
  /*
    Create a popup to save the current config to a url and copy it to the clipboard
    Uses .container-box to get current containers and then locates all .modules inside.
  */
  const urlConfigCode = [];

  // Add container info to the URL
  const containerBoxes = document.querySelectorAll('.container-box');
  containerBoxes.forEach(containerBox => {
    const containerSizeMap = {
      /*
        class name: container size code
      */
      'one-one': 'z11',
      'one-two': 'z12',
      'two-one': 'z21',
      'three-one': 'z31',
      'two-two': 'z22',
      'two-three': 'z23',
      'two-four': 'z24'
    };
    
    for (const className in containerSizeMap) {
      if (containerBox.id.includes(className)) {
        urlConfigCode.push(containerSizeMap[className]);
        break;
      }
    }
    
    // Add container location data
    let containerLocation = containerBox.parentNode;
    /*
      Add container address to the URL.
        00 - Unplaced
        1X - Top row of container grids, left to right.
        2X - Bottom row of container grids, left to right.
    */
    if (containerLocation.id.includes('canvas')) {
      urlConfigCode.push('00');
    } else {
      urlConfigCode.push(containerLocation.id);
    }

    // Add module info to the URL
    const modules = containerBox.querySelectorAll('.module');
    modules.forEach(module => {
      urlConfigCode.push(module.id);
    });
  })

  // Add the color information to the end of the urlConfigCode array
  const color = containerBoxes[0].style.borderColor;
  if (color) {
    urlConfigCode.push(`&color=${color.replace(/\s/g, '')}`);
  } else {
    urlConfigCode.push(`&color=rgb(0,0,0)`);
  }
  const url = "https://untitledspacecraft.com/?config=" + urlConfigCode.join('');

  // Copy the URL to the clipboard
  navigator.clipboard.writeText(url).then(() => {

    // Activate the button
    Swal.fire({
      title: 'Copied!',
      html: '<div>This configuration URL has been copied to your clipboard!<br><br>' + url + '</div>',
      icon: 'success',
      buttonsStyling: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }).catch(() => {
    alert("Failed to copy the configuration URL to your clipboard. Please copy it manually: \n\n" + url);
  });
});


// Light Switch
const lightSwitch = document.getElementById('lights')
lightSwitch.addEventListener('click', function() {
  /*
    Button that toggles all modules with the light class
      between .image-1 and .image-2.
  */
  this.classList.toggle('light');
  const modules_with_lights = document.querySelectorAll('.module.light');
  modules_with_lights.forEach(module => {
    const image1 = module.querySelector('.image-1');
    const image2 = module.querySelector('.image-2');
    image1.classList.toggle('hidden');
    image2.classList.toggle('hidden');
  });
});



//|------------------------|
//|     Footer Buttons     |
//|------------------------|

// Contact Button
const contactButton = document.getElementById('contact')
contactButton.addEventListener('click', function() {
  /*
    Display contact information as a list of buttons that save
      respective contact information to the clipboard.
  */
  Swal.fire({
    title: 'Contact Information',
    html:
    '<div style="font-family: \'Roboto\', sans-serif;">Click a button to copy.</div>' +
    '<button class="btn btn-reddit text-center" data-clipboard-text="https://www.reddit.com/user/CodapopKSP">Reddit:   u/CodapopKSP</button>' +
    '<button class="btn btn-discord text-center" data-clipboard-text="codapopksp">Discord:   codapopksp</button>' +
    '<button class="btn btn-insta text-center" data-clipboard-text="untitled_space_craft">Instagram: untitled_space_craft</button>' +
    '<button class="btn btn-email text-center" data-clipboard-text="untitledspacecraft.controllers@gmail.com">Email: untitledspacecraft\n.controllers@gmail.com</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>You can also visit the Untitled Space Craft subreddit for more information.</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/\', \'_blank\')">Click to visit r/UntitledSpaceCraft</button>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },

    // Copy contact info to the clipboard
    didOpen: () => {
      const clipboard = new ClipboardJS('.btn', {
        text: function(trigger) {
          return trigger.getAttribute('data-clipboard-text');
        }
      });
      clipboard.on('success', function(e) {
        e.clearSelection();
        Swal.fire({
          title: 'Copied to clipboard!',
          text: e.text,
          icon: 'success',
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'copy-to-clipboard'
          }
        });
      });
    }
  });
});


// Info Button
const infoButton = document.getElementById('info')
infoButton.addEventListener('click', function() {
  /*
    Display information such as guides and other important info.
  */
  Swal.fire({
    title: 'Information',
    html:
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>For information about kits or further customization, please read the full guide.</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/comments/12hjtms/start_here_a_guide_to_untitled_space_craft/\', \'_blank\')">Starter Guide</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>Useful Documents</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/gallery/12sq3nn\', \'_blank\')">Full Catalog</button>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/gallery/12hjaoy\', \'_blank\')">Recommended Configs</button>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/comments/xvm0tw/untitled_space_craft_how_to_orderwhat_to_expect/\', \'_blank\')">Ordering and Shipping</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>These controllers only work with KSP1. KSP2 compatibility is not yet available.</div>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});


// Add Container buttons
document.addEventListener('DOMContentLoaded', () => {
  /*
    Create multiple buttons using a map of container types and classes
      for adding new containers to the canvas.
    Pulls from containerData.js.
  */
  const containerTypes = [
    /*
      addButtonId, containerData, containerClass
    */
    { addButtonId: 'add-2x4', containerType: MarkV, containerClass: '.two-four' },
    { addButtonId: 'add-2x3', containerType: MarkIV, containerClass: '.two-three' },
    { addButtonId: 'add-2x2', containerType: MarkIII, containerClass: '.two-two' },
    { addButtonId: 'add-1x2', containerType: MarkIhoriz, containerClass: '.one-two' },
    { addButtonId: 'add-3x1', containerType: MarkII, containerClass: '.three-one' },
    { addButtonId: 'add-2x1', containerType: MarkIvert, containerClass: '.two-one' },
    { addButtonId: 'add-1x1', containerType: Mark0, containerClass: '.one-one' }
  ];

  containerTypes.forEach(container => {
    const addButton = document.getElementById(container.addButtonId);
    addButton.addEventListener('click', () => {
      addContainer(container.containerType, container.containerClass);
    });
  });
});



//|--------------------|
//|     Delete Bin     |
//|--------------------|

// Delete Bin drag over
deleteBin.addEventListener('dragover', (event) => {
  event.preventDefault();
});


// Delete Bin touch start for mobile
deleteBin.addEventListener('touchstart', function(event) {
  /*
    Move currently selected module to any open module dock on the left or right.
    Kills active .tooltip and locates a .module-dock[data-type="type2"]
      that is empty of all .modules to append the current module.
  */
  if (activeModule_mobile) {
    let tooltip = activeModule_mobile.querySelector(".tooltip");
    tooltip.style.display = 'none';
    event.preventDefault()
    const moduleDocks = document.querySelectorAll('.module-dock[data-type="type2"]');
    for (const moduleDock of moduleDocks) {
      const emptySlot = moduleDock.querySelectorAll('.module').length < 1;
        if (emptySlot) {
          moduleDock.appendChild(activeModule_mobile);
          activeModule_mobile = null;
          break;
        }
    }
  }
  updateTotalPrice()
})


// Delete Bin drop
deleteBin.addEventListener('drop', (event) => {
  /*
    Move currently dragged module to any open module dock on the left or right
      or remove currently dragged container.
    Deletes objects with class box.
    Resets all .module to empty .module-dock[data-type="type2"]
  */
  const event_id = event.dataTransfer.getData('text/plain');
  const elementToDelete = document.getElementById(event_id);
  activeModule_mobile = null;

  // Dropped item is a container
  if (elementToDelete && (elementToDelete.classList.contains('container-box'))) {
    elementToDelete.remove();
    const moduleDocks = document.querySelectorAll('.module-dock[data-type="type2"]');

    // Move modules in deleted container back to the sides
    const droppedModules = elementToDelete.querySelectorAll('[module="true"]');
    for (const module of droppedModules) {
      for (const moduleDock of moduleDocks) {
        const emptySlot = moduleDock.querySelectorAll('.module').length < 1;
        if (emptySlot) {
          moduleDock.appendChild(module);
          break;
        }
      }
    }
    elementToDelete.remove();

  // Dropped item is a module
  } else if (elementToDelete && elementToDelete.classList.contains('module')) {
    const moduleDocks = document.querySelectorAll('.module-dock[data-type="type2"]');
    let droppedIntoContainer = false;

    // Move module back to the sides
    for (const moduleDock of moduleDocks) {
      const emptySlot = moduleDock.querySelectorAll('.module').length < 1;
      if (emptySlot) {
        moduleDock.appendChild(elementToDelete);
        elementToDelete.classList.remove("mouseover");
        let tooltip = elementToDelete.querySelector(".tooltip");
        tooltip.style.display = 'none';
        droppedIntoContainer = true;
        break;
      }
    }
  }

  // Reset grid sizing
  const containerGrids = document.querySelectorAll('.container-grid');
  containerGrids.forEach(containerGrid => {
    const containerGridChildren = containerGrid.children;
    if (containerGridChildren.length === 0) {
      containerGrid.classList.remove('has-24child');
      containerGrid.classList.remove('has-23child');
      containerGrid.classList.remove('has-22child');
      containerGrid.classList.remove('has-12child');
      containerGrid.classList.remove('has-31child');
      containerGrid.classList.remove('has-21child');
      containerGrid.classList.remove('has-11child');
    }
  });
  updateTotalPrice()
});



//|-----------------|
//|     Modules     |
//|-----------------|

function setContainerStackZIndex(module, setOrReset) {
  /*
    Set or reset the zIndex of the container and its relatives so that
      tooltips are on top and modules can be dragged and dropped properly.
    Takes 2 parameters:
      module:       the module being dragged or moused over
      setOrReset:   String, to determine whether to raise or lower the zIndex
  */
  let moduleDock = module.parentNode;
  let moduleDockType = moduleDock.getAttribute("data-type");

  // Release container slot from forcing the tooltip to be on top
  if (moduleDockType === "type1") {
    let moduleDockArray = moduleDock.parentNode;
    let moduleDockArrayWrapper = moduleDockArray.parentNode;
    let containerBox = moduleDockArrayWrapper.parentNode;
    let containerGridOrCanvas = containerBox.parentNode;
    containerBox.style.zIndex = '';
    if (setOrReset == 'set') {
      containerBox.style.zIndex = 70;
      containerGridOrCanvas.style.zIndex = 70;
    } else {
      if (containerGridOrCanvas.querySelector('.container-grid-array-top')) {
        containerGridOrCanvas.style.zIndex = '10';
      } else {
        containerGridOrCanvas.style.zIndex = '';
      }
    }
  }
};

const modules = document.querySelectorAll('.module')
modules.forEach(module => {

  // Module Drag Start
  module.addEventListener('dragstart', function(event) {
    /*
      Update module class to dragging and hide tooltip.
      Reset the zIndex of the container stack.
      Highlight the Delete Bin.
    */
    module.classList.add('dragging');
    event.dataTransfer.setData('text/plain', this.id);
    let tooltip = module.querySelector(".tooltip");
    tooltip.style.display = 'none';
    setContainerStackZIndex(module, 'reset');
    deleteBin.classList.add('highlight');
  });
  

  // Module Drag End
  module.addEventListener('dragend', () => {
    /*
      Update module class to remove dragging.
      Reset the zIndex of the container stack.
      Remove highlight from the Delete Bin.
    */
    module.classList.remove('dragging');
    updateTotalPrice();
    setContainerStackZIndex(module, 'reset');
    deleteBin.classList.remove('highlight');
  });


  // Show tooltip
  module.addEventListener('mouseover', (event) => {
    /*
      Show tooltip for objects with class mouseover.
      Get the vert/horiz position of the tooltip in the window and
        draw the tooltip depending on the nearest screen edge.
      Set the zIndex of the container stack.
      Set active module for mobile.
    */
    const tooltip = module.querySelector(".tooltip");
    module.classList.add("mouseover");
    tooltip.style.display = 'block';

    // Determine location based on coordinates of the module
    const rect = event.target.getBoundingClientRect();
    const position = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
    if (position < window.innerWidth / 3) {
      tooltip.classList.remove('right');
      tooltip.classList.add('left');
    } else {
      tooltip.classList.remove('left');
      tooltip.classList.add('right');
    }
    const positionv = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
    if (positionv < window.innerHeight / 3.4) {
      tooltip.classList.remove('bottom');
      tooltip.classList.add('top');
    } else {
      tooltip.classList.remove('top');
      tooltip.classList.add('bottom');
    }

    setContainerStackZIndex(module, 'set');
    activeModule_mobile = module;
  });
  

  // Hide tooltip
  module.addEventListener('mouseout', () => {
    /*
      Hide the tooltip using .tooltip from module.
      Reset the zIndex of the container stack.
      Remove class mouseover.
    */
    let tooltip = module.querySelector(".tooltip");
    tooltip.style.display = 'none';
    module.classList.remove("mouseover");
    setContainerStackZIndex(module, 'reset');
  });
});



//|-------------------------|
//|     Container Grids     |
//|-------------------------|

const containerGrids = document.querySelectorAll('.container-grid-array');
containerGrids.forEach(containerGrid => {
  containerGrid.addEventListener('dragover', (event) => {
    event.preventDefault();
  });


  // Determine the type of container and update the class for resizing of the grid
  containerGrid.addEventListener('drop', (event) => {
    /*
      Add .dragging2 container to .container-grid.
      Add class dropped-box to container grid to hide it.
      Resize container grid depending on which container is in it.
      Check all containers for resizing and double check class removal.
    */
    event.preventDefault();
    const containerBox = document.querySelector('.dragging2');
    const containerGrid = event.target.closest('.container-grid');
    if (containerGrid && containerBox) {
      containerGrid.appendChild(containerBox);
      containerBox.classList.add('dropped-box');

      const classMap = {
        /*
          container class: grid size class
        */
        'two-four': 'has-24child',
        'two-three': 'has-23child',
        'two-two': 'has-22child',
        'one-two': 'has-12child',
        'three-one': 'has-31child',
        'two-one': 'has-21child',
        'one-one': 'has-11child'
      };
      
      for (const className in classMap) {
        if (containerBox.classList.contains(className)) {
          containerGrid.classList.add(classMap[className]);
          break;
        }
      }
    }


    // Reset grid sizing
    const containerGrids = document.querySelectorAll('.container-grid');
    containerGrids.forEach(containerGrid => {
      const containerGridChildren = containerGrid.children;
      if (containerGridChildren.length === 0) {
        containerGrid.classList.remove('has-24child');
        containerGrid.classList.remove('has-23child');
        containerGrid.classList.remove('has-22child');
        containerGrid.classList.remove('has-12child');
        containerGrid.classList.remove('has-31child');
        containerGrid.classList.remove('has-21child');
        containerGrid.classList.remove('has-11child');
      }
    });
  });
});



//|--------------------|
//|     Containers     |
//|--------------------|

// Add a container of a specific size
function addContainer(containerData, type) {
  /*
    Check to make sure there are no unplaced containers by comparing .dropped-box to .container-box.
    Create a new box container element using data from containerData.
    Add all event listeners for the container.
    Show a popup if there is an unplaced container.
    containerData is an array that contains all of the data for each container.
      name:               The name of the container.
      class:              The class for CSS reasons.
      price:              The price in USD.
      num_modules:        Total number of module docks.
      num_angled:         Number of angled module docks.
      num_level:          [Optional] Number of level module docks.
      num_level_2:        [Optional] Number of level module docks in the third row.
      horizontal_ruler:   The dimensions to be displayed on the horizontal ruler.
      vertical_ruler:     The dimensions to be displayed on the vertical ruler.
  */
  const existingBoxes = document.querySelectorAll('.dropped-box');
  const requiredBoxes = document.querySelectorAll('.container-box');
  if (existingBoxes.length === requiredBoxes.length) {

    // Create container
    const containerElement = document.createElement('div');
    containerElement.classList.add('container-box');

    // Choose a random ID
    const counter = Math.floor(Math.random() * 10000).toString() + type;
    containerElement.setAttribute('id', counter);

    // Add container Data
    containerElement.classList.add(containerData.class);
    containerElement.setAttribute('data-name', containerData.name);
    containerElement.setAttribute('data-price', containerData.price);
    containerElement.setAttribute('data-size', containerData.num_modules);
    containerElement.setAttribute('draggable', "true");

    // Add rulers
    function addRuler(ruler_class, ruler_value) {
      const ruler = document.createElement('div');
      ruler.classList.add("ruler");
      ruler.classList.add(ruler_class);
      const rulerLabel = document.createElement('div');
      rulerLabel.classList.add(ruler_class + "-label");
      rulerLabel.classList.add("ruler-label");
      rulerLabel.textContent = ruler_value;
      ruler.appendChild(rulerLabel);
      containerElement.appendChild(ruler);
    };
    addRuler("horizontal-ruler", containerData.horizontal_ruler);
    addRuler("vertical-ruler", containerData.vertical_ruler);


    // Add module docks based on parameters from containerData
    function addModuleDockRow(num_modules, img_type) {
      /*
        Add a row of module docks to the current container.
        Takes 2 parameters:
          num_modules:  Total number of module slots to create.
          img_type:     The image to use, either 'angled' or 'level'.
      */
      const moduleDockRow = document.createElement('div');
      for (let i = 0; i < num_modules; i++) {
        moduleDockRow.classList.add('module-dock-row');

        const moduleDock = document.createElement('div');
        moduleDock.classList.add('module-dock');
        moduleDock.setAttribute('data-type', "type1");
        moduleDock.setAttribute('style', `background-image: url('containers/${img_type}.png'); background-size: cover;`);
        moduleDockRow.appendChild(moduleDock);
      }
      containerElement.appendChild(moduleDockRow);
    };

    // Add module docks
    addModuleDockRow(containerData.num_angled, "angled");
    if (containerData.num_level) {
      addModuleDockRow(containerData.num_level, "level");
    }
    if (containerData.num_level_2) {
      addModuleDockRow(containerData.num_level_2, "level");
    }

    // Add container to canvas
    const canvas = document.getElementById('canvas');
    canvas.appendChild(containerElement);
    updateTotalPrice()

    
    // Handle picking up the container
    const containerBoxes = document.querySelectorAll(type);
    containerBoxes.forEach(containerBox => {

      
      containerBox.addEventListener('dragstart', (event) => {
        /*
          Ensure the ID of the dragstart element matches the same counter from creating the container.
          Store ID for some reason that seems important.
          Add class dragging2 to the element.
          Add class dragging-container to containerGrids for visibility.
          Highlight the Delete Container.
        */
        if (event.target.id === counter) {
            event.dataTransfer.setData('dragged', event.target.id);
            event.target.classList.add('dragging2');
            const id = event.target.id;
            event.dataTransfer.setData('text/plain', id);
            const containerGrids = document.querySelectorAll('.container-grid')
            containerGrids.forEach(containerGrid => {
              containerGrid.classList.add('dragging-container');
            })
            deleteBin.classList.add('highlight');
        }
      });


      // Drop the container
      containerBox.addEventListener('dragend', (event) => {
        /*
          Ensure the ID of the dragstart element matches the same counter from creating the container.
          Remove class dragging2 from the element.
          Add class dragging-container to containerGrids for visibility.
          Highlight the Delete Container.
        */
        if (event.target.id === counter) {
          event.target.classList.remove('dragging2');
          const containerGrids = document.querySelectorAll('.container-grid')
          containerGrids.forEach(containerGrid => {
            containerGrid.classList.remove('dragging-container');
          })
          deleteBin.classList.remove('highlight');
        }
      });
    });


    // Handle module docks on containers
    const moduleDocks = document.querySelectorAll('.module-dock')
    moduleDocks.forEach(moduleDock => {

      // Drag and drop controls
      moduleDock.addEventListener('dragover', e => {
        e.preventDefault()
      })


      moduleDock.addEventListener('drop', () => {
        /*
          Check if holding a module and add it to the module dock.
          Update the price display.
        */
        const draggingModule = document.querySelector('.dragging')
        if (draggingModule) {
          let childModules = moduleDock.querySelectorAll('*');
          if (childModules.length === 0) {
            moduleDock.appendChild(draggingModule);
            draggingModule.classList.remove('dragging');
          }
        }
        updateTotalPrice();
      })


      // Touch controls for mobile
      moduleDock.addEventListener('touchstart', function(event) {
        /*
          Check if there is a selected module and add it to the module dock.
          Hide the tooltip.
          Update the price.
        */
        if (activeModule_mobile) {
          let childElements = moduleDock.querySelectorAll('*');
          if (childElements.length === 0) {
            moduleDock.appendChild(activeModule_mobile);
            let tooltip = activeModule_mobile.querySelector(".tooltip");
            tooltip.style.display = 'none';
            activeModule_mobile = null;
            event.preventDefault()
            updateTotalPrice()
          }
        }
      })
    })

    // Remove welcome message
    let messageElement = document.getElementById("welcome-message");
    messageElement.style.display = "none";

  // Error message if canvas is not cleared when trying to add a new container
  } else {
    Swal.fire({
      title: 'Error',
      text: 'Please drag and drop the current container either to a canvas grid or to the trash before adding a new container.',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Ok',
      buttonsStyling: false,
      showConfirmButton: false,
      customClass: {
        cancelButton: 'btn btn-danger',
      },
    });
  }
}



//|------------------------|
//|     URL Parameters     |
//|------------------------|

// Load a controller from a valid URL
function loadController(inputData, color) {
  /*
    Load a controller from URL config.
    Takes two parameters:
      inputData:    The URL code for the controller configuration.
      color:        The color of the container.
    Add a container to the canvas based on numerical address.
      z[size][address] - Size and Address are both two digits.
    Update price.
  */
  let importConfig = inputData;
  let startIndex = 0;
  let configArray = [];

  // Extract all containers from the string
  while (true) {
    const nextZIndex = importConfig.indexOf('z', startIndex + 1);
    if (nextZIndex === -1) {
      configArray.push(importConfig.substring(startIndex));
      break;
    }
    configArray.push(importConfig.substring(startIndex, nextZIndex));
    startIndex = nextZIndex;
  }


  // Parse the data from the container strings and determine the container type
  for (const config of configArray) {
    const first5Chars = config.substring(0, 5);
    const containerAddress = first5Chars.substring(1);
    const moduleArray = [];
    for (let i = 5; i < config.length; i += 2) {
      moduleArray.push(config.substring(i, i + 2));
    }
    let containerType = '';

    // Add containers based on type and address
    const containerMap = {
      /*
        container code: {container type, container data}
      */
      '11': { type: '.one-one', template: Mark0 },
      '12': { type: '.one-two', template: MarkIhoriz },
      '21': { type: '.two-one', template: MarkIvert },
      '31': { type: '.three-one', template: MarkII },
      '22': { type: '.two-two', template: MarkIII },
      '23': { type: '.two-three', template: MarkIV },
      '24': { type: '.two-four', template: MarkV }
    };
    
    for (const prefix in containerMap) {
      if (containerAddress.startsWith(prefix)) {
        const { type, template } = containerMap[prefix];
        addContainer(template, type);
        containerType = type;
        break;
      }
    }


    // Determine the container address
    const targetContainerId = containerAddress.slice(2);
    const containers = document.querySelectorAll(containerType);
    containers.forEach(container => {
      /*
        Add container to container grid address.
        Add all modules to the container from left to right, top to bottom.
      */
      let parentContainer = container.parentNode;
      if (parentContainer.id.includes('canvas')) {
        if (targetContainerId!=='00') {
          container.classList.add('dropped-box');
          const targetContainer = document.getElementById(targetContainerId);
          targetContainer.insertAdjacentElement('beforeend', container);
        }

        // Get all modules and add them to the containers
        const modules = moduleArray.map(pair => document.getElementById(pair));
        const moduleDocks = container.querySelectorAll(`.module-dock[data-type="type1"]`);
        for (let i = 0; i < moduleArray.length; i++) {
          const module = modules[i];
          const moduleDock = moduleDocks[i];
          if (module) {
            moduleDock.appendChild(module);
          }
        }
      }

      // Set container color
      if (color) {
        container.style.borderColor = color;
      }
    })


    // Update the canvas elements as if someone dragged and dropped the containers and modules
    const containerGrids = document.querySelectorAll('.container-grid');
    containerGrids.forEach(containerGrid => {
      /*
        Check container grids for present containers.
        Update container grid class to reflect child container for resizing.
      */
      const containerGridChildren = Array.from(containerGrid.children);
      if (containerGridChildren) {
        containerGridChildren.forEach(child => {
          
          const classMap = {
            'two-four': 'has-24child',
            'two-three': 'has-23child',
            'two-two': 'has-22child',
            'one-two': 'has-12child',
            'three-one': 'has-31child',
            'two-one': 'has-21child',
            'one-one': 'has-11child'
          };
          
          for (const className in classMap) {
            if (child.classList.contains(className)) {
              containerGrid.classList.add(classMap[className]);
            }
          }
        })
      }
    })
  }
  updateTotalPrice()
}


// Load URL parameters
window.onload = function() {
  if (controllerConfigString) {
    if (controllerConfigString.startsWith('z')) {
      loadController(controllerConfigString, colorConfigString);
    }
  }
}