package com.example.orchardwatch;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {
    private WebView my_webview;
    Button camera;
    Button gallery;

    private static final int PICK_IMAGE = 100;
    Uri imageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        camera = (Button)findViewById(R.id.camera);
        camera.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                try {
                    Intent intent = new Intent();
                    intent.setAction(MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivity(intent);
                }
                catch (Exception e){
                    e.printStackTrace();
                }
            }
        });

        gallery = (Button)findViewById(R.id.gallery);
        gallery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openGallery();
            }
        });


//        BottomNavigationView navView = findViewById(R.id.nav_view);
//        // Passing each menu ID as a set of Ids because each
//        // menu should be considered as top level destinations.
//        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
//                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
//                .build();
//        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
//        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
//        NavigationUI.setupWithNavController(navView, navController);

        my_webview = (WebView)findViewById(R.id.webView);

        WebSettings web_settings = my_webview.getSettings();
        web_settings.setJavaScriptEnabled(true);

        my_webview.loadUrl("http://d3gvvf4yx7ay63.cloudfront.net/"); //http://d3gvvf4yx7ay63.cloudfront.net/
        my_webview.setWebViewClient(new WebViewClient());   //prevent opening in another browser instead of the app

    }

    private void openGallery(){
        Intent album = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
        startActivityForResult(album, PICK_IMAGE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == RESULT_OK && requestCode == PICK_IMAGE){
            imageUri = data.getData();
            //this is where to insert code when photo from gallery has been selected
            //Example from tutorial (https://www.youtube.com/watch?v=OPnusBmMQTw)
            //imageView.setImageURI(imageUri);

            //compressing picture to string example: https://stackoverflow.com/questions/4830711/how-to-convert-a-image-into-base64-string
            String imagePath = imageUri.getPath();
            String str64 = convertFileToByte(imagePath);

            //sending Base64 string of image to Lambda
            String url = "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/ml/mobile_classify";
            final JSONObject jsonObject = new JSONObject();

            try {
                jsonObject.put("model", "resnet_keras.h5");
                jsonObject.put("pic", str64);
            } catch (JSONException e){
                Log.d("tag", "json put error: " + e.toString());
            }

            RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            processResponse(response);
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    NetworkResponse response = error.networkResponse;
                    if (response != null) {
                        //invalid_txt.setText("Invalid Key");
                        Log.d("tag", "error code: " + response.statusCode);
                    }
                }
            }) {
                @Override
                public byte[] getBody() throws AuthFailureError {
                    return jsonObject.toString().getBytes();
                }

                @Override
                public String getBodyContentType() {
                    return "application/json";
                }

            };

            queue.add(stringRequest);


        }
    }

    private void processResponse(String response) {
        Log.d("tag", response);
        if(response.equals("\"success\"")){
            Log.d("response", "response retrieved");
            //This is where we should display the ML result
        }
    }

    /**
     *
     * @param filePath - path of file from 'imageUri'
     * @return Base64 String of file from 'filePath'
     */
    public static String convertFileToByte(String filePath){
        Bitmap bmp = null;
        ByteArrayOutputStream bos = null;
        byte[] bt = null;
        String encodeString = null;
        try{
            bmp = BitmapFactory.decodeFile(filePath);
            bos = new ByteArrayOutputStream();
            bmp.compress(Bitmap.CompressFormat.JPEG, 100, bos);
            bt = bos.toByteArray();
            encodeString = Base64.encodeToString(bt, Base64.DEFAULT);
        }catch (Exception e){
            e.printStackTrace();
        }
        return encodeString;
    }

    /*
    When back button is clicked, it goes back to the previous page
     */
    @Override
    public void onBackPressed() {
        if(my_webview.canGoBack()){
            my_webview.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
