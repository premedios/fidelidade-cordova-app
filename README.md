# Fidelidade Cordova App Template

A comprehensive Cordova template with OutSystems platform support, pre-configured for iOS and Android development.

## Features

- ✅ **OutSystems Cordova Platforms**: Pre-configured with OutSystems forks for enhanced functionality
- ✅ **iOS Swift 5 Support**: Ready for modern iOS development with deployment target iOS 12.0
- ✅ **Android Release Ready**: Configured for Google Play Store deployment
- ✅ **Modern UI**: Professional interface with Fidelidade branding and responsive design
- ✅ **App Review Integration**: Built-in app review functionality with graceful fallbacks
- ✅ **Real-time Logging**: Live debugging interface with timestamp logging
- ✅ **Easy Setup**: Works directly with `cordova create` command

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

## License

Apache-2.0 License

## Support

For issues and questions:
- Create an issue in this repository
- Check Cordova documentation: https://cordova.apache.org/docs/
- OutSystems community: https://www.outsystems.com/community/

---

**Template Version**: 1.0.0  
**Cordova Compatibility**: 12.0.0+