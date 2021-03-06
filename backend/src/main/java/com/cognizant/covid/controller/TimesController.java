package com.cognizant.covid.controller;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.covid.beans.PopularTime;
import com.cognizant.covid.service.TimesService;

@RestController
public class TimesController {
    
    @Autowired
    private TimesService service;
       
    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/popularTimes")
    @ResponseBody
    public PopularTime getPopularTimes(@RequestParam(value = "address") String address) throws JSONException{
        return service.get_populartimes(System.getenv("API_KEY"), address);
    }
}
