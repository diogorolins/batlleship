package com.diogorolins.battleShip.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diogorolins.battleShip.model.ShipType;

public interface ShipTypeRepository extends JpaRepository<ShipType, Integer> {

}
