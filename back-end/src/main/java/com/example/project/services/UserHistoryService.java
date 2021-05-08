package com.example.project.services;

import com.example.project.model.Marker;
import com.example.project.model.UserEntity;
import com.example.project.model.UserHistory;
import com.example.project.repositories.MarkerRepository;
import com.example.project.repositories.UserHistoryRepository;
import com.example.project.repositories.UserRepository;
import com.example.project.view.ConfirmReplyView;
import com.example.project.view.ReplyOnMarkerView;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserHistoryService {
    private final UserHistoryRepository userHistoryRepository;
    private final UserRepository userRepository;
    private final MarkerRepository markerRepository;

    @Transactional
    public String replyOnMarker(ReplyOnMarkerView replyOnMarkerView) {
        userHistoryRepository.save(
                UserHistory
                        .builder()
                        .answer(replyOnMarkerView.getAnswer())
                        .userEntity(currentUser())
                        .markerId(markerRepository.getOne(replyOnMarkerView.getMarkerId()))
                        .build());
        return "success";
    }

    @Transactional
    public List<UserHistory> getActiveRepliesForCurrentUser() {
        return userHistoryRepository.findByMarkerId_UserEntityIdAndDateIsNull(currentUser());
    }

    @Transactional
    public List<UserHistory> getAllRepliesForCurrentUser() {
        return userHistoryRepository.findByMarkerId_UserEntityId(currentUser());
    }

    @Transactional
    public List<UserHistory> getSharedData() {
        return userHistoryRepository.findByMarkerId_UserEntityIdAndDateIsNotNull(currentUser());
    }

    @Transactional
    public String confirmReply(ConfirmReplyView confirmReplyView) {
        UserHistory userHistory = userHistoryRepository.getOne(confirmReplyView.getReplyId());
        userHistory.setDate(Date.valueOf(LocalDate.now()));
        userHistoryRepository.save(userHistory);
        return "success";
    }

    @SneakyThrows
    @Transactional
    public String deleteReply(UUID replyId) {
        Optional<UserHistory> userHistory = userHistoryRepository.findById(replyId);
        if (userHistory.isEmpty()) {
            throw new Exception("Now such marker exists");
        }
        if (!userHistory.get().getUserEntity().equals(currentUser()))
            throw new Exception("Can't delete marker with such id");
        userHistoryRepository.delete(userHistory.get());
        return "success";
    }

    private UserEntity currentUser() {
        String login = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findUserByLogin(login).get();
    }

}
