# Fidelidade Cordova App Template

[![NPM](https://img.shields.io/badge/template-cordova:template-blue)](https://www.npmjs.com/search?q=keywords:cordova%3Atemplate)

A professional Cordova template following the official Apache Cordova template structure, with OutSystems platform support and modern UI components pre-configured for iOS and Android development.

## Features

- ✅ **Official Template Structure**: Follows `cordova-app-hello-world` template conventions
- ✅ **OutSystems Cordova Platforms**: Pre-configured with OutSystems forks for enhanced functionality
- ✅ **iOS Swift 5 Support**: Ready for modern iOS development with deployment target iOS 12.0
- ✅ **Android Release Ready**: Configured for Google Play Store deployment
- ✅ **Modern UI**: Professional interface with Fidelidade branding and responsive design
- ✅ **Plugin Testing Framework**: Example button patterns for testing plugin functionality
- ✅ **Real-time Logging**: Live debugging interface with timestamp logging
- ✅ **Cordova CLI Compatible**: Works seamlessly with `cordova create` command

## Template Structure

This template follows the official Apache Cordova template structure:

```
fidelidade-cordova-app/
├── package.json          # Template metadata (with cordova:template keyword)
├── index.js              # Entry point - points to template_src/
├── README.md             # Template documentation
└── template_src/         # Actual template files
    ├── package.json      # Generated app's package.json
    ├── config.xml        # Cordova config with $PACKAGE_NAME$ placeholders
    ├── gitignore         # Becomes .gitignore in generated project
    └── www/              # Web assets
        ├── index.html    # Fidelidade-branded UI
        ├── css/index.css # Modern responsive styling
        ├── js/index.js   # App logic with plugin examples
        └── img/logo.png  # Fidelidade logo asset
```

### How Template Replacement Works

Cordova CLI automatically handles app configuration when using templates:

- The `cordova create` command uses the package ID and app name **you provide in the command**
- The template's `config.xml` serves as the base configuration with OutSystems platform setup
- Your specified app ID and name override the template's default values

**Example:**
```bash
cordova create MyApp com.mycompany.myapp "My App Name" --template=github:premedios/fidelidade-cordova-app
```
Results in a new app with ID `com.mycompany.myapp` and name `"My App Name"`.

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Cordova CLI: `npm install -g cordova`
- Android SDK (for Android builds)
- Xcode (for iOS builds)

### Using Cordova Create Command (Recommended)

```bash
# Create a new app using this template
cordova create MyApp com.mycompany.myapp "My App" --template=github:premedios/fidelidade-cordova-app

# Navigate to the project and install dependencies
cd MyApp
npm install

# Add platforms with OutSystems support
cordova platform add android ios

# Build your app
cordova build android --release      # Android release build
cordova build ios --emulator         # iOS simulator build
```

### Using Local Template

```bash
# Clone this template first
git clone https://github.com/premedios/fidelidade-cordova-app.git

# Create new app using local template
cordova create MyApp com.mycompany.myapp "My App" --template=./fidelidade-cordova-app

# Navigate and setup
cd MyApp
npm install
cordova platform add android ios
```

## What This Template Provides

### Platform Configurations

**iOS Configuration:**
- Swift Version: 5
- Deployment Target: iOS 12.0
- OutSystems Fork: `github:OutSystems/cordova-ios#rel/7.0.1`

**Android Configuration:**
- OutSystems Fork: `github:OutSystems/cordova-android#13.0.0+1.1.0`
- Target SDK: Latest Android versions
- Output Format: Android App Bundle (.aab) for Play Store

### Build Outputs

- **Android Release**: `platforms/android/app/build/outputs/bundle/release/app-release.aab`
- **iOS Simulator**: `platforms/ios/build/Debug-iphonesimulator/[AppName].app`

## UI Features

This template includes a modern, professional interface with:

### Visual Components
- **Modern Branding**: Fidelidade-inspired color scheme with gradient backgrounds
- **Device Ready Indicator**: Visual feedback when Cordova is fully initialized
- **Status Bar**: Real-time display of app status and connection state
- **Action Buttons**: Pre-built interface for common app functions
- **Live Logging**: Real-time log output with timestamps for debugging

### Interactive Features
- **Plugin Status Check**: Button to verify available Cordova plugins
- **App Review Integration**: Built-in support for in-app review requests
- **Test Review Flow**: Testing interface for review functionality
- **App Store Integration**: Direct links to app store pages
- **Log Management**: Clear logs functionality with persistent display

### Responsive Design
- **Mobile Optimized**: Touch-friendly button sizes and spacing
- **System Fonts**: Native font stack for platform consistency
- **Dark Mode Support**: Automatic adaptation to system color schemes
- **Cross-Platform**: Consistent experience on iOS and Android

## Plugin Development

The template includes an example of the preferred pattern for testing plugin functionality:

```html
<!-- 
    PREFERRED BUTTON PATTERN FOR PLUGIN TESTING:
    This is the recommended way to create buttons for testing plugin functionality.
    - Use descriptive IDs (check-availability-btn)
    - Apply consistent CSS classes (test-button)
    - Clear, action-oriented button text
    - Set up corresponding event listeners in JS
-->
<!-- <button id="check-availability-btn" class="test-button">Check Plugin Status</button> -->
```

### Adding Your Own Plugin Tests

For detailed instructions on extending the template with your own plugin testing functionality, see the **[Development Guide](DEVELOPMENT.md)**.

The development guide covers:

- How to add new test buttons following the preferred pattern
- JavaScript event handling and best practices
- Using the comprehensive logging system
- Plugin integration patterns and error handling
- Complete examples and troubleshooting tips

**Quick start:**

1. **Follow the button pattern** shown in the commented HTML example
2. **Add event listeners** in `www/js/index.js` using `setupEventListeners()`
3. **Use the logging system** with `log()` function for real-time debugging
4. **Test graceful fallbacks** when plugins are not available

## Customization

### Branding
- **Colors**: Update the gradient in `www/css/index.css` (currently Fidelidade blue)
- **Logo**: Replace `www/img/logo.png` with your company logo
- **App Name**: Automatically handled by `cordova create` command parameters

### Configuration
- **Platforms**: Modify `config.xml` for platform-specific settings
- **Plugins**: Add dependencies in `package.json`
- **Permissions**: Configure in `config.xml` as needed

## Usage Examples

### Creating a Business App
```bash
cordova create BusinessApp com.company.business "Business Mobile App" --template=github:premedios/fidelidade-cordova-app
```

### Creating an Insurance App
```bash
cordova create InsuranceApp pt.fidelidade.seguros "Fidelidade Seguros" --template=github:premedios/fidelidade-cordova-app
```

## Advanced Configuration

### Adding Plugins
```bash
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-device
```

### Custom Build Configuration
Create a `build.json` file in your project root for signing configurations:

```json
{
  "android": {
    "release": {
      "keystore": "path/to/keystore",
      "storePassword": "password",
      "alias": "alias",
      "password": "password"
    }
  },
  "ios": {
    "release": {
      "codeSignIdentity": "iPhone Distribution",
      "provisioningProfile": "uuid-of-provisioning-profile"
    }
  }
}
```

## OutSystems Platform Benefits

This template uses OutSystems-maintained forks of Cordova platforms that provide:

- Enhanced stability and performance
- Additional native capabilities
- Better integration with modern mobile OS features
- Regular updates and security patches

## Troubleshooting

### iOS Build Issues
- Ensure Xcode is installed and up to date
- For device builds, configure proper code signing in Xcode
- Check iOS deployment target compatibility

### Android Build Issues
- Verify Android SDK is properly installed
- Set `ANDROID_HOME` environment variable
- Ensure build tools are installed: `sdkmanager "build-tools;35.0.0"`

### Common Solutions
```bash
# Clean and rebuild
cordova clean
cordova build

# Reset platforms
cordova platform remove android ios
cordova platform add android ios
```

## Publishing to NPM

To make this template available via NPM:

```bash
# Login to NPM
npm login

# Publish the template
npm publish

# Users can then install with:
npm install -g cordova-template-fidelidade
cordova create MyApp com.example.app "My App" --template=cordova-template-fidelidade
```

## License

Apache-2.0 License - Same as Apache Cordova

## Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## Release Management

For maintainers and contributors:

- **Release Guide**: See [RELEASE.md](RELEASE.md) for complete release procedures
- **Development Guide**: See [DEVELOPMENT.md](DEVELOPMENT.md) for extending the template

## Support

For issues and questions:

- **Template Issues**: [Create an issue](https://github.com/premedios/fidelidade-cordova-app/issues) in this repository
- **Cordova Documentation**: <https://cordova.apache.org/docs/>
- **OutSystems Community**: <https://www.outsystems.com/community/>

---

**Template Version**: 2.0.0  
**Template Structure**: Official Cordova Template Format  
**Cordova Compatibility**: 12.0.0+  
**Keywords**: `cordova:template`, `ecosystem:cordova`