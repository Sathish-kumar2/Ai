package com.imagegen.cloud;

import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    private final ChatService chatService;

    public RecipeService(ChatService chatService) {
        this.chatService = chatService;
    }

    public String generateRecipe(String ingredients,
                                 String cuisine,
                                 String dietaryRestrictions) {

        String template = """
                Generate a detailed recipe using the following details.

                Ingredients:
                %s

                Cuisine:
                %s

                Dietary Restrictions:
                %s

                Include:
                1. Recipe Name
                2. Preparation Time
                3. Cooking Time
                4. Ingredients List
                5. Step-by-step Instructions
                6. Serving Size
                7. Tips

                Give the response in a clean readable format.
                """;

        String prompt = String.format(
                template,
                ingredients,
                cuisine,
                dietaryRestrictions
        );

        return chatService.chat(prompt);
    }
}