package com.example.demo.Service;

import com.example.demo.Entity.User_entity;
import com.example.demo.Repository.User_repository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
public class capacity_Test {

    @InjectMocks
    private capacity_service capacityService;

    @Mock
    private User_repository userRepo;

    private User_entity user;
    private User_entity user2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User_entity();
        user.setId(1L);
        user.setAge(30);
        user.setBalance(10000);
        user.setWork_seniority(2);
        user.setAccount_seniority(3);

        user2=new User_entity();
        user2.setId(2L);
        user2.setAge(70);
        user2.setBalance(10);
        user2.setWork_seniority(0);
        user2.setAccount_seniority(0);
    }

    @BeforeEach

    @Test
    public void testCheckIncomeRatio() {
        // Given
        long userId = 1L;
        int cuota = 1000;
        int ingreso = 3000;

        // When
        boolean result = capacityService.checkIncomeRatio(userId, cuota, ingreso);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckCreditHistory() {
        // Given
        boolean evaluation = true;

        // When
        boolean result = capacityService.checkCreditHistory(evaluation);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckJobStability() {
        // Given
        user.setWork_seniority(2);

        // When
        boolean result = capacityService.checkJobStability(user);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckDebtIncomeRatio() {
        // Given
        int deuda = 2000;
        int ingreso = 5000;

        // When
        boolean result = capacityService.checkDebtIncomeRatio(deuda, ingreso);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckFinancingLimit() {
        // Given
        int valor = 100000;
        int financiamiento = 80000;
        int tipoPropiedad = 1;

        // When
        boolean result = capacityService.checkFinancingLimit(valor, financiamiento, tipoPropiedad);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckApplicantAge() {
        // Given
        user.setAge(30);
        int plazo = 40;

        // When
        boolean result = capacityService.checkApplicantAge(user, plazo);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckMinimumBalance() {
        // Given
        long userId = 1L;
        int balanceMinimo = 50000;
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        boolean result = capacityService.checkMinimumBalance(userId, balanceMinimo);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckConsistentSavingHistory() {
        // Given
        boolean historialConsistente = true;

        // When
        boolean result = capacityService.checkConsistentSavingHistory(historialConsistente);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckPeriodicDeposits() {
        // Given
        boolean depositosPeriodicos = true;

        // When
        boolean result = capacityService.checkPeriodicDeposits(depositosPeriodicos);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckSavingsBalanceAndSeniority() {
        // Given
        long userId = 1L;
        int balanceRequerido = 50000;
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        boolean result = capacityService.checkSavingsBalanceAndSeniority(userId, balanceRequerido);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testCheckRecentWithdrawals() {
        // Given
        long userId = 1L;
        double retirosRecientes = 2000.0;
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        boolean result = capacityService.checkRecentWithdrawals(retirosRecientes, userId);

        // Then
        assertThat(result).isTrue();
    }

    @Test
    public void testEvaluateSavingCapacity() {
        // Given
        int balanceRequerido = 50000;
        boolean historialConsistente = true;
        boolean depositosPeriodicos = true;
        double retirosRecientes = 2000.0;
        when(userRepo.findById(1L)).thenReturn(user);

        // When
        String result = capacityService.evaluateSavingCapacity(user, balanceRequerido, historialConsistente, depositosPeriodicos, retirosRecientes);

        // Then
        assertThat(result).isIn("Sólida", "Moderada", "Insuficiente");
    }

    @Test
    public void testEvaluateCreditApplication() {
        // Given
        long userId = 1L;
        int cuota = 1000;
        int ingreso = 3000;
        int deuda = 1000;
        int valor = 100000;
        int financiamiento = 80000;
        int tipoPropiedad = 1;
        int plazo = 20;
        boolean credit_history = true;
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        List<String> result = capacityService.evaluateCreditApplication(userId, cuota, ingreso, deuda, valor, financiamiento, tipoPropiedad, plazo, credit_history);

        // Then
        assertThat(result).containsExactlyInAnyOrder(
                "Relación cuota/ingreso: Aprobado",
                "Historial crediticio: Aprobado",
                "Estabilidad laboral: Aprobado",
                "Relación deuda/ingreso: Aprobado",
                "Límite de financiamiento: Aprobado",
                "Edad del solicitante: Aprobado"

        );
    }


    @Test
    public void testCheckIncomeRatio_Fallo() {
        // Given
        long userId = 1L;
        int cuota = 2000; // Cuota elevada para forzar fallo
        int ingreso = 3000;

        // When
        boolean result = capacityService.checkIncomeRatio(userId, cuota, ingreso);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testCheckCreditHistory_Fallo() {
        // Given
        boolean evaluation = false; // No hay historial crediticio positivo

        // When
        boolean result = capacityService.checkCreditHistory(evaluation);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testCheckJobStability_Fallo() {
        // Given
        user.setWork_seniority(0); // Antigüedad laboral insuficiente

        // When
        boolean result = capacityService.checkJobStability(user);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testCheckDebtIncomeRatio_Fallo() {
        // Given
        int deuda = 3000; // Deuda elevada para forzar fallo
        int ingreso = 5000;

        // When
        boolean result = capacityService.checkDebtIncomeRatio(deuda, ingreso);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testCheckFinancingLimit_Fallo() {
        // Given
        int valor = 100000;
        int financiamiento = 90000; // Financiamiento que excede el límite
        int tipoPropiedad = 1;

        // When
        boolean result = capacityService.checkFinancingLimit(valor, financiamiento, tipoPropiedad);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testCheckApplicantAge_Fallo() {
        // Given
        user.setAge(70); // Edad alta que forzará un fallo en el plazo
        int plazo = 10;

        // When
        boolean result = capacityService.checkApplicantAge(user, plazo);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testCheckMinimumBalance_Fallo() {
        // Given
        long userId = 3L;
        int balanceMinimo = 3000000; // Balance mínimo mayor al balance del usuario

        // Configurar el usuario con un balance bajo para forzar el fallo
        User_entity user = new User_entity();
        user.setId(userId);
        user.setBalance(10000); // Balance menor al 10% de balanceMinimo, es decir, 1500

        // Mock de la llamada a userRepo.findById para devolver el usuario configurado
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        boolean result = capacityService.checkMinimumBalance(userId, balanceMinimo);

        // Then
        assertThat(result).isFalse();
    }


    @Test
    public void testEvaluateCreditNoApplication_WithElseCases() {
        // Given
        long userId = 2L;
        int cuota = 5000; // Valor elevado para forzar fallo
        int ingreso = 1000;
        int deuda = 10000;
        int valor = 5000;
        int financiamiento = 4500;
        int tipoPropiedad = 1;
        int plazo = 20;
        boolean credit_history = false; // Historial de crédito negativo

        // Configuración del usuario para garantizar fallos en las verificaciones de edad y estabilidad laboral
        User_entity user = new User_entity();
        user.setId(userId);
        user.setAge(70);  // Edad que, con el plazo, excederá el máximo permitido de 75 años
        user.setWork_seniority(0); // Insuficiente antigüedad laboral para que falle la verificación de estabilidad
        user.setBalance(1000); // Configura el balance para cualquier verificación de balance si es necesario

        // Mock de la llamada a userRepo.findById para devolver el usuario configurado
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        List<String> result = capacityService.evaluateCreditApplication(userId, cuota, ingreso, deuda, valor, financiamiento, tipoPropiedad, plazo, credit_history);

        // Then
        assertThat(result).containsExactlyInAnyOrder(
                "Relación cuota/ingreso: Fallo",
                "Historial crediticio: Fallo",
                "Estabilidad laboral: Fallo",
                "Relación deuda/ingreso: Fallo",
                "Límite de financiamiento: Fallo",
                "Edad del solicitante: Fallo"
        );
    }


}

