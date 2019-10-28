import Constants from "expo-constants";
import DeviceInfo from "react-native-device-info";

export default class DeviceHelper {
  static isTablet() {
    return DeviceInfo.isTablet();
  }
  static getDeviceName() {
    return Constants.deviceName;
  }
  static getDeviceLocale() {
    return DeviceInfo.getDeviceLocale();
  }
  static getBuildNumber() {
    return DeviceInfo.getBuildNumber();
  }
  static getSystemVersion() {
    return DeviceInfo.getSystemVersion();
  }

  static getDeviceInfo() : any {
    return {
      appName: DeviceInfo.getApplicationName(),
      brand: DeviceInfo.getBrand(),
      buildNumber: DeviceInfo.getBuildNumber(),
      bundleId: DeviceInfo.getBundleId(),
      carrier: DeviceInfo.getCarrier(),
      deviceCountry: DeviceInfo.getDeviceCountry(),
      deviceId: DeviceInfo.getDeviceId(),
      deviceLocale: DeviceInfo.getDeviceLocale(),
      fontScale: DeviceInfo.getFontScale(),
      manufacturer: DeviceInfo.getManufacturer(),
      model: DeviceInfo.getModel(),
      readableVersion: DeviceInfo.getReadableVersion(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      timezone: DeviceInfo.getTimezone(),
      storageSize: DeviceInfo.getTotalDiskCapacity(),
      totalMemory: DeviceInfo.getTotalMemory(),
      uniqueId: DeviceInfo.getUniqueID(),
      version: DeviceInfo.getVersion(),
      isEmulator: DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet(),
      releaseChannel: Constants.manifest.releaseChannel,
      expoDeviceId: Constants.deviceId
    };
  }
}
