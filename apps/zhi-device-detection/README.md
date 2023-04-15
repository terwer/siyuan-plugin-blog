# zhi-device-detection

auto check environment whether in browser, browser extension, electron, node and more

## Usage

```ts
import DeviceDetection, { BrowserUtil, DeviceTypeEnum } from "zhi-device-detection"

console.log("isInBrowser=>", BrowserUtil.isInBrowser)

const deviceType: DeviceTypeEnum = DeviceDetection.getDevice()
console.log("deviceType=>", deviceType)

// supported platforms
// Mobile
// Siyuan_Widget
// Siyuan_NewWindow
// Siyuan_MainWindow
// Chrome_Extension
// Chrome_Browser
// Node
```

## Deps

```
## Congregations! zhi-device-detection need no deps, it is just pure js code 🎉
```

## Dev

```bash
pnpm dev -F zhi-device-detection
```

## Build

```bash
pnpm build -F zhi-device-detection
```

## Api

```bash
pnpm doc -F zhi-device-detection
pnpm md -F zhi-device-detection
```

## Test

Execute the unit tests via [jest](https://jestjs.io/docs/getting-started#via-ts-jest)

```bash
pnpm test -F zhi-device-detection
```

## Publish

```
pnpm publish -F zhi-device-detection --tag=latest
```