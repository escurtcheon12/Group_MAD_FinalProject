package com.example.group_finalproject.Model;

import java.util.Date;

public class PostDataModel {
    private int post_id;
    private String post_author, post_category, post_text_report, post_location;
    private Date post_date;

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    public String getPost_author() {
        return post_author;
    }

    public void setPost_author(String post_author) {
        this.post_author = post_author;
    }

    public String getPost_category() {
        return post_category;
    }

    public void setPost_category(String post_category) {
        this.post_category = post_category;
    }

    public String getPost_text_report() {
        return post_text_report;
    }

    public void setPost_text_report(String post_text_report) {
        this.post_text_report = post_text_report;
    }

    public String getPost_location() {
        return post_location;
    }

    public void setPost_location(String post_location) {
        this.post_location = post_location;
    }

    public Date getPost_date() {
        return post_date;
    }

    public void setPost_date(Date post_date) {
        this.post_date = post_date;
    }
}
