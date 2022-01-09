package com.example.group_finalproject.Activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.view.View;
import android.view.Window;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import com.example.group_finalproject.R;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();
        setContentView(R.layout.activity_main);

        TextView signUp = (TextView) findViewById(R.id.textView6);
        signUp.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent myIntent = new Intent(view.getContext(), SignUpActivity.class);
                startActivityForResult(myIntent, 0);
            }

        });

        Button signInBtn = (Button) findViewById(R.id.btn_add_report);
        signInBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent myIntent = new Intent(view.getContext(), HomeActivity.class);
                startActivityForResult(myIntent, 0);
            }

        });
    }
}