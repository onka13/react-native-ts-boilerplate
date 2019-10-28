package host.exp.exponent;


import com.crashlytics.android.Crashlytics;
import com.crashlytics.android.core.CrashlyticsCore;
import com.crashlytics.android.core.CrashlyticsListener;
import com.facebook.react.ReactPackage;

import org.unimodules.core.interfaces.Package;

import java.util.Arrays;
import java.util.List;

import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import host.exp.exponent.generated.BasePackageList;
import okhttp3.OkHttpClient;

// Needed for `react-native link`
 import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import host.exp.exponent.analytics.EXL;
import host.exp.exponent.storage.ExponentSharedPreferences;
import io.fabric.sdk.android.Fabric;
import io.invertase.firebase.RNFirebasePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import com.commonlib.RNCommonLibPackage;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface<ReactPackage> {

    //@Override
    public String getFileProviderAuthority() {
      return BuildConfig.APPLICATION_ID + ".provider";
    }

    @Override
    public void onCreate() {
        super.onCreate();

        final Fabric fabric = new Fabric.Builder(this)
                .kits(new Crashlytics())
                .debuggable(isDebug())  // Enables Crashlytics debugger
                .build();
        Fabric.with(fabric);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    // Needed for `react-native link`
    public List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                // Add your own packages here!
                // TODO: add native modules!

                // Needed for `react-native link`
                //new MainReactPackage(),
                new BackgroundTimerPackage(),
                new UploaderReactPackage(),
                new RNFirebasePackage(),
                new RNFirebaseCrashlyticsPackage(),
                new RNFirebaseAnalyticsPackage(),
                new RNFirebaseRemoteConfigPackage(),                
                new RNDeviceInfo(),
                new RNCommonLibPackage()
        );
    }

  public List<Package> getExpoPackages() {
    return new BasePackageList().getPackageList();
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
