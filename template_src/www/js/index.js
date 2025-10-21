/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
    // Initialize Fidelidade Cordova App
    initializeApp();
}

function initializeApp() {
    console.log('Cordova app initialized successfully');
    log('Cordova app initialized', 'success');
    
    // Load app name from config.xml
    loadAppName();
    
    // Check Cordova platform info
    checkPlatformInfo();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update status
    document.getElementById('status').textContent = 'App is ready!';
    document.getElementById('status').style.color = '#28a745';
}

function loadAppName() {
    // Try to get app name from cordova app info first
    if (typeof cordova !== 'undefined' && cordova.getAppVersion) {
        cordova.getAppVersion.getAppName().then(function(name) {
            document.getElementById('app-name').textContent = name;
            log(`App name loaded: ${name}`);
        }).catch(function(error) {
            // Fallback to reading config.xml
            loadAppNameFromConfig();
        });
    } else {
        // Fallback to reading config.xml
        loadAppNameFromConfig();
    }
}

function loadAppNameFromConfig() {
    return fetch('./config.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            const nameElement = xmlDoc.querySelector('widget > name');
            
            if (nameElement && nameElement.textContent) {
                const appName = nameElement.textContent.trim();
                log(`App name loaded from config.xml: ${appName}`, 'config');
                return appName;
            } else {
                log('App name not found in config.xml', 'warning');
                return 'Fidelidade Mobile App';
            }
        })
        .catch(error => {
            log(`Error loading config.xml: ${error.message}`, 'error');
            return 'Fidelidade Mobile App';
        });
}

function checkPlatformInfo() {
    // Verify that cordova is available and log platform information
    if (typeof cordova !== 'undefined') {
        log('Cordova is ready', 'success');
        log(`Platform: ${cordova.platformId}`, 'info');
        log(`Cordova version: ${cordova.version}`, 'info');
        
        // Check device info if available
        if (typeof device !== 'undefined') {
            log(`Device platform: ${device.platform}`, 'device');
            log(`Device version: ${device.version}`, 'device');
            log(`Device model: ${device.model}`, 'device');
        }
        return true;
    } else {
        log('Cordova is not available', 'error');
        return false;
    }
}

function setupEventListeners() {
    // Check plugin status button
    const checkBtn = document.getElementById('check-availability-btn');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkPluginStatus);
    }
    
    // Request review button
    const reviewBtn = document.getElementById('request-review-btn');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', handleAppReviewRequest);
    }
    
    // Test review flow button
    const testReviewBtn = document.getElementById('request-test-review-btn');
    if (testReviewBtn) {
        testReviewBtn.addEventListener('click', handleTestReviewFlow);
    }
    
    // Open store button
    const storeBtn = document.getElementById('open-store-btn');
    if (storeBtn) {
        storeBtn.addEventListener('click', openAppStore);
    }
    
    // Clear logs button
    const clearBtn = document.getElementById('clear-log-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearLogs);
    }
}

function checkPluginStatus() {
    log('Checking plugin status...', 'loading');
    
    // Check basic Cordova functionality
    if (typeof cordova !== 'undefined') {
        log('Cordova is available', 'success');
        
        // Check for common plugins
        if (cordova.plugins) {
            let pluginCount = Object.keys(cordova.plugins).length;
            log(`Found ${pluginCount} plugins available`, 'plugin');
            
            // List some common plugin names
            Object.keys(cordova.plugins).forEach(pluginName => {
                log(`Plugin: ${pluginName}`, 'plugin');
            });
        } else {
            log('No plugins detected', 'warning');
        }
    } else {
        log('Cordova is not available', 'error');
    }
}

function handleAppReviewRequest() {
    log('Handling app review request...', 'loading');
    
    // Check if review plugin is available
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.AppReview) {
        log('AppReview plugin found - requesting review', 'plugin');
        try {
            cordova.plugins.AppReview.requestReview(
                function(result) {
                    log('Review request completed successfully', 'success');
                    log('Result: ' + JSON.stringify(result), 'info');
                },
                function(error) {
                    log('Error requesting review: ' + error, 'error');
                }
            );
        } catch (error) {
            log('Exception in handleAppReviewRequest: ' + error.message, 'error');
        }
    } else {
        log('AppReview plugin not available - showing fallback message', 'warning');
        alert('Please rate our app in the app store!');
    }
}

function handleTestReviewFlow() {
    log('Testing review flow...', 'loading');
    
    // Simulate a review flow for testing purposes
    log('Simulating review request flow', 'debug');
    
    setTimeout(() => {
        log('Test review flow completed', 'success');
        log('In a real app, this would trigger the review dialog', 'info');
    }, 1000);
}

function openAppStore() {
    log('Opening app store...', 'loading');
    
    // Check if AppReview plugin is available for store opening
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.AppReview) {
        log('Using AppReview plugin to open store', 'plugin');
        try {
            cordova.plugins.AppReview.openStoreScreen(
                function(result) {
                    log('Store screen opened successfully', 'success');
                },
                function(error) {
                    log('Error opening store: ' + error, 'error');
                }
            );
        } catch (error) {
            log('Exception in openAppStore: ' + error.message, 'error');
        }
    } else {
        log('AppReview plugin not available - using fallback method', 'warning');
        
        // Fallback: try to open the appropriate app store URL
        const platform = (typeof device !== 'undefined') ? device.platform : 'unknown';
        let storeUrl = '';
        
        if (platform === 'iOS') {
            storeUrl = 'https://apps.apple.com/app/id1234567890'; // Replace with actual app ID
        } else if (platform === 'Android') {
            storeUrl = 'https://play.google.com/store/apps/details?id=com.fidelidade.app'; // Replace with actual package name
        } else {
            log('Unknown platform - cannot determine store URL', 'warning');
            return;
        }
        
        // Try to open the URL using InAppBrowser or window.open
        if (typeof cordova !== 'undefined' && cordova.InAppBrowser) {
            cordova.InAppBrowser.open(storeUrl, '_system');
            log('Opened store using InAppBrowser', 'success');
        } else {
            window.open(storeUrl, '_blank');
            log('Opened store using window.open', 'success');
        }
    }
}

/**
 * Enhanced logging function with automatic emoji assignment based on type
 * @param {string} message - The message to log
 * @param {string} [type] - Log type: 'info', 'success', 'warning', 'error', 'loading', 'plugin', 'custom'
 * @param {string} [customEmoji] - Custom emoji when type is 'custom'
 */
function log(message, type = 'info', customEmoji = '') {
    const emojiMap = {
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌',
        'loading': '🔄',
        'plugin': '🔌',
        'debug': '🐛',
        'config': '⚙️',
        'network': '🌐',
        'device': '📱',
        'location': '📍',
        'storage': '💾',
        'notification': '🔔',
        'security': '🔒',
        'performance': '⚡',
        'ui': '🎨',
        'api': '🔗',
        'custom': customEmoji || '💬'
    };
    
    const emoji = emojiMap[type] || emojiMap.info;
    const formattedMessage = `${emoji} ${message}`;
    
    console.log(formattedMessage);
    
    const logOutput = document.getElementById('log-output');
    if (logOutput) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.textContent = `[${timestamp}] ${formattedMessage}`;
        logOutput.appendChild(logEntry);
        logOutput.scrollTop = logOutput.scrollHeight;
    }
}

function clearLogs() {
    const logOutput = document.getElementById('log-output');
    if (logOutput) {
        logOutput.innerHTML = '';
    }
    console.clear();
    log('Logs cleared', 'info');
}
