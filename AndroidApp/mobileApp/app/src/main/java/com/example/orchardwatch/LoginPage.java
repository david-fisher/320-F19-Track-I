package com.example.orchardwatch;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

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
        if(key.equals(valid_key)){
            //Used to move from one activity to another activity
            Intent intent = new Intent(LoginPage.this, MainActivity.class);
            startActivity(intent);
        } else {
            invalid_txt.setText("Invalid Key");
        }
    }

}
