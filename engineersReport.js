//|---------------------------|
//|     Engineer's Report     |
//|---------------------------|

// Engineer's Report checks for module compatibility and gives a price breakdown of the current configuration.

// Engineer's Report Button
const engineersReport = document.getElementById('report');

// Engineer's Report
engineersReport.addEventListener('click', function() {
  /*
    Build a report popup that gives a price breakdown of all objects on the canvas.
    Provide warnings for conflicts between modules.
  */
  let reportContent = '';
  const containerBoxes = document.querySelectorAll('.container-box');
  let totalPrice = 0;
  let isSizeMismatch = true;

  // Check to make sure each container is filled and display price breakdown
  containerBoxes.forEach(containerBox => {
    const modules = containerBox.querySelectorAll('.module');
    let containerPrice = parseFloat(containerBox.getAttribute('data-price'));
    totalPrice += containerPrice;

    // Make sure all module docks are filled
    if (modules.length != parseInt(containerBox.getAttribute('data-size'))) {
      isSizeMismatch = false;
    }

    // Add the price of each module
    modules.forEach(module => {
      const price = parseFloat(module.getAttribute('data-price'));
      totalPrice += price;
    });

    // Show price
    if (containerPrice > 0) {
      reportContent += `<p style="color: #4d9de3;"><strong>${containerBox.getAttribute('data-name')}</strong> - $${containerPrice.toFixed(2)}</p>`;
      modules.forEach(module => {
        const price = parseFloat(module.getAttribute('data-price'));
        reportContent += `<p>&emsp;${module.getAttribute('data-name')} - $${price.toFixed(2)}</p>`;
      });
      reportContent += `<hr>`;
    } else {
      reportContent += `<p style="color: #df7070;">${containerBox.getAttribute('data-name')} - <em>No items selected</em></p>`;
      reportContent += `<hr>`;
    }
  });

  /*
    Check for conflicts across all containers.
      allHasFunctions:      Array of all functions on the controller.
      allNeedsFunctions:    Array of all needed functions on the controller.
      telemetryConflict:    True if a Telemetry module exists in a container that also has another data-hungry module.
      hasRotOrTrans:        True if any container has Translation or Rotation functions.
      rotTransSeparated:    True if Translation and Rotation are found on separate containers.
  */
  const allHasFunctions = [];
  const allNeedsFunctions = [];
  let telemetryConflict;
  let hasRotOrTrans;
  let rotTransSeparated;

  // Iterate through each container box
  containerBoxes.forEach(containerBox => {
    /*
      Compile data from each container.
        needsData:                      The container has a module that needs data.
        hasTelemetry:                   The container has a Telemetry module.
        checkedRotTransThisContainer:   The container has gone through a check for Translation or Rotation.
    */
    let needsData;
    let hasTelemetry;
    let checkedRotTransThisContainer;
    const modules = containerBox.querySelectorAll('.module');

    // Iterate through each module
    modules.forEach(module => {
      /*
      Compile data from each module by iterating through and comparing has, needs, and needs_data.
        has:        The functions that the module has.
        needs:      The functions that the module needs from other modules.
        needs_data: True if the module requires data from Simpit.
      */
      const matchingModuleData = moduleData.find(data => data.name === module.getAttribute('data-name'));
      if (matchingModuleData) {
        const hasValues = matchingModuleData.has;
        const needsValues = matchingModuleData.needs;

        // Compile a list of functions on the container and set relevant flags
        if (hasValues) {
          allHasFunctions.push(...hasValues);
          if ((hasValues.includes("Rotation") || hasValues.includes("Translation")) && !checkedRotTransThisContainer) {
            checkedRotTransThisContainer = true;
            if (!hasRotOrTrans) {
              hasRotOrTrans = true;
            } else {
              rotTransSeparated = true;
            }
          }
          if (hasValues.includes("Telemetry")) {
            hasTelemetry = true;
          }
        }

        // Compile a list of functions missing from the container
        if (needsValues) {
          allNeedsFunctions.push(...needsValues);
        }

        // Mark true if any module requires data from Simpit
        if (matchingModuleData.needs_data) {
          needsData = true;
        }
      }
    });

    // Mark true if a Telemetry module exists in a container with another data-hungry module
    if (needsData && hasTelemetry) {
        telemetryConflict = true;
    }
  });

  console.log(allHasFunctions);

  // Check if there are any duplicate hasFunctions
  const hasFunctionDuplicates = [];
  const encounteredItems = [];
  allHasFunctions.forEach(item => {
    if (encounteredItems.includes(item)) {
      if (!hasFunctionDuplicates.includes(item)) {
        hasFunctionDuplicates.push(item);
      }
    } else {
      encounteredItems.push(item);
    }
  });

  // Check if there are any missing needsFunctions
  const missingFunctions = [];
  allNeedsFunctions.forEach(item => {
    if (!allHasFunctions.includes(item)) {
      if (!missingFunctions.includes(item)) {
        missingFunctions.push(item);
      }
    }
  })

  // Give a recommendation based on conflicts if canvas is populated
  recommendation = '';
  if (totalPrice > 0){
    /*
      Create recommendation text with colors given the following criteria.
        isSizeMismatch:                   True if all module docks are filled.
        hasFunctionDuplicates.length:     Zero if there are no duplicate functions.
        missingFunctions.length:          Zero if there are no missing functions.
        telemetryConflict:                True if Telemetry Module exists with other data-hungry modules.
        rotTransSeparated:                True if Translation and Rotation modules are on separate containers.
    */
    if ((!isSizeMismatch) || (hasFunctionDuplicates.length > 0) || (missingFunctions.length > 0) || (telemetryConflict) || (rotTransSeparated)) {
        recommendation += `<hr><p style="color: #afe06b;"><strong>Warning:</strong></p>`;
      if (!isSizeMismatch) {
        recommendation += `<p style="color: #ee2828;">One or more of your containers does not have the correct number of modules.</p>`;
      }
      if (hasFunctionDuplicates.length > 0) {
        recommendation += `<p style="color: #ffe600;">You have too many ways to control ${hasFunctionDuplicates.join(', ')}.</p>`;
      }
      if (missingFunctions.length > 0) {
        recommendation += `<p style="color: #ffe600;">You are missing a way to control ${missingFunctions.join(', ')}.</p>`;
      }
      if (telemetryConflict) {
        recommendation += `<p style="color: #ffe600;">You are using the Telemetry module with another module that needs data from Simpit. This will result in the second module's displays not updating properly. Please use multiple containers instead.</p>`;
      }
      if (rotTransSeparated) {
        recommendation += `<p style="color: #ffe600;">The Rotation and Translation modules must be in the same container.</p>`;
      }

    // No conflicts found
    } else {
      recommendation += `<p style="color: #22aa37;">This controller has passed all checks.</p>`;
    }
  }
  recommendation += `<hr>`;

  // Display the final price
  const report = `
    <div>
      ${reportContent}
      <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
      ${recommendation}
    </div>
  `;

  // Activate the button
  Swal.fire({
    title: 'Engineer\'s Report',
    html: report,
    showCancelButton: true,
    cancelButtonText: 'Ok',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});