package com.awesomeproject;

import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;




public class ConnectionStatusModuleManager extends ReactContextBaseJavaModule {
    public Context mContext;
    private Intent mService;
    private boolean mConnected = false;
    private String mName = null;
    public ConnectionStatusModuleManager (ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        ConnectionNotificationService.setUpdateListener(this);
    }

    public void setModuleParams(boolean connected, String name) {
        mConnected = connected;
        mName = name;
    }

    public void removeServiceReference() {
        mService = null;
    }

    @Override
    public String getName() {
        return "ConnectionStatusModule";
    }

    @ReactMethod
    public void checkConnectionStatus(Callback callback) {
            if (mService == null) {
                mService = new Intent(mContext, ConnectionNotificationService.class);
                mContext.startService(mService);
            }
        callback.invoke(mName, mConnected);
    }

}
