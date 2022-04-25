# Lil-Bopeep Retail Site

![alt text](ReadMe.gif)

# Introduction

The client is experiencing lower sales due to the outdated client-facing retail web-portal. Project Catwalk comprises of a complete redesign of the retail website to modernize the site and boost sales. This is the Front-End Capstone Project completed during Hack Reactor.

# Overview

The Product Overview widget provides a quick insight into the details of the selected product. The image gallery component displays the product's images in a carousel, with thumbnails and arrows for easy navigation, and full-screen. The product information is displayed to the right of the image gallery, providing a Star Rating (and quick link to jump to the reviews), Category, Product Name, Styles, Sizes, and Quantity. Selecting different styles will rerender the image gallery with that style's images. An Add to Cart button allows users to add the selected item, style, size, and quantity to their cart, which can be displayed by clicking the shopping bag icon in the nav bar. An array of buttons below the add to cart button also allows the user to share the selected product on their social media. Selecting a new product from the Related Products widget rerenders the Overview widget to the new item's data.

# Related Products & Outfits

The Related Product widget consists of two parts — Related Products and Outfits. Related products is the list of products related to the current displayed item by overview component and it updates accordingly. The products will be in card styles in a carousel which allow the users to navigate between the cards. If clicking on a star button, a modal would pop up which compares the features between the related card and the current item from the overview widget. Once the product name on the card gets clicked, it would change the overview item as well. The second part is the Outfits section, which will be a personal unique “wardrobe” stored for each user. It gives the user the ability to save and delete the current product item. Similar to the Related Product section, the Outfits will be shown in cards carousel.

# Questions and Answers

The Questions and Answers widget will allow users to ask and answer questions for the product selected. The functionality contained within this module can be divided into several pieces: view questions, search for a question, asking a question, answering a question.

At the center of the Questions and Answers widget will be a list of questions that have been asked about the given product. The questions and their corresponding answers within this list will be displayed in an expanding and collapsing accordion. By default, on page load up to four questions should be displayed. Up to two answers should display for each question. The remaining questions or answers should be hidden until the user loads them using the “More Answered Questions” button. A search bar will appear above the questions list. Search terms entered in this text input will filter the list for matching results.After the user types 3 or more characters into the search bar the results will begin to filter to only those containing matching text. The filter should continue to update as the user adds or removes characters. Each question and answer will be able to be marked as helpful. Answers will be able to be reported by the user as well. Through the link provided on each question within the Questions list, users will be allowed to submit an answer for the product. Upon clicking the button a modal window should open, overlaying the product page. At the bottom of the Questions & Answers module, a button will appear allowing users to create a new question for the product. This button should always be available on any product page. Upon clicking the button a modal window should open, overlaying the product page.

# Ratings and Reviews

The Ratings & Reviews widget will allow viewing and submission of reviews for the product selected. All displayed information is provided by users of the site. This component will extend the ability to write, read, and browse through reviews for the current product. All reviews will be saved per product. Specific styles of any given product will not be accounted for within the review module. Clicking on any breakdown information will serve to filter product review information within expectations.

# How to Install and Run the Project

1. Replace `YOUR_API_KEY_HERE` in `config.example.js` with your own API key and save as `config.js`.
2. Run `npm install` in the commmand line within the `lilSebastian` folder location.
3. Run `npm run watch` for webpack in a terminal once, then stop it.
4. Run `npm start` to start server

# Contributor

- **Michael McIntyre**: Ratings & Reviews [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/m-s-mcintyre/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/MichaelSMcIntyre)

# Technologies Used

- Setup and Configuration: ![git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
  ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
  ![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
  ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
- Front End Development: ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- Back End Development:![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
- Testing Environment: ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
- Team Collaboration: ![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
  ![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)
  ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)![Discord](https://img.shields.io/badge/%3CServer%3E-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)
