#!/usr/bin/env node

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

/**
 * Fidelidade Cordova Template with OutSystems platform support
 * 
 * This template provides:
 * - OutSystems Cordova Android fork (13.0.0+1.1.0)
 * - OutSystems Cordova iOS fork (rel/7.0.1)
 * - iOS Swift 5 configuration
 * - Pre-configured build settings
 */

const fs = require('fs');
const path = require('path');

module.exports = {
    dirname: __dirname,
    
    // Template post-processing hook
    afterCopy: function(context) {
        const projectRoot = context.opts.projectRoot;
        const projectName = context.opts.name;
        const packageName = context.opts.id;
        
        console.log('🚀 Applying Fidelidade Cordova Template with OutSystems support...');
        console.log(`📱 App ID: ${packageName}`);
        console.log(`📛 App Name: ${projectName}`);
        
        // Update package.json to ensure OutSystems platforms are configured
        const packagePath = path.join(projectRoot, 'package.json');
        if (fs.existsSync(packagePath)) {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            // Ensure OutSystems platforms are configured
            packageJson.devDependencies = packageJson.devDependencies || {};
            packageJson.devDependencies['cordova-android'] = 'github:OutSystems/cordova-android#13.0.0+1.1.0';
            packageJson.devDependencies['cordova-ios'] = 'github:OutSystems/cordova-ios#rel/7.0.1';
            
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
        }
        
        console.log('✅ Fidelidade template applied successfully!');
        console.log('\n🔧 Next steps:');
        console.log(`   cd ${path.basename(projectRoot)}`);
        console.log('   npm install');
        console.log('   cordova platform add android ios');
        console.log('   cordova build android --release      # Build Android release');
        console.log('   cordova build ios --emulator         # Build iOS for simulator');
        console.log('\n📦 OutSystems platforms configured for enhanced mobile capabilities!');
    }
};