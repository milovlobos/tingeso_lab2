package com.example.demo.Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
public class credit_Test {

    @InjectMocks
    private Credit_service creditService;

    @Mock
    private Credit_repository creditRepository;

    private Credit_entity creditEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        creditEntity = new Credit_entity();
        creditEntity.setIduser(1L);
        creditEntity.setInterest(5.0f);
        creditEntity.setTime(5);
        creditEntity.setDiner(100000);
        creditEntity.setType(1);
        creditEntity.setDate(LocalDate.now());
        creditEntity.setState(1);
    }

    @Test
    void testGetAll() {
        // Given
        when(creditRepository.findAll()).thenReturn(List.of(creditEntity));

        // When
        List<Credit_entity> result = creditService.getall();

        // Then
        assertThat(result).containsExactly(creditEntity);
        verify(creditRepository, times(1)).findAll();
    }

    @Test
    void testGetByIdUser() {
        // Given
        Long userId = 1L;
        when(creditRepository.findByIduser(userId)).thenReturn(List.of(creditEntity));

        // When
        List<Credit_entity> result = creditService.getbyid_user(userId);

        // Then
        assertThat(result).containsExactly(creditEntity);
        verify(creditRepository, times(1)).findByIduser(userId);
    }

    @Test
    void testGetById() {
        // Given
        Long creditId = 1L;
        when(creditRepository.findById(creditId)).thenReturn(Optional.of(creditEntity));

        // When
        Optional<Credit_entity> result = creditService.getbyid(creditId);

        // Then
        assertThat(result).contains(creditEntity);
        verify(creditRepository, times(1)).findById(creditId);
    }

    @Test
    void testUpdateState_Success() {
        // Given
        long creditId = 1L;
        int newState = 2;
        when(creditRepository.getCredit_entityById(creditId)).thenReturn(creditEntity);

        // When
        int result = creditService.updateState(creditId, newState);

        // Then
        assertThat(result).isEqualTo(1);
        assertThat(creditEntity.getState()).isEqualTo(newState);
        verify(creditRepository, times(1)).save(creditEntity);
    }

    @Test
    void testUpdateState_CreditNotFound() {
        // Given
        long creditId = 1L;
        int newState = 2;
        when(creditRepository.getCredit_entityById(creditId)).thenReturn(null);

        // When & Then
        assertThrows(RuntimeException.class, () -> creditService.updateState(creditId, newState));
        verify(creditRepository, never()).save(any());
    }

    @Test
    void testCreateCreditType1() {
        // Given
        Long userId = 1L;
        float interest = 5.0f;
        int time = 12;
        int diner = 50000;
        LocalDate date = LocalDate.now();

        // When
        Credit_entity result = creditService.create_credit_type_1(userId, interest, time, diner, date);

        // Then
        assertThat(result.getType()).isEqualTo(1);
        verify(creditRepository, times(1)).save(result);
    }

    @Test
    void testCreateCreditType2() {
        // Given
        Long userId = 1L;
        float interest = 5.0f;
        int time = 12;
        int diner = 50000;
        LocalDate date = LocalDate.now();

        // When
        Credit_entity result = creditService.create_credit_type_2(userId, interest, time, diner, date);

        // Then
        assertThat(result.getType()).isEqualTo(2);
        verify(creditRepository, times(1)).save(result);
    }
    @Test
    void testCreateCreditType3() {
        // Given
        Long userId = 1L;
        float interest = 5.0f;
        int time = 12;
        int diner = 50000;
        LocalDate date = LocalDate.now();

        // When
        Credit_entity result = creditService.create_credit_type_3(userId, interest, time, diner, date);

        // Then
        assertThat(result.getType()).isEqualTo(3);
        verify(creditRepository, times(1)).save(result);
    }

    @Test
    void testCreateCreditType4() {
        // Given
        Long userId = 1L;
        float interest = 5.0f;
        int time = 12;
        int diner = 50000;
        LocalDate date = LocalDate.now();

        // When
        Credit_entity result = creditService.create_credit_type_4(userId, interest, time, diner, date);

        // Then
        assertThat(result.getType()).isEqualTo(4);
        verify(creditRepository, times(1)).save(result);
    }


    @Test
    void testSimulationCreditAmount() {
        // Given
        double amount = 100000;
        double interest = 5.0;
        int years = 10;

        // When
        double result = creditService.simulation_credit_amount(amount, interest, years);

        // Then
        assertThat(result).isGreaterThan(0);
    }

    @Test
    void testRelationCI() {
        // Given
        double monthAmount = 1000;
        double monthEntry = 10000;

        // When
        int result = creditService.relationCI(monthAmount, monthEntry);

        // Then
        assertThat(result).isEqualTo(1); // Resultado esperado para relación CI < 0.35
    }

    @Test
    void testMaxFinancing() {
        // Given
        int creditType = 1;
        double propertyAmount = 500000;

        // When
        double result = creditService.maxFinancing(creditType, propertyAmount);

        // Then
        assertThat(result).isEqualTo(400000); // 80% de 500000 para tipo de crédito 1
    }

    @Test
    void testFinalCostMonth() {
        // Given
        long requestedAmount = 100000;
        double interest = 5.0;
        int years = 10;

        // When
        double result = creditService.finalCostMonth(requestedAmount, interest, years);

        // Then
        assertThat(result).isGreaterThan(0);
    }

    @Test
    void testCostTotal() {
        // Given
        double monthAmount = 1000;
        int years = 5;
        long requestedAmount = 50000;

        // When
        double result = creditService.CostTotal(monthAmount, years, requestedAmount);

        // Then
        assertThat(result).isGreaterThan(0);
    }

    @Test
    void testRelationDI() {
        // Given
        double montAmount = 2000;
        double debtsMonthlyAmount = 500;
        double creditMontAmount = 500;

        // When
        int result = creditService.relationDI(montAmount, debtsMonthlyAmount, creditMontAmount);

        // Then
        assertThat(result).isEqualTo(1); // 1 indica que el ratio es mayor que el 50%
    }
}
