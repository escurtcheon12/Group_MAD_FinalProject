package com.example.group_finalproject.API;

import com.example.group_finalproject.Model.PostResponseModel;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface APIRequestPostData {
    @GET("show_post.php")
            //arpd itu singkatan dari APIRequestPostData
    Call<PostResponseModel> arpdRetrievePostData();

    @FormUrlEncoded
    @POST("create_post.php")
    Call<PostResponseModel> arpdCreatePostData(
            @Field("post_author") String postAuthor,
            @Field("post_category") String postCategory,
            @Field("post_text_report") String postTextReport,
            @Field("post_location") String postLocation
    );

    @FormUrlEncoded
    @POST("delete_post.php")
    Call<PostResponseModel> arpdDeletePostData(
      @Field("post_id") int postId
    );

    @FormUrlEncoded
    @POST("get_post_data.php")
    Call<PostResponseModel> arpdGetPostData(
            @Field("post_id") int postId
    );

    @FormUrlEncoded
    @POST("edit_post.php")
    Call<PostResponseModel> arpdEditPostData(
            @Field("post_id") int postId,
            @Field("post_author") String postAuthor,
            @Field("post_category") String postCategory,
            @Field("post_text_report") String postTextReport,
            @Field("post_location") String postLocation
    );

}
