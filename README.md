

## Week 1 Assignment: Flixster

Submitted by: **Stephane Mbenga**

Estimated time spent: **8** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://stephboss9.github.io/flixster_movie_app/)

### Application Features

#### CORE FEATURES

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### STRETCH FEATURES

- [x] Deploy website using GitHub Pages. 
- [x] Allow user to view more details about a movie within a popup.
- [x] Improve the user experience through CSS & animation.
- [x] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [x] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

<img src='Flixster_Walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<iframe 
src="https://www.loom.com/embed/55cc93d04cc14b3dbfe73fd84d5e47dc" frameborder="0" 
webkitallowfullscreen mozallowfullscreen allowfullscreen 
style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
</iframe>

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?
      The third lab played a significant part in completition of this project. Completing the third lab taught me how to access an api, generate an api key, make api calls, and handle json data, and that was a big part of this project. The 2nd lab also taught me how to add html to the DOM through javascript, which helped me in this project when displaying different movies on the screen. The second lab also introduced event listeners which were very important for this project. For example, if the user wanted to search for a movie, I added an event listener to the form element in my html, where the event was a 'submit' and the call back function displayed movies related to the users earch term. A feature I felt unprepared to complete initially was the pop up feature that would display a modal for any movie that was clicked.
However with the help of me peers, I figured it out.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
      If I had more time on this project afeature I would have added, that one of my peers implemented is a light and dark mode for their website. I would have also 
      added more animations to my website for user experience. A cool animation I would added is so that every time the search bar is clicked, it expands. Overall
      I am satisfied with my final product. 
      
  
Add your response here

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?
    
    During my demo, I was able to demonstrate that my website supported all the core features required, as well as some of the stretch features which included adding 
    a popup for each movie, displying more information about each movie, some extra styling, and animations. One feature that really got my attention, was a feature 
    my peer implemented where you could search movies by genre. I thought that was really cool and something I want to try implementing in the future.


### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.
                                                                       
I would like to shoutout Roy, he helped me a lot in every area of developing my website including, logic and styling. He also reminded me how useful the chrome debugger tools are. Shout out to Angelo, we partnered up the first day of developing our project, helped each other out while getting to know each other and
accomplished a great amount. Also shout out to Amantina she recomended to me a very useful source for implementing the pop up feature. 
