# Backend eCommerce Project

A backend ecommerce project currently in development process, build in <strong>Node JS</strong> with <strong>Express JS</strong>, using <strong>Mongo DB</strong> for data persistence management, and Handlebars (for the moment) for screen renders. 

It implements:
-  Sessions with <strong>JWT</strong> and <strong>Passport</strong> library, different user roles such as admin, user or premium user.
-  Mail notifications system using Nodemailer.
-  <strong>Design patterns</strong> such as MVC, DAO, Factory and Repository.
-  A chat developed using <strong>Web Sockets</strong> communication protocol through "sockets.io" library.
-  Realtime CRUD operations for products using <strong>Web Sockets</strong>, available only for admin or premium users.
-  Products search bar
-  Products pagination, "Limit", "Next page", "Previous Page", "Go to page ...".
-  Error management and error log using Winston library.

# Future implementations
- It will add some payment gateway to complete purchase process.
- It will be deployed in Railway App or Vercel soon.
- Front-end will be improved and Handlebars will be replaced with React JS to add more dynamic features to the user experience.      

#Example credentials
In case you dont want to register, you can use this regular user credentials:
- Email: example@example.com
- Password: 123
