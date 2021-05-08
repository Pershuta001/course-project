package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SharedDataView {

    private String userFirstname;
    private String userLastname;
    private MarkerView marker;
    private List<String> socials;

}
