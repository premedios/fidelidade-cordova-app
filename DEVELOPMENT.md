# Development Guide

This guide explains how to extend the Fidelidade Cordova App Template with your own plugin testing buttons and functionality.

## Table of Contents

- [Adding Test Buttons](#adding-test-buttons)
- [JavaScript Event Handling](#javascript-event-handling)
- [Logging System](#logging-system)
- [Plugin Integration Patterns](#plugin-integration-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Adding Test Buttons

### Step 1: Add HTML Button

The template includes a commented example showing the preferred button pattern. Follow this structure when adding your own buttons:

```html
<!-- In template_src/www/index.html, inside the button-section -->
<section class="button-section">
    <!-- 
        PREFERRED BUTTON PATTERN FOR PLUGIN TESTING:
        This is the recommended way to create buttons for testing plugin functionality.
        - Use descriptive IDs (check-availability-btn)
        - Apply consistent CSS classes (test-button)
        - Clear, action-oriented button text
        - Set up corresponding event listeners in JS
    -->
    <!-- <button id="check-availability-btn" class="test-button">Check Plugin Status</button> -->
    
    <!-- Add your new buttons here following the same pattern -->
    <button id="my-plugin-btn" class="test-button">Test My Plugin</button>
    <button id="another-feature-btn" class="test-button test-button-orange">Test Feature</button>
</section>
```

### Step 2: Button Styling Classes

Use these predefined CSS classes for consistent styling:

| Class | Description | Appearance |
|-------|-------------|------------|
| `test-button` | Default button style | Blue gradient |
| `test-button test-button-orange` | Orange variant | Orange gradient |
| `test-button secondary` | Secondary style | Different visual weight |

### Step 3: Button ID Naming Convention

Follow this naming pattern for button IDs:
- Use kebab-case: `my-plugin-btn`
- Be descriptive: `camera-take-photo-btn`
- End with `-btn`: `geolocation-get-position-btn`

## JavaScript Event Handling

### Step 1: Add Event Listener in setupEventListeners()

```javascript
// In template_src/www/js/index.js
function setupEventListeners() {
    // Existing listeners...
    
    // Add your new button listeners
    const myPluginBtn = document.getElementById('my-plugin-btn');
    if (myPluginBtn) {
        myPluginBtn.addEventListener('click', handleMyPlugin);
    }
    
    const anotherFeatureBtn = document.getElementById('another-feature-btn');
    if (anotherFeatureBtn) {
        anotherFeatureBtn.addEventListener('click', handleAnotherFeature);
    }
    
    // Clear logs button (already implemented)
    const clearBtn = document.getElementById('clear-log-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearLogs);
    }
}
```

### Step 2: Implement Handler Functions

Create handler functions following this pattern:

```javascript
function handleMyPlugin() {
    log('🔄 Testing my plugin...');
    
    // Check if plugin is available
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.MyPlugin) {
        log('✅ MyPlugin is available');
        
        try {
            cordova.plugins.MyPlugin.doSomething(
                function(result) {
                    log('✅ Plugin call successful');
                    log('Result: ' + JSON.stringify(result));
                },
                function(error) {
                    log('❌ Plugin call failed: ' + error);
                }
            );
        } catch (error) {
            log('❌ Exception in handleMyPlugin: ' + error.message);
        }
    } else {
        log('⚠️ MyPlugin is not available');
        // Provide fallback or information
        alert('MyPlugin is not installed. Please add it with: cordova plugin add my-plugin');
    }
}

function handleAnotherFeature() {
    log('🔄 Testing another feature...');
    
    // Example of testing device information
    if (typeof device !== 'undefined') {
        log('✅ Device plugin available');
        log('Platform: ' + device.platform);
        log('Version: ' + device.version);
        log('Model: ' + device.model);
    } else {
        log('⚠️ Device plugin not available');
    }
}
```

## Logging System

The template includes a comprehensive logging system for debugging and user feedback.

### Basic Logging

Use the `log()` function for all output:

```javascript
// Simple message
log('App initialized');

// Success message with emoji
log('✅ Operation completed successfully');

// Warning message
log('⚠️ Plugin not available');

// Error message
log('❌ Operation failed');

// Information with data
log('📱 Platform: ' + cordova.platformId);
```

### Log Function Features

The `log()` function automatically:
- Adds timestamp to each entry
- Displays in the UI log area
- Outputs to browser console
- Scrolls to show latest entries
- Handles long messages gracefully

### Log Categories and Emojis

Use these emojis for consistent log categorization:

| Category | Emoji | Example |
|----------|-------|---------|
| Process | 🔄 | `log('🔄 Loading data...')` |
| Success | ✅ | `log('✅ Data loaded successfully')` |
| Warning | ⚠️ | `log('⚠️ Plugin not available')` |
| Error | ❌ | `log('❌ Network request failed')` |
| Information | ℹ️ | `log('ℹ️ Using fallback method')` |
| Data | 📱 | `log('📱 Device: ' + device.model)` |

### Advanced Logging Examples

```javascript
// Logging with JSON data
function logDeviceInfo() {
    if (typeof device !== 'undefined') {
        const deviceInfo = {
            platform: device.platform,
            version: device.version,
            model: device.model,
            cordova: device.cordova
        };
        log('📱 Device Info: ' + JSON.stringify(deviceInfo, null, 2));
    }
}

// Logging plugin availability
function checkPluginAvailability(pluginName, pluginObject) {
    if (pluginObject) {
        log(`✅ ${pluginName} plugin is available`);
        return true;
    } else {
        log(`❌ ${pluginName} plugin is not available`);
        return false;
    }
}

// Logging with error handling
function safePluginCall(pluginName, operation) {
    log(`🔄 Executing ${pluginName} ${operation}...`);
    
    try {
        // Your plugin call here
        log(`✅ ${pluginName} ${operation} completed`);
    } catch (error) {
        log(`❌ ${pluginName} ${operation} failed: ${error.message}`);
        console.error(`${pluginName} error:`, error);
    }
}
```

### Clearing Logs

Users can clear logs using the "Clear Logs" button, which calls:

```javascript
function clearLogs() {
    const logOutput = document.getElementById('log-output');
    if (logOutput) {
        logOutput.innerHTML = '';
    }
    console.clear();
    log('Logs cleared');
}
```

## Plugin Integration Patterns

### Pattern 1: Simple Plugin Check

```javascript
function testSimplePlugin() {
    log('🔄 Testing simple plugin...');
    
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.SimplePlugin) {
        log('✅ SimplePlugin available');
        
        cordova.plugins.SimplePlugin.execute(
            result => log('✅ Result: ' + result),
            error => log('❌ Error: ' + error)
        );
    } else {
        log('⚠️ SimplePlugin not available');
    }
}
```

### Pattern 2: Complex Plugin with Options

```javascript
function testComplexPlugin() {
    log('🔄 Testing complex plugin with options...');
    
    if (!checkPluginAvailability('ComplexPlugin', cordova.plugins?.ComplexPlugin)) {
        return;
    }
    
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000
    };
    
    log('ℹ️ Options: ' + JSON.stringify(options));
    
    cordova.plugins.ComplexPlugin.execute(
        options,
        function(result) {
            log('✅ Complex plugin success');
            log('📱 Result data: ' + JSON.stringify(result));
        },
        function(error) {
            log('❌ Complex plugin error: ' + error.message);
            log('ℹ️ Error code: ' + error.code);
        }
    );
}
```

### Pattern 3: Plugin with Permissions

```javascript
function testPluginWithPermissions() {
    log('🔄 Testing plugin that requires permissions...');
    
    // Check plugin availability
    if (!cordova.plugins || !cordova.plugins.PermissionPlugin) {
        log('❌ PermissionPlugin not available');
        return;
    }
    
    // Check permissions first
    cordova.plugins.PermissionPlugin.hasPermission(
        cordova.plugins.PermissionPlugin.PERMISSION.CAMERA,
        function(result) {
            if (result.hasPermission) {
                log('✅ Camera permission granted');
                executeCameraFunction();
            } else {
                log('⚠️ Camera permission not granted, requesting...');
                requestCameraPermission();
            }
        }
    );
}

function requestCameraPermission() {
    cordova.plugins.PermissionPlugin.requestPermission(
        cordova.plugins.PermissionPlugin.PERMISSION.CAMERA,
        function(result) {
            if (result.hasPermission) {
                log('✅ Camera permission granted after request');
                executeCameraFunction();
            } else {
                log('❌ Camera permission denied by user');
            }
        },
        function(error) {
            log('❌ Permission request error: ' + error);
        }
    );
}
```

## Best Practices

### 1. Error Handling

Always wrap plugin calls in try-catch blocks and provide meaningful error messages:

```javascript
function robustPluginCall() {
    try {
        if (!cordova?.plugins?.MyPlugin) {
            throw new Error('MyPlugin not available');
        }
        
        cordova.plugins.MyPlugin.doSomething(
            result => log('✅ Success: ' + JSON.stringify(result)),
            error => log('❌ Plugin error: ' + error)
        );
    } catch (error) {
        log('❌ Exception: ' + error.message);
        console.error('Plugin call error:', error);
    }
}
```

### 2. User Feedback

Provide clear feedback for all states:

```javascript
function wellDesignedPluginTest() {
    const button = document.getElementById('my-plugin-btn');
    
    // Disable button during operation
    button.disabled = true;
    button.textContent = 'Testing...';
    
    log('🔄 Starting plugin test...');
    
    // Your plugin operation here
    someAsyncOperation()
        .then(result => {
            log('✅ Plugin test completed successfully');
            log('📱 Result: ' + JSON.stringify(result));
        })
        .catch(error => {
            log('❌ Plugin test failed: ' + error.message);
        })
        .finally(() => {
            // Re-enable button
            button.disabled = false;
            button.textContent = 'Test My Plugin';
            log('ℹ️ Plugin test finished');
        });
}
```

### 3. Progressive Enhancement

Design functions to work with or without plugins:

```javascript
function progressiveFeature() {
    if (cordova?.plugins?.EnhancedPlugin) {
        log('✅ Using enhanced plugin functionality');
        useEnhancedFeature();
    } else if (cordova?.plugins?.BasicPlugin) {
        log('ℹ️ Using basic plugin functionality');
        useBasicFeature();
    } else {
        log('ℹ️ Using fallback functionality');
        useFallbackFeature();
    }
}
```

## Troubleshooting

### Common Issues

1. **Button not responding**
   - Check if event listener is properly added in `setupEventListeners()`
   - Verify button ID matches exactly (case-sensitive)
   - Ensure button exists in DOM when listener is attached

2. **Plugin not available**
   - Check if plugin is installed: `cordova plugin list`
   - Verify plugin is compatible with current Cordova version
   - Ensure `deviceready` event has fired before calling plugins

3. **Logs not appearing**
   - Check if `log-output` element exists in HTML
   - Verify `log()` function is called correctly
   - Check browser console for JavaScript errors

### Debugging Tips

```javascript
// Add debug information to your handlers
function debugPluginCall() {
    log('🔧 Debug: Starting plugin call');
    log('🔧 Debug: Cordova available: ' + (typeof cordova !== 'undefined'));
    log('🔧 Debug: Plugins object: ' + (cordova?.plugins ? 'exists' : 'missing'));
    log('🔧 Debug: Target plugin: ' + (cordova?.plugins?.MyPlugin ? 'available' : 'missing'));
    
    // Your plugin call here
}

// Log all available plugins
function debugAvailablePlugins() {
    if (cordova?.plugins) {
        const pluginNames = Object.keys(cordova.plugins);
        log('🔧 Available plugins: ' + pluginNames.join(', '));
    } else {
        log('🔧 No plugins available');
    }
}
```

### Testing Checklist

Before adding new functionality, verify:

- [ ] Button HTML follows the preferred pattern
- [ ] Event listener is added in `setupEventListeners()`
- [ ] Handler function includes proper error handling
- [ ] All plugin calls are wrapped in availability checks
- [ ] Meaningful log messages guide the user
- [ ] Fallback behavior is implemented where appropriate
- [ ] Button states are managed (disabled during operations)
- [ ] Success and error cases are both tested

## Example: Complete Feature Implementation

Here's a complete example showing how to add a geolocation test feature:

### 1. HTML (add to button-section)

```html
<button id="geolocation-btn" class="test-button">Test Geolocation</button>
```

### 2. JavaScript Event Listener

```javascript
// Add to setupEventListeners()
const geoBtn = document.getElementById('geolocation-btn');
if (geoBtn) {
    geoBtn.addEventListener('click', testGeolocation);
}
```

### 3. Handler Function

```javascript
function testGeolocation() {
    const button = document.getElementById('geolocation-btn');
    button.disabled = true;
    button.textContent = 'Getting Location...';
    
    log('🔄 Testing geolocation...');
    
    if (!navigator.geolocation) {
        log('❌ Geolocation not supported by this device');
        resetGeolocationButton();
        return;
    }
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };
    
    log('ℹ️ Geolocation options: ' + JSON.stringify(options));
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            log('✅ Geolocation success');
            log('📱 Latitude: ' + position.coords.latitude);
            log('📱 Longitude: ' + position.coords.longitude);
            log('📱 Accuracy: ' + position.coords.accuracy + ' meters');
            resetGeolocationButton();
        },
        function(error) {
            log('❌ Geolocation error: ' + error.message);
            log('ℹ️ Error code: ' + error.code);
            resetGeolocationButton();
        },
        options
    );
}

function resetGeolocationButton() {
    const button = document.getElementById('geolocation-btn');
    button.disabled = false;
    button.textContent = 'Test Geolocation';
}
```

This example demonstrates all the best practices: proper error handling, user feedback, logging, button state management, and progressive enhancement.