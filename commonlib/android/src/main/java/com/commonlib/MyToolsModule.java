
package com.commonlib;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.File;
import javax.annotation.Nullable;

import android.content.Intent;
import android.content.ContentUris;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.database.Cursor;
import android.graphics.Color;
import android.os.Build;
import android.app.Activity;
import android.app.ActivityManager;
import android.media.MediaScannerConnection;

import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Arguments;

public class MyToolsModule extends ReactContextBaseJavaModule {

    public MyToolsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyToolsModule";
    }

    @ReactMethod
    public void updateTaskDescription(final @Nullable String mLabel, @Nullable String hex) {
        final Integer mColor = hex != null ? Color.parseColor(hex) : null;
        final Activity activity = getCurrentActivity();

        if (activity == null) return;

        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Build.VERSION.SDK_INT >= 21) {
                    ActivityManager.TaskDescription taskDesc;

                    if (mColor != null) {
                        taskDesc = new ActivityManager.TaskDescription(mLabel, null, mColor);
                    } else if (mLabel != null) {
                        taskDesc = new ActivityManager.TaskDescription(mLabel);
                    } else {
                        return;
                    }

                    activity.setTaskDescription(taskDesc);
                }
            }
        });
    }    
}