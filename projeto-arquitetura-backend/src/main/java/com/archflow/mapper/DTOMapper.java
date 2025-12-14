package com.archflow.mapper;

/**
 * Interface genérica para mapeamento entre entidades e DTOs.
 * Segue o padrão Strategy e Single Responsibility Principle.
 * 
 * @param <E> Tipo da Entidade (Entity)
 * @param <D> Tipo do DTO (Data Transfer Object)
 */
public interface DTOMapper<E, D> {

    /**
     * Converte uma entidade para DTO.
     * 
     * @param entity Entidade a ser convertida
     * @return DTO correspondente
     */
    D toDTO(E entity);

    /**
     * Converte um DTO para entidade.
     * Útil para operações de criação/atualização.
     * 
     * @param dto DTO a ser convertido
     * @return Entidade correspondente
     */
    E toEntity(D dto);
}
