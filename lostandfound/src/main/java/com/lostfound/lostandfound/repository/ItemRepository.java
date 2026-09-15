
package com.lostfound.lostandfound.repository;

import com.lostfound.lostandfound.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByReportedBy(String reportedBy);

}
