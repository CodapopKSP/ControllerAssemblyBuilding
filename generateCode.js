//|===========================|
//|     Generate Firmware     |
//|===========================|

(function() {
    // Map of module codes to filenames
    // Files that contain multiple codes need to be checked for any matching code
    const moduleFiles = {
        'a1': 'a1.ino', 'a2': 'a2.ino', 'a3': 'a3.ino',
        'a4': 'a4.ino',
        'a5': 'a5.ino',
        'b1': 'b1.ino',
        'b2': 'b2.ino',
        'b3': 'b3.ino',
        'b4': 'b4.ino',
        'b5': 'b5.ino',
        'c1': 'c1.ino',
        'd1': 'd1.ino',
        'e1': 'e1.ino',
        'f1': 'f1f2.ino', 'f2': 'f1f2.ino',
        'f3': 'f3.ino', 'f4': 'f4.ino',
        'f5': 'f5.ino',
        'f6': 'f6.ino',
        'g1': 'g1.ino',
        'h1': 'h1.ino', 'h2': 'h2.ino', 'h3': 'h3.ino'
    };

    function parseConfigFromURL(url) {
        try {
            const urlObj = new URL(url);
            const configParam = urlObj.searchParams.get('config');
            return configParam || null;
        } catch (e) {
            // If URL parsing fails, try to extract config manually
            const match = url.match(/[?&]config=([^&]+)/);
            return match ? match[1] : null;
        }
    }

    function extractModuleCodes(configString) {
        // Extract letter-number pairs from config string
        // Pattern: letter followed by one or more digits
        const codes = [];
        const regex = /([a-z])(\d+)/gi;
        let match;
        
        while ((match = regex.exec(configString)) !== null) {
            const code = match[1].toLowerCase() + match[2];
            codes.push(code);
        }
        
        return codes;
    }

    function getUniqueFiles(codes) {
        const fileSet = new Set();
        
        codes.forEach(code => {
            if (moduleFiles[code]) {
                fileSet.add(moduleFiles[code]);
            }
        });
        
        return Array.from(fileSet);
    }

    async function fetchFileContent(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            throw new Error(`Error fetching ${filePath}: ${error.message}`);
        }
    }

    async function getModuleFileContent(basePath, fileName) {
        const bundledModules = window.firmwareModuleFiles || {};
        if (Object.prototype.hasOwnProperty.call(bundledModules, fileName)) {
            return bundledModules[fileName];
        }

        return await fetchFileContent(basePath + 'Modules/' + fileName);
    }

    function parseFileSections(content) {
        const sections = {
            transmissions: [],
            actions: [],
            actionResults: [],
            action: [],
            messageHandler: [],
            emulation: [],
            definitions: []
        };

        const lines = content.split('\n');
        let currentSection = null;
        let sectionContent = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Check for section headers (support both old and new formats for backward compatibility)
            const trimmedLine = line.trim();
            if (trimmedLine === '// Transmissions') {
                // Save previous section if exists
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'transmissions';
                sectionContent = [];
            } else if (trimmedLine === '// Enable Action') {
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'actions';
                sectionContent = [];
            } else if (trimmedLine === '// Action Results') {
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'actionResults';
                sectionContent = [];
            } else if (trimmedLine === '// Action') {
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'action';
                sectionContent = [];
            } else if (trimmedLine === '// Message Handler') {
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'messageHandler';
                sectionContent = [];
            } else if (trimmedLine === '// Keyboard Emulation') {
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'emulation';
                sectionContent = [];
            } else if (trimmedLine === '// definitions') {
                if (currentSection && sectionContent.length > 0) {
                    const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
                    if (sectionText) {
                        sections[currentSection].push(sectionText);
                    }
                }
                currentSection = 'definitions';
                sectionContent = [];
            } else if (currentSection) {
                // Add line to current section
                sectionContent.push(line);
            }
        }

        // Save the last section
        if (currentSection && sectionContent.length > 0) {
            const sectionText = sectionContent.join('\n').replace(/\s+$/, '');
            if (sectionText) {
                sections[currentSection].push(sectionText);
            }
        }

        return sections;
    }

    function combineSections(allSections) {
        const combined = {
            transmissions: [],
            actions: [],
            actionResults: [],
            action: [],
            messageHandler: [],
            emulation: [],
            definitions: []
        };

        // Combine all sections from all files
        allSections.forEach(fileSections => {
            if (fileSections.transmissions.length > 0) {
                combined.transmissions.push(...fileSections.transmissions);
            }
            if (fileSections.actions.length > 0) {
                combined.actions.push(...fileSections.actions);
            }
            if (fileSections.actionResults.length > 0) {
                combined.actionResults.push(...fileSections.actionResults);
            }
            if (fileSections.action.length > 0) {
                combined.action.push(...fileSections.action);
            }
            if (fileSections.messageHandler.length > 0) {
                combined.messageHandler.push(...fileSections.messageHandler);
            }
            if (fileSections.emulation.length > 0) {
                combined.emulation.push(...fileSections.emulation);
            }
            if (fileSections.definitions.length > 0) {
                combined.definitions.push(...fileSections.definitions);
            }
        });

        return combined;
    }

    function insertIntoTransmissionsFunction(templateContent, transmissionsContent) {
        // Find the transmissions() function and insert content
        const lines = templateContent.split('\n');
        const result = [];
        let inTransmissionsFunction = false;
        let inserted = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.trim().startsWith('void transmissions()')) {
                inTransmissionsFunction = true;
                result.push(line);
                continue;
            }
            
            if (inTransmissionsFunction && line.trim() === '}') {
                // Insert transmissions content before closing brace
                if (transmissionsContent && !inserted) {
                    // Add content with proper indentation
                    const transmissionLines = transmissionsContent.split('\n');
                    transmissionLines.forEach(tLine => {
                        if (tLine.trim()) {
                            result.push('  ' + tLine);
                        }
                    });
                    inserted = true;
                }
                result.push(line);
                inTransmissionsFunction = false;
                continue;
            }
            
            // Skip only empty lines inside the function (keep the comment)
            if (inTransmissionsFunction && line.trim() === '') {
                continue;
            }
            
            result.push(line);
        }

        return result.join('\n');
    }

    function insertIntoActionsFunction(templateContent, actionsContent) {
        // Find the actions() function and insert content
        const lines = templateContent.split('\n');
        const result = [];
        let inActionsFunction = false;
        let inserted = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.trim().startsWith('void actions()')) {
                inActionsFunction = true;
                result.push(line);
                continue;
            }
            
            if (inActionsFunction && line.trim() === '}') {
                // Insert actions content before closing brace
                if (actionsContent && !inserted) {
                    // Add content with proper indentation
                    const actionLines = actionsContent.split('\n');
                    actionLines.forEach(aLine => {
                        if (aLine.trim()) {
                            result.push('  ' + aLine);
                        }
                    });
                    inserted = true;
                }
                result.push(line);
                inActionsFunction = false;
                continue;
            }
            
            // Skip empty lines inside the function
            if (inActionsFunction && line.trim() === '') {
                continue;
            }
            
            result.push(line);
        }

        return result.join('\n');
    }

    function insertIntoMessageHandlerFunction(templateContent, messageHandlerContent) {
        // Find the messageHandler() function and insert content before the closing brace of the switch
        const lines = templateContent.split('\n');
        const result = [];
        let inMessageHandlerFunction = false;
        let inSwitchStatement = false;
        let braceDepth = 0;
        let inserted = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.trim().startsWith('void messageHandler(')) {
                inMessageHandlerFunction = true;
                result.push(line);
                continue;
            }
            
            if (inMessageHandlerFunction && line.trim().startsWith('switch(')) {
                inSwitchStatement = true;
                braceDepth = 1;
                result.push(line);
                continue;
            }
            
            if (inSwitchStatement) {
                // Count braces to find the end of the switch statement
                const openBraces = (line.match(/{/g) || []).length;
                const closeBraces = (line.match(/}/g) || []).length;
                
                // Check if this line will close the switch statement (before updating braceDepth)
                // We're at switch level (braceDepth = 1) and this line has a closing brace
                if (braceDepth === 1 && closeBraces > 0 && line.trim() === '}') {
                    // This is the closing brace of the switch, insert content before it
                    if (messageHandlerContent && !inserted) {
                        console.log('Inserting messageHandler content before switch closing brace');
                        // Add content with proper indentation
                        // The content from modules already has indentation, preserve it
                        const handlerLines = messageHandlerContent.split('\n');
                        handlerLines.forEach(hLine => {
                            if (hLine.trim()) {
                                // Preserve the original indentation from the module file
                                result.push(hLine);
                            }
                        });
                        inserted = true;
                    }
                }
                
                braceDepth += openBraces - closeBraces;
                
                // Push the line after checking and updating braceDepth
                result.push(line);
                
                if (braceDepth === 0) {
                    inSwitchStatement = false;
                }
                continue;
            }
            
            if (inMessageHandlerFunction && !inSwitchStatement && line.trim() === '}') {
                // This is the closing brace of the function
                result.push(line);
                inMessageHandlerFunction = false;
                continue;
            }
            
            result.push(line);
        }

        return result.join('\n');
    }

    async function createArduinoProject(files) {
        const basePath = 'firmware/';
        const allSections = [];

        // Fetch and parse all module files
        for (const file of files) {
            try {
                const content = await getModuleFileContent(basePath, file);
                const sections = parseFileSections(content);
                allSections.push(sections);
            } catch (error) {
                console.error(`Error processing ${file}:`, error);
                throw error;
            }
        }

        // Combine all sections
        const combined = combineSections(allSections);

        // Read template files
        const systemFunctionsTemplate = await fetchFileContent(basePath + '01_System_Functions.ino');
        const actionsTemplate = await fetchFileContent(basePath + '03_Actions.ino');
        const actionResultsTemplate = await fetchFileContent(basePath + 'actionResults.h');
        const transmissionsTemplate = await fetchFileContent(basePath + '02_Transmissions.ino');
        const settingsTemplate = await fetchFileContent(basePath + 'settings.h');
        const definitionsTemplate = await fetchFileContent(basePath + 'definitions.h');

        // Build the modified files
        let systemFunctionsContent = systemFunctionsTemplate;
        if (combined.transmissions.length > 0) {
            const transmissionsContent = combined.transmissions.join('\n');
            systemFunctionsContent = insertIntoTransmissionsFunction(systemFunctionsContent, transmissionsContent);
        }
        if (combined.actions.length > 0) {
            const actionsContent = combined.actions.join('\n');
            systemFunctionsContent = insertIntoActionsFunction(systemFunctionsContent, actionsContent);
        }

        let actionsContent = actionsTemplate;
        if (combined.action.length > 0) {
            const actionContent = combined.action.join('\n');
            actionsContent += '\n' + actionContent;
        }

        let actionResultsContent = actionResultsTemplate;
        if (combined.actionResults.length > 0) {
            const actionResultsText = combined.actionResults.join('\n');
            
            // Check if EVA_List_Analog is defined in the actionResults (from Translation module)
            // If so, replace the default definition in actionResults.h
            if (actionResultsText.includes('EVA_List_Analog')) {
                // Remove the default EVA_List_Analog definition from template
                // Match from the comment through the closing brace and semicolon
                actionResultsContent = actionResultsContent.replace(
                    /\/\/ Default EVA_List_Analog[^\n]*\nuint8_t EVA_List_Analog\[11\] = \{[^}]*\};/s,
                    ''
                );
                // Clean up any extra blank lines
                actionResultsContent = actionResultsContent.replace(/\n\n\n+/g, '\n\n');
                // Add the module's definition
                actionResultsContent += '\n' + actionResultsText;
            } else {
                // No EVA_List_Analog in modules, keep default and append other actionResults
                actionResultsContent += '\n' + actionResultsText;
            }
        }

        let transmissionsContent = transmissionsTemplate;
        if (combined.messageHandler.length > 0) {
            // CAGSTATUS_MESSAGE: a4, h1, h2, h3 contribute only the inner if block; merge into one case
            const fullCases = combined.messageHandler.filter(block => /^\s*case\s+\w+:/m.test(block));
            const cagStatusInnerBlocks = combined.messageHandler.filter(block => !/^\s*case\s+\w+:/m.test(block));
            const cagStatusWrapperStart = `    case CAGSTATUS_MESSAGE:
      if (Action_Ctrl_Con or Action2_Ctrl_Con or Action3_Ctrl_Con or EA_Groups_Ctrl_Con) {
        if (msgSize == sizeof(cagStatusMessage)) {
          cagStatusMessage myAG;
          myAG = parseCAGStatusMessage(msg);
`;
            const cagStatusWrapperEnd = `
        }
      }
      break;
`;
            const messageHandlerParts = [...fullCases];
            if (cagStatusInnerBlocks.length > 0) {
                messageHandlerParts.push(cagStatusWrapperStart + cagStatusInnerBlocks.join('\n') + cagStatusWrapperEnd);
            }
            const messageHandlerText = messageHandlerParts.join('\n');
            console.log('MessageHandler content to insert:', messageHandlerText);
            transmissionsContent = insertIntoMessageHandlerFunction(transmissionsContent, messageHandlerText);
        } else {
            console.log('No messageHandler content found');
        }

        let settingsContent = settingsTemplate;
        if (combined.emulation.length > 0) {
            // Remove duplicates - keep only first occurrence of each #define
            const seenDefines = new Set();
            const uniqueEmulation = [];
            
            combined.emulation.forEach(emulationSection => {
                const lines = emulationSection.split('\n');
                const sectionLines = [];
                
                lines.forEach(line => {
                    // Check if this is a #define line
                    const defineMatch = line.match(/^\s*#define\s+(\w+)/);
                    if (defineMatch) {
                        const defineName = defineMatch[1];
                        if (!seenDefines.has(defineName)) {
                            seenDefines.add(defineName);
                            sectionLines.push(line);
                        }
                        // Skip duplicate
                    } else {
                        // Not a #define, always include
                        sectionLines.push(line);
                    }
                });
                
                if (sectionLines.length > 0) {
                    uniqueEmulation.push(sectionLines.join('\n'));
                }
            });
            
            if (uniqueEmulation.length > 0) {
                const emulationText = uniqueEmulation.join('\n\n');
                settingsContent += '\n' + emulationText;
            }
        }

        let definitionsContent = definitionsTemplate;
        if (combined.definitions.length > 0) {
            const definitionsText = combined.definitions.join('\n');
            definitionsContent += '\n' + definitionsText;
        }

        return {
            '01_System_Functions.ino': systemFunctionsContent,
            '03_Actions.ino': actionsContent,
            'actionResults.h': actionResultsContent,
            '02_Transmissions.ino': transmissionsContent,
            'settings.h': settingsContent,
            'definitions.h': definitionsContent
        };
    }

    async function createZip(modifiedFiles) {
        const zip = new JSZip();
        const basePath = 'firmware/';
        const folderName = 'Hub_3_0/';

        // Add modified files
        zip.file(folderName + '01_System_Functions.ino', modifiedFiles['01_System_Functions.ino']);
        zip.file(folderName + '03_Actions.ino', modifiedFiles['03_Actions.ino']);
        zip.file(folderName + 'actionResults.h', modifiedFiles['actionResults.h']);
        zip.file(folderName + '02_Transmissions.ino', modifiedFiles['02_Transmissions.ino']);
        zip.file(folderName + 'settings.h', modifiedFiles['settings.h']);

        // Add other necessary project files
        const projectFiles = [
            'Hub_3_0.ino',
            '04_Analog.ino',
            'definitions.h'
        ];

        for (const file of projectFiles) {
            try {
                const content = await fetchFileContent(basePath + file);
                zip.file(folderName + file, content);
            } catch (error) {
                console.error(`Error adding ${file} to zip:`, error);
                // Continue even if some files fail
            }
        }

        // Override / add the generated definitions.h so that any module-specific
        // definitions collected during generation are included in the project.
        if (modifiedFiles['definitions.h']) {
            zip.file(folderName + 'definitions.h', modifiedFiles['definitions.h']);
        }

        return await zip.generateAsync({ type: 'blob' });
    }

    function downloadZip(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Generate Arduino project zip from a config string (same format as URL ?config= value).
     * Exposed for use by the parent CAB page "Code" button.
     * @param {string} configString - e.g. "z2400h1b1b4g1a3f3f5f6" (no URL, no &color)
     * @returns {Promise<Blob>} zip file blob
     */
    window.generateArduinoZipFromConfig = async function(configString) {
        if (!configString || typeof configString !== 'string') {
            throw new Error('Config string is required');
        }
        const codes = extractModuleCodes(configString);
        if (codes.length === 0) {
            throw new Error('No valid module codes found in config');
        }
        const files = getUniqueFiles(codes);
        if (files.length === 0) {
            throw new Error('No matching files found for the provided codes');
        }
        const modifiedFiles = await createArduinoProject(files);
        return await createZip(modifiedFiles);
    };

    // Generate-code test page: wire input/button/output only if they exist
    document.addEventListener('DOMContentLoaded', function() {
        const textInput = document.getElementById('textInput');
        const generateBtn = document.getElementById('generateBtn');
        const output = document.getElementById('output');
        if (!textInput || !generateBtn || !output) return;

        generateBtn.addEventListener('click', async function() {
            const inputValue = textInput.value.trim();
            if (!inputValue) {
                output.textContent = 'Please enter a URL.';
                output.style.display = 'block';
                return;
            }
            output.textContent = 'Processing...';
            output.style.display = 'block';
            generateBtn.disabled = true;
            try {
                const configString = parseConfigFromURL(inputValue);
                if (!configString) {
                    throw new Error('No config parameter found in URL');
                }
                const zipBlob = await window.generateArduinoZipFromConfig(configString);
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                downloadZip(zipBlob, `arduino_project_${timestamp}.zip`);
                output.textContent = `Success! Generated Arduino project.`;
                output.style.color = '#28a745';
            } catch (error) {
                output.textContent = `Error: ${error.message}`;
                output.style.color = '#dc3545';
                console.error('Error:', error);
            } finally {
                generateBtn.disabled = false;
            }
        });

        textInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateBtn.click();
            }
        });
    });
})();

