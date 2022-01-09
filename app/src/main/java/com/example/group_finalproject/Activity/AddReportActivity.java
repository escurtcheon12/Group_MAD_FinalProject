package com.example.group_finalproject.Activity;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.group_finalproject.API.APIRequestPostData;
import com.example.group_finalproject.API.PostRetroServer;
import com.example.group_finalproject.Model.PostResponseModel;
import com.example.group_finalproject.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddReportActivity extends AppCompatActivity {

    private EditText etCategory, etTextReport, etLocation, etAuthor;
    private Button btnAddReport;
    private String postCategory, postTextReport, postLocation, postAuthor;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();
        setContentView(R.layout.activity_add_report);

        etCategory = findViewById(R.id.et_category);
        etTextReport = findViewById(R.id.et_text_report);
        etLocation = findViewById(R.id.et_location);
        etAuthor = findViewById(R.id.et_author);

        btnAddReport = findViewById(R.id.btn_add_report);

        btnAddReport.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                postCategory = etCategory.getText().toString();
                postTextReport = etTextReport.getText().toString();
                postLocation = etLocation.getText().toString();
                postAuthor = etAuthor.getText().toString();

                if(postCategory.trim().equals("")){

                    etCategory.setError("Must input the category");

                }else if(postTextReport.trim().equals("")){

                    etTextReport.setError("Must input the text report");

                }else if(postLocation.trim().equals("")){

                    etLocation.setError("Must input the location");

                }else if(postAuthor.trim().equals("")){

                    etAuthor.setError("Must input the author");

                }else{
                    createPostData();
                }
            }
        });
    }

    private void createPostData(){
        APIRequestPostData arpdPostData = PostRetroServer.postConnectRetrofit().create(APIRequestPostData.class);
        Call<PostResponseModel> savePostData = arpdPostData.arpdCreatePostData(postAuthor, postCategory, postTextReport, postLocation);

        savePostData.enqueue(new Callback<PostResponseModel>() {
            @Override
            public void onResponse(Call<PostResponseModel> call, Response<PostResponseModel> response) {
                int code = response.body().getCode();
                String message = response.body().getMessage();

                Toast.makeText(AddReportActivity.this, "Code: "+code+" | Message: "+message, Toast.LENGTH_SHORT).show();
                finish();
            }

            @Override
            public void onFailure(Call<PostResponseModel> call, Throwable t) {
                Toast.makeText(AddReportActivity.this, "Failed to connect to the server | "+t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}