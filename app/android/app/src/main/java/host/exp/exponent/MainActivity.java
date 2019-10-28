package host.exp.exponent;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;

import com.facebook.react.ReactPackage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import org.unimodules.core.interfaces.Package;

import java.util.List;

//import expo.core.interfaces.Package;
import host.exp.exponent.experience.DetachActivity;
import host.exp.exponent.generated.DetachBuildConstants;
public class MainActivity extends DetachActivity {

    @Override
    public String publishedUrl() {
        return "exp://exp.host/@onka13/rn-boilerplate";
    }

    @Override
    public String developmentUrl() {
        return DetachBuildConstants.DEVELOPMENT_URL;
    }

  @Override
  public List<ReactPackage> reactPackages() {
    return ((MainApplication) getApplication()).getPackages();
  }

  @Override
  public List<Package> expoPackages() {
    return ((MainApplication) getApplication()).getExpoPackages();
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

    @Override
    public Bundle initialProps(Bundle expBundle) {
        // Add extra initialProps here
        return expBundle;
    }
}
