package com.example.orchardwatch;

import androidx.appcompat.app.AppCompatActivity;

import android.accounts.Account;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpResponse;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

//import adroid.widget.R

public class LoginPage extends AppCompatActivity {

    private EditText authenKey_txt;
    private Button login_btn;
    private TextView invalid_txt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_page);

        authenKey_txt = (EditText)findViewById(R.id.authenticationKey);
        login_btn = (Button)findViewById(R.id.btnLogin);
        invalid_txt = (TextView)findViewById(R.id.invalid_view);

        invalid_txt.setText("Enter Key");

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                validate(authenKey_txt.getText().toString());
            }
        });

    }

    /**
     * Checks if the entered authentication key matches with that retrieved from Lambda function
     * @param key
     */
    private void validate(String key) {
        String url = "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/authorization_mobile";
        final JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("code", key);
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
                    invalid_txt.setText("Invalid Key");
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

    private void processResponse(String response) {
        Log.d("tag", response);
        if(response.equals("\"success\"")){
            Intent intent = new Intent(LoginPage.this, MainActivity.class);
            startActivity(intent);
        }
    }

}
