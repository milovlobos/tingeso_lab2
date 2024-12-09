package com.example.demo.Controller;
import com.example.demo.Service.state_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/state")
public class state_controller {
    @Autowired
    private state_service state_service;

    @PostMapping("/new/{idcredit}/{state}")
    public boolean newstate(@PathVariable long idcredit,@PathVariable int state){
        return state_service.newstate(idcredit,state);
    }

    @GetMapping("/getstate/{idcredit}")
    public int getstate(@PathVariable long idcredit){
        return  state_service.getstate(idcredit);
    }

    @PostMapping("/update/{idcredit}/{state}")
    public int update(@PathVariable long idcredit,@PathVariable int state){
        return state_service.updateState(idcredit,state);
    }




}
