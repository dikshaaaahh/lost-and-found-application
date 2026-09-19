
package com.lostfound.lostandfound.controller;

import com.lostfound.lostandfound.model.Item;
import com.lostfound.lostandfound.repository.ItemRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @PostMapping
    public Item addItem(@RequestBody Item item) {

        System.out.println("REPORTED BY = " + item.getReportedBy());
        System.out.println("ITEM DATE = " + item.getItemDate());

        return itemRepository.save(item);
    }

    @GetMapping("/my-reports")
    public List<Item> getMyReports(@RequestParam String name) {
        return itemRepository.findByReportedByIgnoreCase(name);
    }
}

