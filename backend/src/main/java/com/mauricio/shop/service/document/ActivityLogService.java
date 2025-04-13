package com.mauricio.shop.service.document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mauricio.shop.document.ActivityLog;
import com.mauricio.shop.repository.mongo.ActivityLogRepository;

@Service
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    @Autowired
    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    //CREATE
    public ActivityLog createActivityLog(ActivityLog activityLog) {
        activityLog.setTimestamp(LocalDateTime.now());
        return activityLogRepository.save(activityLog);
    }

    //READ
    public List<ActivityLog> getAllActivityLogs() {
        return activityLogRepository.findAll();
    }

    public List<ActivityLog> getActivityLogsByUserId(String userId) {
        return activityLogRepository.findByUserId(userId);
    }

    public Optional<ActivityLog> getActivityLogById(String id) {
        return activityLogRepository.findById(id);
    }

    //UPDATE
    public Optional<ActivityLog> updateActivityLog(ActivityLog activityLog) {
        return activityLogRepository.findById(activityLog.getId())
                .map(existingActivityLog -> {
                    existingActivityLog.setUserId(activityLog.getUserId());
                    existingActivityLog.setAction(activityLog.getAction());
                    existingActivityLog.setTimestamp(activityLog.getTimestamp());
                    return activityLogRepository.save(existingActivityLog);
                });
    }

    //DELETE
    public void deleteActivityLog(String id) {
        activityLogRepository.deleteById(id);
    }
}
