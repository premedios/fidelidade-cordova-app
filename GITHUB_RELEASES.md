# GitHub Releases Quick Guide

This is how to create GitHub releases for the Fidelidade Cordova Template.

## 🚀 What are GitHub Releases?

GitHub Releases are the version releases you see on GitHub repositories (like v1.0.0, v1.1.0, etc.). They allow users to:

- Download specific versions of your template
- See what changed between versions  
- Install using specific version tags
- Track the evolution of your project

## 📋 Quick Release Process

### Option 1: Automated Script (Recommended)

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm run release:patch

# For new features (1.0.0 → 1.1.0) 
npm run release:minor

# For breaking changes (1.0.0 → 2.0.0)
npm run release:major
```

The script will:
1. ✅ Validate your git status
2. 📦 Update version in package.json
3. 🧪 Test template functionality
4. 📝 Commit changes and create git tag
5. 📤 Push to GitHub
6. 📄 Generate release notes template
7. 🎯 Give you the GitHub URL to complete the release

### Option 2: Manual Process

```bash
# 1. Update version
npm version minor  # or patch/major

# 2. Commit and push
git push origin main --tags

# 3. Go to GitHub and create release
# https://github.com/premedios/fidelidade-cordova-app/releases/new
```

## 🌐 Creating the GitHub Release

After running the script, you'll get a URL like:
`https://github.com/premedios/fidelidade-cordova-app/releases/new`

**Fill in the form:**

1. **Tag**: Should auto-select your new tag (e.g., `v1.1.0`)
2. **Title**: `Fidelidade Cordova Template v1.1.0`
3. **Description**: Copy from the generated `RELEASE_NOTES_TEMP.md` file
4. **✅ Check "Set as the latest release"**
5. **Click "Publish release"**

## 📦 How Users Install Your Release

Once published, users can install your template in several ways:

### Latest Version (Most Common)
```bash
cordova create MyApp com.mycompany.app "My App" --template=github:premedios/fidelidade-cordova-app
```

### Specific Version Tag
```bash
cordova create MyApp com.mycompany.app "My App" --template=github:premedios/fidelidade-cordova-app#v1.1.0
```

### Specific Branch (for testing)
```bash
cordova create MyApp com.mycompany.app "My App" --template=github:premedios/fidelidade-cordova-app#main
```

## 🧪 Testing Your Release

Always test after creating a release:

```bash
# Test latest
cordova create TestLatest com.test.latest "Test Latest" --template=github:premedios/fidelidade-cordova-app

# Test specific tag  
cordova create TestTag com.test.tag "Test Tag" --template=github:premedios/fidelidade-cordova-app#v1.1.0

# Verify the app works
cd TestLatest
cordova platform add browser
cordova run browser
```

## 📝 Good Release Notes

Here's a template for good release notes:

```markdown
## 🎉 Fidelidade Cordova Template v1.1.0

### ✨ New Features
- Enhanced logging system with automatic emoji assignment
- Added 18+ log types with color coding
- Dark mode support improvements

### 🔧 Improvements  
- Better error handling in examples
- Updated documentation
- Performance optimizations

### 🐛 Bug Fixes
- Fixed app name loading issue
- Resolved CSS conflicts
- Corrected button behaviors

### 📦 Installation
\`\`\`bash
cordova create MyApp com.mycompany.app "My App" --template=github:premedios/fidelidade-cordova-app
\`\`\`

### 🔗 What's Changed
- Link to commit comparison
- Mention contributors
- Reference issues fixed
```

## ⚡ Quick Commands Reference

```bash
# Create patch release (bug fixes)
npm run release:patch

# Create minor release (new features) 
npm run release:minor

# Create major release (breaking changes)
npm run release:major

# Test template locally
npm run test:template

# Manual version bump
npm version minor
git push origin main --tags
```

## 🎯 Benefits of GitHub Releases

1. **Version Control**: Users can install specific versions
2. **Changelog**: Clear history of what changed
3. **Professional**: Makes your template look well-maintained
4. **Distribution**: Easy way for others to use your template
5. **Tracking**: See download statistics and usage

## 🔄 Version Strategy

Follow semantic versioning:

- **Patch** (1.0.1): Bug fixes, typos, small improvements
- **Minor** (1.1.0): New features, logging enhancements, new examples  
- **Major** (2.0.0): Breaking changes, structure changes, major rewrites

Your enhanced logging system would be a **minor** release (1.0.0 → 1.1.0) since it adds new functionality without breaking existing code.

---

**Ready to create your first release?** Run `npm run release:minor` and follow the prompts!