package com.example.demo.Service;

import com.example.demo.Entity.User_entity;
import com.example.demo.Repository.User_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class User_service {
@Autowired
    User_repository user_repo;

    @Autowired
    RestTemplate restTemplate;


    public List<User_entity>getall(){
        return user_repo.findAll();
    }

  // Método para registrar un nuevo usuario
  public User_entity register(String name, String password, String email,String phone,String rut, int age, boolean employee, int a_s, int w_s, int s_c, double balance, boolean independent) {



      //Verificacion de que los datos hayan sido rellenados
      if( name.isEmpty() || password.isEmpty() || email.isEmpty()) {
          return null;
      }



      // Verificar si ya existe un usuario con el mismo email
      User_entity existe = user_repo.findByEmail(email);
      if (existe != null) {
          // Si el usuario ya existe, se retorna null
          return null;
      }

      // Crear un nuevo objeto Usuario con los datos proporcionados y sin premium
      User_entity user = new User_entity(name, password, email,phone,rut,age,employee,a_s,w_s,s_c,balance,independent);

      // Si no existe, se guarda el nuevo usuario en la base de datos y se retorna
      return user_repo.save(user);
  }

    // Método para realizar el login de un usuario
    public int login(String email,String password) {
        User_entity user = user_repo.findByEmail(email);
        if(user == null) {
            return -1; // el usuario no existe
        }
        if(user.getPassword().equals(password)) {
            return 1;

        }
        return 0; // ocurrio un error
    }
    public User_entity getUser_byemail(String email) {
        return user_repo.findByEmail(email);
    }
    public Optional<User_entity> getUser_byid(Long id) {
        return user_repo.findById(id);
    }

    public boolean isemployee(String email) {
        User_entity user = user_repo.findByEmail(email);
        return  user.isEmployee();

    }


}
