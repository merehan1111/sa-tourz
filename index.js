$(document).ready(function() {
    const languageButton = $('#languageButton');
    const languageText = $('#languageText');
    const languageButtonMobile = $('#languageButtonMobile');
    const languageTextMobile = $('#languageTextMobile');
    
    // Load the JSON translation file
    $.getJSON('translations.json', function(data) {
        let currentLanguage = 'ar';  // Default language is Arabic

        // Function to load content based on language dynamically
        function loadLanguage(language) {
            // Update the language text (AR or EN)
            if (language === 'en') {
                languageText.text('AR');
                languageTextMobile.text('AR');
                $('body').attr('dir', 'ltr');  // Set text direction for English (LTR)
                // Update text alignment for inputs (left to right)
                $('input, textarea').css('text-align', 'left');
            } else {
                languageText.text('EN');
                languageTextMobile.text('EN');
                $('body').attr('dir', 'rtl');  // Set text direction for Arabic (RTL)
                // Update text alignment for inputs (right to left)
                $('input, textarea').css('text-align', 'right');
            }

            // Loop through all elements with data-key attributes and update their content
            $('[data-key]').each(function() {
                const key = $(this).data('key');  // Get the data-key of the element
                if (data[language] && data[language][key]) {
                    // If it's an input or textarea, update the placeholder
                    if ($(this).is('input') || $(this).is('textarea')) {
                        $(this).attr('placeholder', data[language][key]);  // Update placeholder
                    } else {
                        $(this).text(data[language][key]);  // Update text content for other elements
                    }
                }
            });
        }

        // Initially load the Arabic content
        loadLanguage(currentLanguage);

        // Toggle language when the button is clicked
        languageButton.click(function() {
            currentLanguage = (currentLanguage === 'ar') ? 'en' : 'ar';  // Toggle between 'ar' and 'en'
            loadLanguage(currentLanguage);  // Load the new language
        });

        // Toggle language for mobile as well
        languageButtonMobile.click(function() {
            currentLanguage = (currentLanguage === 'ar') ? 'en' : 'ar';  // Toggle between 'ar' and 'en'
            loadLanguage(currentLanguage);  // Load the new language
        });
    });
});
