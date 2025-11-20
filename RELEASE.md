# Release Guide

This guide covers how to create and publish releases of the Fidelidade Cordova Template.

## Table of Contents

- [Pre-Release Checklist](#pre-release-checklist)
- [Version Management](#version-management)
- [GitHub Release](#github-release)
- [NPM Publication](#npm-publication)
- [Testing the Release](#testing-the-release)
- [Release Notes Template](#release-notes-template)
- [Rollback Procedures](#rollback-procedures)

## Pre-Release Checklist

Before creating a release, ensure all the following are completed:

### ✅ Code Quality
- [ ] All tests pass (if applicable)
- [ ] Code is properly formatted and linted
- [ ] No console errors in the template
- [ ] All features documented in DEVELOPMENT.md
- [ ] README.md is up to date

### ✅ Template Functionality
- [ ] Template creates apps successfully with `cordova create`
- [ ] Generated apps build for both iOS and Android
- [ ] All buttons and logging functions work correctly
- [ ] Dynamic app name loading works from config.xml
- [ ] OutSystems platform configurations are correct

### ✅ Documentation
- [ ] README.md reflects current features
- [ ] DEVELOPMENT.md includes all examples
- [ ] All code examples are tested and working
- [ ] Installation instructions are accurate

### ✅ Repository State
- [ ] All changes committed to main branch
- [ ] Working directory is clean (`git status`)
- [ ] Latest changes pulled from remote
- [ ] No pending pull requests that should be included

## Version Management

### Semantic Versioning

Follow [Semantic Versioning](https://semver.org/) (semver) for version numbers:

- **MAJOR** (1.x.x): Breaking changes that require user action
- **MINOR** (x.1.x): New features that are backwards compatible
- **PATCH** (x.x.1): Bug fixes and minor improvements

### Version Examples

```bash
# Bug fixes, documentation updates
1.0.0 → 1.0.1

# New logging features, additional examples
1.0.1 → 1.1.0

# Changed template structure, breaking changes
1.1.0 → 2.0.0
```

### Updating Version

1. **Update package.json version:**
```bash
npm version patch   # For bug fixes (1.0.0 → 1.0.1)
npm version minor   # For new features (1.0.0 → 1.1.0)
npm version major   # For breaking changes (1.0.0 → 2.0.0)
```

2. **Manual version update:**
```json
{
  "name": "cordova-template-fidelidade",
  "version": "1.1.0",
  "description": "Fidelidade Cordova App Template"
}
```

## GitHub Release

### 1. Create Release on GitHub

1. **Go to your repository on GitHub**
   - Navigate to `https://github.com/premedios/fidelidade-cordova-app`

2. **Create new release**
   - Click "Releases" → "Create a new release"
   - Tag version: `v1.1.0` (with 'v' prefix)
   - Release title: `Fidelidade Cordova Template v1.1.0`

3. **Write release notes** (see template below)

4. **Publish release**
   - Check "Set as the latest release"
   - Click "Publish release"

### 2. Command Line Release (Alternative)

```bash
# Create and push tag
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0

# Create release using GitHub CLI (if installed)
gh release create v1.1.0 --title "Fidelidade Cordova Template v1.1.0" --notes-file RELEASE_NOTES.md
```

## NPM Publication

### 1. Prepare for NPM

```bash
# Ensure you're logged into npm
npm whoami

# Login if necessary
npm login
```

### 2. Verify Package Contents

```bash
# Check what will be published (dry run)
npm pack --dry-run

# This should include:
# - package.json
# - index.js
# - template_src/ directory
# - README.md
# - DEVELOPMENT.md (optional but recommended)
```

### 3. Publish to NPM

```bash
# Publish the package
npm publish

# For scoped packages (if using @premedios/cordova-template-fidelidade)
npm publish --access public
```

### 4. Verify Publication

```bash
# Check if package is available
npm info cordova-template-fidelidade

# Test installation
npm install -g cordova-template-fidelidade
```

## Testing the Release

### 1. Test Template Installation

```bash
# Test with NPM package
cordova create TestApp com.test.app "Test App" --template=cordova-template-fidelidade

# Test with GitHub (alternative)
cordova create TestApp com.test.app "Test App" --template=github:premedios/fidelidade-cordova-app
```

### 2. Test Generated App

```bash
cd TestApp

# Add platforms
cordova platform add ios
cordova platform add android

# Build for both platforms
cordova build ios
cordova build android

# Test in browser
cordova serve
```

### 3. Verify Features

- [ ] App name loads dynamically from config.xml
- [ ] All buttons are present and styled correctly
- [ ] Logging system works with color coding
- [ ] Console shows no errors
- [ ] OutSystems platforms are configured

## Release Notes Template

Use this template for consistent release notes:

```markdown
## 🎉 Fidelidade Cordova Template v1.1.0

### ✨ New Features
- Enhanced logging system with automatic emoji assignment
- Added 18+ log types with color coding
- Improved dark mode support

### 🔧 Improvements
- Better error handling in geolocation example
- Updated documentation with comprehensive examples
- Optimized CSS for better performance

### 🐛 Bug Fixes
- Fixed app name loading from config.xml
- Resolved CSS styling issues in dark mode
- Corrected button state management

### 📚 Documentation
- Added DEVELOPMENT.md with complete examples
- Updated README with installation instructions
- Added troubleshooting section

### 🔄 Breaking Changes
None in this release.

### 📦 Installation
\```bash
cordova create MyApp com.mycompany.app "My App" --template=cordova-template-fidelidade
\```

### 🔗 What's Changed
**Full Changelog**: https://github.com/premedios/fidelidade-cordova-app/compare/v1.0.0...v1.1.0
```

## Rollback Procedures

### If NPM Publication Fails

```bash
# Unpublish within 24 hours (if necessary)
npm unpublish cordova-template-fidelidade@1.1.0 --force

# Fix issues and republish with patch version
npm version patch
npm publish
```

### If GitHub Release Has Issues

1. **Delete the release** on GitHub web interface
2. **Delete the tag locally and remotely:**
```bash
git tag -d v1.1.0
git push origin --delete v1.1.0
```
3. **Fix issues and create new release**

### Emergency Hotfix

```bash
# Create hotfix branch
git checkout -b hotfix/v1.1.1

# Make critical fixes
# ... fix code ...

# Commit and tag
git commit -am "Critical hotfix"
npm version patch
git push origin hotfix/v1.1.1

# Create release
git tag -a v1.1.1 -m "Hotfix release 1.1.1"
git push origin v1.1.1

# Publish to NPM
npm publish

# Merge back to main
git checkout main
git merge hotfix/v1.1.1
git push origin main
```

## Automated Release (Optional)

For future releases, consider setting up GitHub Actions:

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      - uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
```

## Best Practices

1. **Always test locally** before publishing
2. **Use semantic versioning** consistently
3. **Write clear release notes** explaining changes
4. **Keep a changelog** for tracking all changes
5. **Test the template** on both iOS and Android after each release
6. **Coordinate releases** if working in a team
7. **Back up important releases** with git tags

## Quick Release Checklist

```bash
# 1. Ensure clean state
git status
git pull origin main

# 2. Update version
npm version minor  # or patch/major

# 3. Push changes
git push origin main
git push origin --tags

# 4. Publish to NPM
npm publish

# 5. Create GitHub release
# (Use GitHub web interface or gh CLI)

# 6. Test the release
cordova create TestRelease com.test.release "Test Release" --template=cordova-template-fidelidade
```

---

**Need help?** Open an issue on the [GitHub repository](https://github.com/premedios/fidelidade-cordova-app/issues).