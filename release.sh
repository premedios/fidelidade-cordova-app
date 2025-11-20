#!/bin/bash

# Fidelidade Cordova Template Release Script
# Usage: ./release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default to patch if no argument provided
VERSION_TYPE=${1:-patch}

echo -e "${BLUE}🚀 Fidelidade Cordova Template Release Script${NC}"
echo -e "${BLUE}===============================================${NC}"

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo -e "${RED}❌ Invalid version type: $VERSION_TYPE${NC}"
    echo -e "${YELLOW}Usage: $0 [patch|minor|major]${NC}"
    exit 1
fi

# Check if git working directory is clean
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${RED}❌ Git working directory is not clean. Please commit or stash changes first.${NC}"
    git status --short
    exit 1
fi

# Check if on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo -e "${YELLOW}⚠️  Not on main branch (currently on: $CURRENT_BRANCH)${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Pull latest changes
echo -e "${BLUE}📥 Pulling latest changes...${NC}"
git pull origin main

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}📋 Current version: $CURRENT_VERSION${NC}"

# Update version
echo -e "${BLUE}⬆️  Updating version ($VERSION_TYPE)...${NC}"
NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)
echo -e "${GREEN}✅ New version: $NEW_VERSION${NC}"

# Run tests (if any)
if [[ -f "package.json" ]] && npm run test --if-present > /dev/null 2>&1; then
    echo -e "${BLUE}🧪 Running tests...${NC}"
    npm test
fi

# Test template creation
echo -e "${BLUE}🧪 Testing template functionality...${NC}"
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Test template creation
if ! cordova create TestTemplate com.test.template "Test Template" --template="file://$OLDPWD" > /dev/null 2>&1; then
    echo -e "${RED}❌ Template creation test failed${NC}"
    cd "$OLDPWD"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Test app build preparation
cd TestTemplate
if ! cordova platform add browser > /dev/null 2>&1; then
    echo -e "${RED}❌ Platform add test failed${NC}"
    cd "$OLDPWD"
    rm -rf "$TEMP_DIR"
    exit 1
fi

cd "$OLDPWD"
rm -rf "$TEMP_DIR"
echo -e "${GREEN}✅ Template tests passed${NC}"

# Commit version change
echo -e "${BLUE}📝 Committing version change...${NC}"
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create git tag
TAG_NAME="v${NEW_VERSION#v}"
echo -e "${BLUE}🏷️  Creating git tag: $TAG_NAME${NC}"
git tag -a "$TAG_NAME" -m "Release $TAG_NAME"

# Push changes and tag
echo -e "${BLUE}📤 Pushing to remote...${NC}"
git push origin main
git push origin "$TAG_NAME"

# Skip NPM publishing - focusing on GitHub releases only
echo -e "${BLUE}📦 Skipping NPM publication (GitHub releases only)${NC}"

# Generate release notes
echo -e "${BLUE}📄 Generating release notes...${NC}"
cat > RELEASE_NOTES_TEMP.md << EOF
## 🎉 Fidelidade Cordova Template $NEW_VERSION

### What's Changed

Add your release notes here...

### 📦 Installation
\`\`\`bash
# Install using GitHub template
cordova create MyApp com.mycompany.app "My App" --template=github:premedios/fidelidade-cordova-app

# Install using specific version tag
cordova create MyApp com.mycompany.app "My App" --template=github:premedios/fidelidade-cordova-app#$TAG_NAME
\`\`\`

### 🔗 Links
- **GitHub Repository**: https://github.com/premedios/fidelidade-cordova-app
- **Documentation**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Release Guide**: [RELEASE.md](RELEASE.md)
EOF

echo -e "${GREEN}✅ Release $NEW_VERSION completed successfully!${NC}"
echo
echo -e "${YELLOW}📋 Next steps to create GitHub Release:${NC}"
echo
echo -e "${BLUE}1. 🌐 Go to GitHub releases page:${NC}"
echo -e "   ${BLUE}https://github.com/premedios/fidelidade-cordova-app/releases/new${NC}"
echo
echo -e "${BLUE}2. 📝 Fill in the release form:${NC}"
echo -e "   - Tag: ${GREEN}$TAG_NAME${NC} (should be auto-selected)"
echo -e "   - Title: ${GREEN}Fidelidade Cordova Template $NEW_VERSION${NC}"
echo -e "   - Description: Copy from ${BLUE}RELEASE_NOTES_TEMP.md${NC}"
echo -e "   - ✅ Check ${GREEN}\"Set as the latest release\"${NC}"
echo
echo -e "${BLUE}3. 🧪 Test the GitHub release:${NC}"
echo -e "   ${GREEN}cordova create TestRelease com.test.release \"Test Release\" --template=github:premedios/fidelidade-cordova-app${NC}"
echo
echo -e "${BLUE}4. 🧪 Test with specific tag:${NC}"
echo -e "   ${GREEN}cordova create TestTag com.test.tag \"Test Tag\" --template=github:premedios/fidelidade-cordova-app#$TAG_NAME${NC}"
echo
echo -e "${BLUE}5. 🗑️  Clean up:${NC}"
echo -e "   ${GREEN}rm RELEASE_NOTES_TEMP.md${NC}"