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
    console.log('Fidelidade Cordova app initialized successfully');
    log('Fidelidade Mobile App initialized');
    
    // Check Cordova platform info
    checkPlatformInfo();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update status
    document.getElementById('status').textContent = 'App is ready!';
    document.getElementById('status').style.color = '#28a745';
}

function checkPlatformInfo() {
    if (typeof cordova !== 'undefined') {
        log('✅ Cordova is available');
        log(`Platform: ${cordova.platformId}`);
        log(`Cordova version: ${cordova.version}`);
        
        // Check device info if available
        if (typeof device !== 'undefined') {
            log(`Device platform: ${device.platform}`);
            log(`Device version: ${device.version}`);
            log(`Device model: ${device.model}`);
        }
        return true;
    } else {
        log('❌ Cordova is not available');
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
    log('🔄 Checking plugin status...');
    
    // Check basic Cordova functionality
    if (typeof cordova !== 'undefined') {
        log('✅ Cordova is available');
        
        // Check for common plugins
        if (cordova.plugins) {
            let pluginCount = Object.keys(cordova.plugins).length;
            log(`✅ Found ${pluginCount} plugins available`);
            
            // List some common plugin names
            Object.keys(cordova.plugins).forEach(pluginName => {
                log(`  - ${pluginName}`);
            });
        } else {
            log('⚠️ No plugins detected');
        }
    } else {
        log('❌ Cordova is not available');
    }
}

function handleAppReviewRequest() {
    log('🔄 Handling app review request...');
    
    // Check if review plugin is available
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.AppReview) {
        log('✅ AppReview plugin found - requesting review');
        try {
            cordova.plugins.AppReview.requestReview(
                function(result) {
                    log('✅ Review request completed successfully');
                    log('Result: ' + JSON.stringify(result));
                },
                function(error) {
                    log('❌ Error requesting review: ' + error);
                }
            );
        } catch (error) {
            log('❌ Exception in handleAppReviewRequest: ' + error.message);
        }
    } else {
        log('⚠️ AppReview plugin not available - showing fallback message');
        alert('Please rate our app in the app store!');
    }
}

function handleTestReviewFlow() {
    log('🔄 Testing review flow...');
    
    // Simulate a review flow for testing purposes
    log('ℹ️ Simulating review request flow');
    
    setTimeout(() => {
        log('✅ Test review flow completed');
        log('ℹ️ In a real app, this would trigger the review dialog');
    }, 1000);
}

function openAppStore() {
    log('🔄 Opening app store...');
    
    // Check if AppReview plugin is available for store opening
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.AppReview) {
        log('✅ Using AppReview plugin to open store');
        try {
            cordova.plugins.AppReview.openStoreScreen(
                function(result) {
                    log('✅ Store screen opened successfully');
                },
                function(error) {
                    log('❌ Error opening store: ' + error);
                }
            );
        } catch (error) {
            log('❌ Exception in openAppStore: ' + error.message);
        }
    } else {
        log('⚠️ AppReview plugin not available - using fallback method');
        
        // Fallback: try to open the appropriate app store URL
        const platform = (typeof device !== 'undefined') ? device.platform : 'unknown';
        let storeUrl = '';
        
        if (platform === 'iOS') {
            storeUrl = 'https://apps.apple.com/app/id1234567890'; // Replace with actual app ID
        } else if (platform === 'Android') {
            storeUrl = 'https://play.google.com/store/apps/details?id=com.fidelidade.app'; // Replace with actual package name
        } else {
            log('⚠️ Unknown platform - cannot determine store URL');
            return;
        }
        
        // Try to open the URL using InAppBrowser or window.open
        if (typeof cordova !== 'undefined' && cordova.InAppBrowser) {
            cordova.InAppBrowser.open(storeUrl, '_system');
            log('✅ Opened store using InAppBrowser');
        } else {
            window.open(storeUrl, '_blank');
            log('✅ Opened store using window.open');
        }
    }
}

function log(message) {
    console.log(message);
    
    const logOutput = document.getElementById('log-output');
    if (logOutput) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.textContent = '[' + timestamp + '] ' + message;
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
    log('Logs cleared');
}
