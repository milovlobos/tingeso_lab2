package com.example.demo.Service;


import com.example.demo.Entity.state_entity;
import com.example.demo.Model.Credit_entity;
import com.example.demo.Repository.state_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class state_service {
@Autowired
state_repository state_repository;

    @Autowired
    RestTemplate restTemplate;

    public boolean newstate(long id_credit, int state_new){
        state_entity state_entity = new state_entity();
        state_entity.setIdCredit(id_credit);
        state_entity.setState(state_new);
        state_repository.save(state_entity);
        return true;
    }
    public int getstate(long id){
        return state_repository.getByIdCredit(id).getState();
    }

    public int updateState(long id_credit, int state_new) {
        try {
            // Buscar la entidad de crédito por ID
            state_entity state_entity = state_repository.getByIdCredit(id_credit);

            // Si no existe el crédito, arrojar un error 404 (Not Found)
            if (state_entity == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Crédito no encontrado");

            }

            // Actualizar el estado y guardar
            state_entity.setState(state_new);
            state_repository.save(state_entity);

            return 1; // Devuelve 1 si todo fue bien

        } catch (ResponseStatusException e) {
            throw new RuntimeException(e);
        }

    }



}
