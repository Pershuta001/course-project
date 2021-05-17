package com.example.project.convertors;

import com.example.project.model.UserHistory;
import com.example.project.view.ReplyResponseView;
import com.example.project.view.SharedDataView;
import com.example.project.view.UserView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserHistoryConverter {
    private final MarkerConvertor markerConvertor;
    private final SocialConvertor socialConvertor;

    public List<ReplyResponseView> convert(List<UserHistory> replies) {
        return replies.stream().map(this::convert).collect(Collectors.toList());
    }

    public List<SharedDataView> convertData(List<UserHistory> replies) {
        return replies.stream().map(this::convertData).collect(Collectors.toList());
    }

    public ReplyResponseView convert(UserHistory reply) {
        return ReplyResponseView
                .builder()
                .replyId(reply.getId())
                .answer(reply.getAnswer())
                .marker(markerConvertor.convert(reply.getMarkerId()))
                .userFirstname(reply.getUserEntity().getFirstName())
                .userLastname(reply.getUserEntity().getLastName())
                .replierKarma(reply.getUserEntity().getKarma())
                .replierRating(reply.getUserEntity().getRating())
                .userId(reply.getUserEntity().getId())
                .build();
    }

    public SharedDataView convertData(UserHistory reply) {
        return SharedDataView.builder()
                .marker(markerConvertor.convert(reply.getMarkerId()))
                .replier(UserView.builder()
                        .userLastname(reply.getUserEntity().getLastName())
                        .userFirstname(reply.getUserEntity().getFirstName())
                        .rating(reply.getUserEntity().getRating())
                        .karma(reply.getUserEntity().getKarma())
                        .build())
                .ownerSocials(socialConvertor.convert(reply.getMarkerId().getUserEntityId().getSocials()))
                .replierSocials(socialConvertor.convert(reply.getUserEntity().getSocials()))
                .replyId(reply.getId())
                .build();
    }


}
