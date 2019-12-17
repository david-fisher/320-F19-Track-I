package com.example.orchardwatch;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpResponse;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.net.HttpURLConnection;
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
    private void validate(String key){
        String valid_key = "1234";//(key GET from lambda)
        final TextView textView = (TextView) findViewById(R.id.text);

        //Log.d("hello", "UMASS 320------------");
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/mobile_authentication";
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
//                String id = response.getString("statusCode");
                String status_code = "";
//                try{
//                    status_code = response.get("statusCode");
//                }
                Log.d("hello", "UMASS 320------------");
                textView.setText(response.toString());

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error){
                textView.setText("oops");
            }

        });
        queue.add(jsonObjectRequest);

//        StringRequest req = new StringRequest(Request.Method.POST, url,
//                new Response.Listener<String>() {
//            @Override
//            public void onResponse(String response) {
//                textView.setText(response.toString());
//            }
//        });

        if(key.equals(valid_key)){
            //Used to move from one activity to another activity
            Intent intent = new Intent(LoginPage.this, MainActivity.class);
            startActivity(intent);
        } else {
            invalid_txt.setText("Invalid Key");
        }
    }

}
