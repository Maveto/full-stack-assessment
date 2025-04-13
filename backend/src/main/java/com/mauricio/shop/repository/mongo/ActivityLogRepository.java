package com.mauricio.shop.repository.mongo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mauricio.shop.document.ActivityLog;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {

    public List<ActivityLog> findByUserId(String userId);

}
