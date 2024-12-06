package com.example.demo.Service;


import com.example.demo.Entity.Credit_entity;
import com.example.demo.Repository.Credit_repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class Credit_service {
    @Autowired
    Credit_repository credit_repository;
    @Autowired
    RestTemplate restTemplate;


    public List<Credit_entity> getall() {
        return credit_repository.findAll();

    }

    public List<Credit_entity> getbyid_user(Long id) {
        return credit_repository.findByIduser(id);
    }

    public Optional<Credit_entity> getbyid(Long id) {
        return credit_repository.findById(id);
    }


    public Credit_entity create_credit_type_1(Long id_user, float interest, int time, int diner, LocalDate date) {
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(1);
        credit_entity.setDate(date);
        credit_repository.save(credit_entity);
        // Llamar al endpoint "/new/{idcredit}/{state}" usando RestTemplate
        String url = "http://tracking-service/api/state/new/{idcredit}/{state}";

        // Reemplazar los valores dinámicos en la URL
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("idcredit", credit_entity.getId());
        uriVariables.put("state", 1); // Ejemplo: establecer un estado inicial de 1

        // Realizar la llamada al servicio remoto
        ResponseEntity<Boolean> response = restTemplate.postForEntity(url, null, Boolean.class, uriVariables);

        // Verificar si la llamada fue exitosa
        if (response.getStatusCode().is2xxSuccessful() && Boolean.TRUE.equals(response.getBody())) {
            return credit_entity;
        }

        // Manejar errores si la llamada falla
        throw new RuntimeException("Failed to update state for Credit ID: " + credit_entity.getId());
    }


    public Credit_entity create_credit_type_2(Long id_user, float interest, int time, int diner, LocalDate date) {
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(2);
        credit_entity.setDate(date);
        credit_repository.save(credit_entity);
        // Llamar al endpoint "/new/{idcredit}/{state}" usando RestTemplate
        String url = "http://tracking-service/api/state/new/{idcredit}/{state}";

        // Reemplazar los valores dinámicos en la URL
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("idcredit", credit_entity.getId());
        uriVariables.put("state", 1); // Ejemplo: establecer un estado inicial de 1

        // Realizar la llamada al servicio remoto
        ResponseEntity<Boolean> response = restTemplate.postForEntity(url, null, Boolean.class, uriVariables);

        // Verificar si la llamada fue exitosa
        if (response.getStatusCode().is2xxSuccessful() && Boolean.TRUE.equals(response.getBody())) {
            return credit_entity;
        }

        // Manejar errores si la llamada falla
        throw new RuntimeException("Failed to update state for Credit ID: " + credit_entity.getId());
    }


    public Credit_entity create_credit_type_3(Long id_user, float interest, int time, int diner, LocalDate date) {
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(3);
        credit_entity.setDate(date);


        credit_repository.save(credit_entity);
        // Llamar al endpoint "/new/{idcredit}/{state}" usando RestTemplate
        String url = "http://tracking-service/api/state/new/{idcredit}/{state}";

        // Reemplazar los valores dinámicos en la URL
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("idcredit", credit_entity.getId());
        uriVariables.put("state", 1); // Ejemplo: establecer un estado inicial de 1

        // Realizar la llamada al servicio remoto
        ResponseEntity<Boolean> response = restTemplate.postForEntity(url, null, Boolean.class, uriVariables);

        // Verificar si la llamada fue exitosa
        if (response.getStatusCode().is2xxSuccessful() && Boolean.TRUE.equals(response.getBody())) {
            return credit_entity;
        }

        // Manejar errores si la llamada falla
        throw new RuntimeException("Failed to update state for Credit ID: " + credit_entity.getId());
    }

    public Credit_entity create_credit_type_4(Long id_user, float interest, int time, int diner, LocalDate date) {
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(4);
        credit_entity.setDate(date);
        credit_repository.save(credit_entity);
        // Llamar al endpoint "/new/{idcredit}/{state}" usando RestTemplate
        String url = "http://tracking-service/api/state/new/{idcredit}/{state}";

        // Reemplazar los valores dinámicos en la URL
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("idcredit", credit_entity.getId());
        uriVariables.put("state", 1); // Ejemplo: establecer un estado inicial de 1

        // Realizar la llamada al servicio remoto
        ResponseEntity<Boolean> response = restTemplate.postForEntity(url, null, Boolean.class, uriVariables);

        // Verificar si la llamada fue exitosa
        if (response.getStatusCode().is2xxSuccessful() && Boolean.TRUE.equals(response.getBody())) {
            return credit_entity;
        }

        // Manejar errores si la llamada falla
        throw new RuntimeException("Failed to update state for Credit ID: " + credit_entity.getId());
    }

}




