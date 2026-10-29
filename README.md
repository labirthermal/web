# Typescript tools for thermal imaging

Documentation and examples at [https://labirthermal.github.io/web/](https://labirthermal.github.io/web/).

Set of JS/TS packages for work with recordings from thermal cameras:

- `@labir/core` - the core functionality in pure TS
- `@labir/embed` - webcomponents on top of `@labir/core`
- `@labir/thermal-display` - a Wordpress plugin using `@labir/embed`

## Features

- reads and displays multiple file formats
    - LRC files - documentation of the open [LabIR Recording](https://github.com/labirthermal/lrc-recording/blob/master/docs/LRC-FORMAT.md) file format
    - FLIR jpegs - implementation is inspired by the Python library [flyr](https://pypi.org/project/flyr/) 
- provides set of [webcomponents](https://labirthermal.github.io/web/webcomponents/list.html) that enables to build various and complex interfaces
- capable to work with multiple files at once
- optional integration to our server storage system
- a WordPress plugin that brings the webcomponents to the publishing platform

## Development

Use **PNPM** package manager - this monorepo relies on its workspaces functionality.

**The build and release process should be done from the workspace root**. Do not build and publish packages individually - it might mess up version numbering (see below).


### Installation

```bash
gh repo clone labirthermal/web
pnpm install
```

### Development

Every `/package/*` has its own tests, build commands and devservers.

### Documentation deployment

The Pages workflow builds the VitePress documentation on pushes to `main` or `master`, or via **Actions > Deploy VitePress site to Pages > Run workflow**.

Before the first deployment, select **GitHub Actions** under **Settings > Pages > Build and deployment > Source**. Alternatively, add a repository Actions secret named `PAGES_TOKEN` containing a fine-grained personal access token for this repository with **Pages: Read and write** permission; the workflow can then enable Pages automatically.

Once Pages is enabled, remove `PAGES_TOKEN` if it was used for setup. Subsequent deployments use the built-in `GITHUB_TOKEN` with the workflow's existing Pages permissions.

### Release

The release needs to be done from **the package root**. Make sure you build & release all packages at once - not individually.

We use `lerna` to facilitate versioning and builds.

```bash
# 1. run lint in all packages
pnpm run lint

# 2. run tests in all packages
pnpm run test

# 3. build all packages
pnpm run build

# 4. commit the entire work
git add -A && git commit -m "..."

# 5. see the packages that has changed since the last release
pnpm run changed

# 6. use lerna to increment version of packages
pnpm run version

# 7. publish the packages
pnpm publish --recursive
```